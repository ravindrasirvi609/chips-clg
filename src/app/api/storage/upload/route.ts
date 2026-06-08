import { uploadFileToCloudflare } from "@/lib/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }

    const url = await uploadFileToCloudflare(
      file,
      typeof folder === "string" && folder.trim() ? folder : "abstracts"
    );

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.error("Cloudflare upload error:", error);
    return NextResponse.json(
      { message: "Failed to upload file", error: String(error) },
      { status: 500 }
    );
  }
}
