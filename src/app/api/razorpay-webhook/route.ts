import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Registration from "@/Model/RegistrationModel";
import Transaction from "@/Model/TransactionModel";
import AbstractModel from "@/Model/AbstractModel";
import { sendEmail } from "@/lib/mailer";
import { uploadQRCodeToCloudflare } from "@/lib/cloudflare";
import QRCode from "qrcode";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(bodyText)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.error("Invalid Razorpay webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    } else {
      console.warn("RAZORPAY_WEBHOOK_SECRET is not set. Webhook signature verification is skipped.");
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;
    console.log(`Received Razorpay webhook event: ${event}`);

    if (event !== "order.paid" && event !== "payment.captured") {
      return NextResponse.json({ message: "Ignored event" }, { status: 200 });
    }

    let orderId = "";
    let paymentId = "";
    let amount = 0;
    let email = "";
    let name = "";
    let phone = "";
    let registrationId = "";

    if (event === "order.paid") {
      const orderEntity = payload.payload.order.entity;
      orderId = orderEntity.id;
      amount = orderEntity.amount / 100; // convert to Rupees
      registrationId = orderEntity.notes?.registrationId;
      email = orderEntity.notes?.email || "";
    } else if (event === "payment.captured") {
      const paymentEntity = payload.payload.payment.entity;
      orderId = paymentEntity.order_id;
      paymentId = paymentEntity.id;
      amount = paymentEntity.amount / 100; // convert to Rupees
      registrationId = paymentEntity.notes?.registrationId || paymentEntity.notes?.registration_id;
      email = paymentEntity.email || paymentEntity.notes?.email || "";
      name = paymentEntity.notes?.customerName || "";
      phone = paymentEntity.contact || paymentEntity.notes?.customerPhone || "";
    }

    await connect();

    // 1. Find the registration
    let registration = null;
    if (registrationId) {
      registration = await Registration.findById(registrationId);
    }
    if (!registration && orderId) {
      registration = await Registration.findOne({ razorpayOrderId: orderId });
    }
    if (!registration && email) {
      // Fallback: match by email and status Pending
      registration = await Registration.findOne({ email, registrationStatus: "Pending" }).sort({ createdAt: -1 });
    }

    if (!registration) {
      console.error(`Registration not found for orderId: ${orderId}, registrationId: ${registrationId}, email: ${email}`);
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // 2. Check if already confirmed
    if (registration.registrationStatus === "Confirmed") {
      console.log(`Registration ${registration._id} is already confirmed.`);
      return NextResponse.json({ message: "Already confirmed" }, { status: 200 });
    }

    // 3. Process confirmation
    // Generate code
    let registrationCode = registration.registrationCode;
    if (!registrationCode) {
      registrationCode = await getNextRegistrationCode();
    }

    // Generate QR Code if not present
    let qrCodeUrl = registration.qrCodeUrl;
    if (!qrCodeUrl) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL || "https://chips-clg.vercel.app"}/abstractForm/${registration._id}`;
      const qrCodeBuffer = await QRCode.toBuffer(url);
      qrCodeUrl = await uploadQRCodeToCloudflare(
        qrCodeBuffer,
        `individual_${registration._id}.png`
      );
    }

    // If we don't have a transaction record yet, create it
    let transaction = await Transaction.findOne({ razorpayOrderId: orderId });
    if (!transaction) {
      if (!paymentId) {
        paymentId = `pay_webhook_${Date.now()}`;
      }
      transaction = new Transaction({
        razorpayOrderId: orderId || `order_webhook_${Date.now()}`,
        razorpayPaymentId: paymentId,
        razorpaySignature: "verified_via_webhook",
        amount: amount || registration.paymentAmount || 0,
        currency: "INR",
        status: "completed",
        planName: registration.registrationType || "Individual Plan",
        customerName: registration.name || name || "Customer",
        customerEmail: registration.email || email,
        customerPhone: registration.whatsappNumber || phone || "N/A",
      });
      await transaction.save();
    }

    // Update registration status
    registration.paymentStatus = "Completed";
    if (amount) {
      registration.paymentAmount = amount;
    }
    registration.paymentDate = new Date();
    registration.transactionId = transaction._id;
    registration.registrationStatus = "Confirmed";
    registration.registrationCode = registrationCode;
    registration.qrCodeUrl = qrCodeUrl;
    registration.updatedAt = new Date();
    await registration.save();

    // Update abstract if exists
    if (registration.abstractId) {
      try {
        await AbstractModel.findByIdAndUpdate(registration.abstractId, {
          registrationCompleted: true,
          registrationCode: registrationCode,
        });
      } catch (error) {
        console.error("Failed to update Abstract Model:", error);
      }
    }

    // Send confirmation email
    await sendEmail({
      emailType: "REGISTRATION_SUCCESS",
      _id: registration._id,
    });

    console.log(`Successfully confirmed registration via webhook: ${registration._id}`);
    return NextResponse.json({ message: "Registration confirmed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

async function getNextRegistrationCode(): Promise<string> {
  const lastRegistration = await Registration.findOne({
    registrationCode: /^P/,
  }).sort({
    registrationCode: -1,
  });

  if (!lastRegistration || !lastRegistration.registrationCode) {
    return "P1201";
  }

  const lastNumber = parseInt(lastRegistration.registrationCode.slice(1), 10);
  const nextNumber = lastNumber + 1;
  return `P${nextNumber.toString().padStart(4, "0")}`;
}
