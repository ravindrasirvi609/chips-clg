import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/lib/mailer";
import { uploadQRCodeToFirebase } from "@/lib/firebase";
import QRCode from "qrcode";
import RegistrationModel from "@/Model/RegistrationModel";
import AbstractModel from "@/Model/AbstractModel";

connect();

interface IRegistration {
  registrationCode: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    // Find the registration
    const registration = await RegistrationModel.findById(registrationId);
    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Check if it's not a group registration
    if (registration.registrationType === "Group") {
      return NextResponse.json(
        {
          error:
            "This API is only for individual registrations. Use group confirmation API for group registrations.",
        },
        { status: 400 }
      );
    }

    if (registration.registrationStatus === "Confirmed") {
      return NextResponse.json(
        { error: "Registration is already confirmed" },
        { status: 400 }
      );
    }

    // Generate registration code for individual registration
    const registrationCode = await getNextRegistrationCode();

    // Generate QR Code
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/abstractForm/${registration._id}`;
    const qrCodeBuffer = await QRCode.toBuffer(url);
    const qrCodeUrl = await uploadQRCodeToFirebase(
      qrCodeBuffer,
      `individual_${registration._id}.png`
    );

    // Update registration status with ₹1 payment amount and completed payment status
    const updatedRegistration = await RegistrationModel.findByIdAndUpdate(
      registrationId,
      {
        registrationStatus: "Confirmed",
        paymentStatus: "Completed",
        paymentAmount: 1, // ₹1 payment as specified
        paymentDate: new Date(),
        registrationCode: registrationCode,
        qrCodeUrl: qrCodeUrl,
        updatedAt: new Date(),
      },
      { new: true }
    );

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
    sendEmail({
      emailType: "REGISTRATION_SUCCESS",
      _id: updatedRegistration._id,
    });

    return NextResponse.json(
      {
        message: "Individual Registration confirmed successfully",
        registration: updatedRegistration,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Individual Registration confirmation error:", error);
    return NextResponse.json(
      {
        message: "Error confirming individual registration",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

async function getNextRegistrationCode(): Promise<string> {
  const registrations = (await RegistrationModel.find(
    {},
    {
      registrationCode: 1,
    }
  )
    .lean()
    .exec()) as unknown as (Document & IRegistration)[];

  let maxNumber = 1200; // Starting from P1201 for individual registrations

  for (const registration of registrations) {
    if (
      registration.registrationCode &&
      registration.registrationCode.startsWith("P")
    ) {
      const number = parseInt(registration.registrationCode.slice(1), 10);
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number;
      }
    }
  }

  const nextNumber = maxNumber + 1;
  return `P${nextNumber.toString().padStart(4, "0")}`;
}
