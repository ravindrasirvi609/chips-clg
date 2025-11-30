import { connect } from "@/dbConfig/dbConfig";
import RegistrationModel from "@/Model/RegistrationModel";
import { NextResponse } from "next/server";

connect();

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    // First, find the registration to validate
    const registration = await RegistrationModel.findById(id);

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Validation 1: Check if payment status is completed
    if (registration.paymentStatus === "Completed") {
      return NextResponse.json(
        { error: "Cannot delete registration with completed payment status" },
        { status: 403 }
      );
    }

    // Validation 2: Check if there are multiple registrations with the same mobile number
    const duplicateCount = await RegistrationModel.countDocuments({
      whatsappNumber: registration.whatsappNumber,
    });

    if (duplicateCount <= 1) {
      return NextResponse.json(
        {
          error:
            "Cannot delete registration. User must have multiple entries with the same mobile number to be eligible for deletion",
        },
        { status: 403 }
      );
    }

    // If all validations pass, proceed with deletion
    await RegistrationModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Registration deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
