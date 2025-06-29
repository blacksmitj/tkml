import { db } from "@/lib/db";
import { getAge } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const rawCursor = searchParams.get("cursor");
    const programId = searchParams.get("programId");
    const search = searchParams.get("search") || "";
    const province = searchParams.get("province") || "";
    const city = searchParams.get("city") || "";
    const cursor = rawCursor && rawCursor !== "null" ? rawCursor : undefined;
    const LIMIT = 5;

    if (!programId) {
      return new NextResponse("Missing programId", { status: 400 });
    }

    console.log({
      programId,
      search,
      province,
      city,
      cursor,
    });

    // Filter relasi applicant
    const applicantFilter: any = {};
    if (province)
      applicantFilter.domicileProvince = {
        contains: province,
        mode: Prisma.QueryMode.insensitive,
      };
    if (city) {
      applicantFilter.domicileCity = {
        contains: city,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    // Filter keyword di semua bidang
    const orConditions = search
      ? [
          {
            applicant: {
              is: {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            },
          },
          {
            applicant: {
              is: {
                ktpNumber: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            },
          },
          {
            business: {
              is: {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            },
          },
          {
            business: {
              is: {
                sector: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            },
          },
        ]
      : [];

    const submissions = await db.submission.findMany({
      where: {
        programId,
        AND: [
          applicantFilter && Object.keys(applicantFilter).length > 0
            ? { applicant: { is: applicantFilter } }
            : {},
          ...(orConditions.length > 0 ? [{ OR: orConditions }] : []),
        ],
      },
      take: LIMIT + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      include: {
        applicant: {
          select: {
            id: true,
            name: true,
            selfieFile: true,
            currentJob: true,
            birthDate: true,
            gender: true,
            ktpNumber: true,
            domicileCity: true,
            domicileProvince: true,
          },
        },
        business: {
          select: {
            name: true,
            sector: true,
          },
        },
      },
    });

    const hasNextPage = submissions.length > LIMIT;
    const data = hasNextPage ? submissions.slice(0, LIMIT) : submissions;

    return NextResponse.json({
      data: data.map((submission) => ({
        id: submission.id,
        name: submission.applicant.name,
        selfieFile: submission.applicant.selfieFile,
        currentJob: submission.applicant.currentJob,
        age: getAge(submission.applicant.birthDate),
        gender: submission.applicant.gender,
        ktpNumber: submission.applicant.ktpNumber,
        domicileCity: submission.applicant.domicileCity,
        domicileProvince: submission.applicant.domicileProvince,
        businessName: submission.business?.name,
        businessSector: submission.business?.sector,
      })),
      nextCursor: hasNextPage ? submissions[LIMIT].id : null,
    });
  } catch (error) {
    console.error("Error in GET /api/submissions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
