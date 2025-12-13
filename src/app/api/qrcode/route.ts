import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import AbstractModel from "@/Model/AbstractModel";
import RegistrationModel from "@/Model/RegistrationModel";
import { IAbstract, IRegistration } from "@/lib/interface";

connect();

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { id } = await req.json();

    let abstract: IAbstract | null = null;
    let registration: IRegistration | null = null;

    // Check if id is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      // Try to find in AbstractModel
      abstract = (await AbstractModel.findById(id).lean()) as IAbstract | null;
      console.log("abstract----1", abstract);

      // If not found in AbstractModel, try RegistrationModel
      if (!abstract) {
        registration = (await RegistrationModel.findById(
          id
        ).lean()) as IRegistration | null;
        console.log("registration----1", registration);
      }
    }

    // If not found by _id, try with temporaryAbstractCode or registrationCode
    if (!abstract && !registration) {
      abstract = (await AbstractModel.findOne({
        temporyAbstractCode: id,
      }).lean()) as IAbstract | null;
      console.log("abstract----2", abstract);

      if (!abstract) {
        registration = (await RegistrationModel.findOne({
          registrationCode: id,
        }).lean()) as IRegistration | null;
        console.log("registration----2", registration);
      }
    }

    // If we found a registration but not an abstract
    if (registration && !abstract) {
      // 1. Try by abstractId in registration
      if (registration.abstractId) {
        abstract = (await AbstractModel.findById(
          registration.abstractId
        ).lean()) as IAbstract | null;
      }

      // 2. Try by email if still not found
      if (!abstract && registration.email) {
        abstract = (await AbstractModel.findOne({
          email: registration.email,
        }).lean()) as IAbstract | null;
      }

      // 3. Try by registrationCode (existing legacy link)
      if (!abstract && registration.registrationCode) {
        abstract = (await AbstractModel.findOne({
          registrationCode: registration.registrationCode,
        }).lean()) as IAbstract | null;
      }
      console.log("abstract found via linking:", abstract);
    }

    // If we found an abstract but not a registration
    if (abstract && !registration) {
      // 1. Try by email
      if (abstract.email) {
        registration = (await RegistrationModel.findOne({
          email: abstract.email,
        }).lean()) as IRegistration | null;
      }

      // 2. Try by registrationCode if still not found
      if (!registration && abstract.registrationCode) {
        registration = (await RegistrationModel.findOne({
          registrationCode: abstract.registrationCode,
        }).lean()) as IRegistration | null;
      }
      console.log("registration found via linking:", registration);
    }

    if (!abstract && !registration) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json({
      props: {
        abstract: abstract || null,
        registration: registration || null,
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
