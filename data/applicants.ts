import { db } from "@/lib/db";

export const getApplicantById = async (projectId: string) => {
  try {
    const project = await db.applicant.findUnique({
      where: {
        id: projectId,
      },
      include: {
        business: true,
        document: true,
        relatives: true,
        worker: true,
        selectionTeam: true,
        group: true,
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};
