import AbstractModel from "@/Model/AbstractModel";
import RegistrationModel from "@/Model/RegistrationModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export const revalidate = 0; // Disable caching for this route

export async function GET() {
  try {
    // Fetch abstracts from the database, excluding those with status "Delete" and created after June 1, 2025
    const abstracts = await AbstractModel.find({
      status: { $ne: "Delete" },
      createdAt: { $gt: new Date("2025-06-01T00:00:00Z") },
    }).lean();

    // Fetch registration types for abstracts that have registrationCode
    const registrationCodes = abstracts
      .filter((a) => a.registrationCode)
      .map((a) => a.registrationCode);

    const registrations = await RegistrationModel.find({
      registrationCode: { $in: registrationCodes },
    })
      .select("registrationCode registrationType")
      .lean();

    // Create a map of registrationCode to registrationType
    const registrationTypeMap = new Map(
      registrations.map((r) => [r.registrationCode, r.registrationType || "N/A"])
    );

    // Add registrationType to each abstract
    const abstractsWithRegistrationType = abstracts.map((abstract) => ({
      ...abstract,
      registrationType: abstract.registrationCode
        ? registrationTypeMap.get(abstract.registrationCode) || "N/A"
        : "N/A",
    }));

    // Check if abstracts exist
    if (!abstractsWithRegistrationType || abstractsWithRegistrationType.length === 0) {
      return NextResponse.json(
        { message: "No abstracts found" },
        { status: 404 }
      );
    }

    // Return the list of abstracts with cache control headers
    const response = NextResponse.json({
      message: "Abstracts fetched successfully",
      abstracts: abstractsWithRegistrationType,
    });

    // Set cache control headers
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).toString() },
      { status: 500 }
    );
  }
}
