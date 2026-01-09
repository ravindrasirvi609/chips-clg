import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import AbstractModel from "@/Model/AbstractModel";

// Disable Next.js caching to always fetch fresh data
export const dynamic = 'force-dynamic';

connect();
export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  const { code } = params;

  try {
    const abstract = await AbstractModel.findOne({
      $or: [{ temporyAbstractCode: code }, { AbstractCode: code }],
    });

    if (!abstract) {
      return NextResponse.json(
        { error: "Abstract not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(abstract);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching abstract" },
      { status: 500 }
    );
  }
}
