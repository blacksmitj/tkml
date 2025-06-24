import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get("programId");

    if (!programId) {
      return new NextResponse("Missing programId", { status: 400 });
    }

    const cities = await db.applicant.findMany({
      where: {
        domicileProvince: {
          contains: searchParams.get("province") || "",
          mode: "insensitive",
        },
        submissions: {
          programId,
        },
      },
      distinct: ["domicileCity"],
      select: {
        domicileCity: true,
      },
      orderBy: {
        domicileCity: "asc",
      },
    });

    const uniqueCities = cities.map((p) => p.domicileCity).filter(Boolean); // Hapus null

    return NextResponse.json({ cities: uniqueCities });
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
