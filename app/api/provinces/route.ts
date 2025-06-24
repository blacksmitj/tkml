import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get("programId");

    if (!programId) {
      return new NextResponse("Missing programId", { status: 400 });
    }

    const provinces = await db.applicant.findMany({
      where: {
        submissions: {
          programId,
        },
      },
      distinct: ["domicileProvince"],
      select: {
        domicileProvince: true,
      },
      orderBy: {
        domicileProvince: "asc",
      },
    });

    const uniqueProvinces = provinces
      .map((p) => p.domicileProvince)
      .filter(Boolean); // Hapus null

    return NextResponse.json({ provinces: uniqueProvinces });
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
