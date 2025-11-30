import AbstractModel from "@/Model/AbstractModel";
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

    // Check if abstracts exist
    if (!abstracts || abstracts.length === 0) {
      return NextResponse.json(
        { message: "No abstracts found" },
        { status: 404 }
      );
    }

    // Return the list of abstracts with cache control headers
    const response = NextResponse.json({
      message: "Abstracts fetched successfully",
      abstracts,
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
