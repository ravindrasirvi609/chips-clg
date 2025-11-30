import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import RegistrationModel from "@/Model/RegistrationModel";
import AbstractModel from "@/Model/AbstractModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      groupCode,
      Salutations,
      dob,
      AadharNumber,
      gender,
      email,
      whatsappNumber,
      name,
      affiliation,
      designation,
      imageUrl,
      address,
      city,
      state,
      pincode,
      country,
      needAccommodation,
    } = body;

    // Don't assign registration code yet - will be assigned on admin confirmation
    const newGroupRegistration = new RegistrationModel({
      groupCode,
      Salutations,
      dob,
      AadharNumber,
      gender,
      email,
      whatsappNumber,
      name,
      affiliation,
      designation,
      imageUrl,
      address,
      city,
      state,
      pincode,
      country,
      needAccommodation,
      registrationStatus: "Pending", // Set to pending initially
      registrationType: "Group",
      paymentStatus: "Pending", // Set to pending initially
    });

    const savedGroupRegistration = await newGroupRegistration.save();

    // Don't generate QR code or send email until admin confirmation
    // Search for the email in the abstract model
    const abstract = await AbstractModel.findOne({ email: email });

    let foundAbstractId = null;
    if (abstract) {
      foundAbstractId = abstract._id;

      // Update the registration with the abstract ID if found
      await RegistrationModel.findByIdAndUpdate(
        savedGroupRegistration._id,
        { abstractId: foundAbstractId },
        { new: true }
      );
    }

    // Send pending confirmation email (using existing email type for now)
    // sendEmail({
    //   emailType: "REGISTRATION_SUCCESS", // We'll update the email template later
    //   _id: savedGroupRegistration._id,
    // });

    return NextResponse.json(
      {
        message:
          "Group Registration submitted successfully. Awaiting admin confirmation.",
        registration: savedGroupRegistration,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Group Registration save error:", error);
    return NextResponse.json(
      {
        message: "Error saving group registration",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
