import { db } from "@/lib/db";

export const getSelectItems = async (programId: string) => {
  try {
    const items = await db.submission.findMany({
      where: {
        programId,
      },
      include: {
        applicant: {
          select: {
            domicileCity: true,
            domicileProvince: true,
          },
        },
      },
    });

    return items;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};
