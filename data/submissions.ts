import { db } from "@/lib/db";

export const getSubmissionById = async (submissionId: string) => {
  try {
    const submission = await db.submission.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        applicant: true,
        business: true,
        documents: true,
        workers: true,
        reviewer: true,
        mentor: true,
        group: true,
        assessments: true,
      },
    });

    return submission;
  } catch (error) {
    console.error("Error fetching submission:", error);
    throw error;
  }
};
