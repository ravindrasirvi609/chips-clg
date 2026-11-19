import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connect } from "@/dbConfig/dbConfig";
import RegistrationModel from "@/Model/RegistrationModel";
import { plans } from "@/app/data";

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
    }

    await connect();
    const registration = await RegistrationModel.findById(registrationId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const plan = plans.find(({ name }) => name === registration.registrationType);
    if (!plan) {
      return NextResponse.json({ error: "Invalid registration type" }, { status: 400 });
    }

    const amount = plan.earlyBird;

    // Initialize Razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise and ensure it's an integer
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1,
      notes: {
        registrationId,
      },
    };

    const response = await razorpay.orders.create(options);

    // Save the order ID to the registration in DB
    if (registrationId) {
      await RegistrationModel.findByIdAndUpdate(registrationId, {
        razorpayOrderId: response.id,
      });
    }

    return NextResponse.json(
      {
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
