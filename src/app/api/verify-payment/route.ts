import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Registration from "@/Model/RegistrationModel";
import Transaction from "@/Model/TransactionModel";
import AbstractModel from "@/Model/AbstractModel";
import { sendEmail } from "@/lib/mailer";
import { uploadQRCodeToCloudflare } from "@/lib/cloudflare";
import QRCode from "qrcode";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
    }

    await connect();

    // Find the registration
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Check if it's already confirmed
    if (registration.registrationStatus === "Confirmed") {
      return NextResponse.json({
        message: "Registration is already confirmed",
        registration,
      }, { status: 200 });
    }

    const orderId = registration.razorpayOrderId;
    if (!orderId) {
      return NextResponse.json({
        error: "No Razorpay order ID associated with this registration. Cannot auto-sync.",
      }, { status: 400 });
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Fetch order from Razorpay
    let orderDetails;
    try {
      orderDetails = await razorpay.orders.fetch(orderId);
    } catch (err) {
      console.error(`Failed to fetch order ${orderId} from Razorpay:`, err);
      return NextResponse.json({
        error: "Failed to fetch order details from Razorpay. Please check configuration or order ID.",
      }, { status: 400 });
    }

    const details = orderDetails as any;
    console.log(`Fetched order status for ${orderId}: ${details.status}`);

    if (details.status === "paid") {
      // Generate registration code
      let registrationCode = registration.registrationCode;
      if (!registrationCode) {
        registrationCode = await getNextRegistrationCode();
      }

      // Generate QR Code
      let qrCodeUrl = registration.qrCodeUrl;
      if (!qrCodeUrl) {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL || "https://chips-clg.vercel.app"}/abstractForm/${registration._id}`;
        const qrCodeBuffer = await QRCode.toBuffer(url);
        qrCodeUrl = await uploadQRCodeToCloudflare(
          qrCodeBuffer,
          `individual_${registration._id}.png`
        );
      }

      // Find payments to get a payment ID if possible
      let paymentId = `pay_sync_${Date.now()}`;
      try {
        const payments = await razorpay.orders.fetchPayments(orderId);
        if (payments && payments.items && payments.items.length > 0) {
          const successfulPayment = payments.items.find(
            (p: any) => p.status === "captured" || p.status === "authorized"
          );
          if (successfulPayment) {
            paymentId = successfulPayment.id;
          }
        }
      } catch (err) {
        console.error("Failed to fetch payments for order:", err);
      }

      // Create transaction if not exists
      let transaction = await Transaction.findOne({ razorpayOrderId: orderId });
      if (!transaction) {
        transaction = new Transaction({
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          razorpaySignature: "verified_via_sync_api",
          amount: details.amount / 100,
          currency: details.currency,
          status: "completed",
          planName: registration.registrationType || "Individual Plan",
          customerName: registration.name,
          customerEmail: registration.email,
          customerPhone: registration.whatsappNumber || "N/A",
        });
        await transaction.save();
      }

      // Update registration status
      registration.paymentStatus = "Completed";
      registration.paymentAmount = details.amount / 100;
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

      return NextResponse.json({
        message: "Registration successfully verified and confirmed",
        registration,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        error: `Order status is '${details.status}' (not paid). Cannot confirm registration.`,
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Sync payment failed:", error);
    return NextResponse.json({
      error: "Internal server error during verification",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
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
