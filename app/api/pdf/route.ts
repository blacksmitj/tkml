// app/api/pdf/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ message: "Missing URL" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const pdfRes = await fetch(url);

    if (!pdfRes.ok) {
      return new Response(JSON.stringify({ message: "Failed to fetch PDF" }), {
        status: pdfRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = Buffer.from(await pdfRes.arrayBuffer());
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
