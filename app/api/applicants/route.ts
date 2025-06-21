import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawCursor = searchParams.get("cursor");
    const cursor = rawCursor && rawCursor !== "null" ? rawCursor : undefined;
    const LIMIT = 5;

    const applicants = await db.applicant.findMany({
      take: LIMIT + 1, // +1 to check if there's a next page
      orderBy: {
        createdAt: "desc",
      },
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      include: {
        business: true,
      },
    });

    const hasNextPage = applicants.length > LIMIT;
    const data = hasNextPage ? applicants.slice(0, LIMIT) : applicants;

    return NextResponse.json({
      data,
      nextCursor: hasNextPage ? data[data.length - 1].id : null,
    });
  } catch (error) {
    console.error("Error in GET /api/applicants:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
