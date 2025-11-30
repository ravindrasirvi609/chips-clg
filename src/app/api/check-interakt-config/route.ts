import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.INTERAKT_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      configured: false,
      preview: "",
      message: "INTERAKT_API_KEY not found in environment variables",
    });
  }

  // Provide a masked version of the API key for verification
  const preview =
    apiKey.length > 10
      ? `${apiKey.substring(0, 6)}...${apiKey.slice(-4)}`
      : `${apiKey.substring(0, 3)}...`;

  return NextResponse.json({
    configured: true,
    preview,
    message: "API key is configured",
  });
}
