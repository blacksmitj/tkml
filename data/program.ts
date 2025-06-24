import { db } from "@/lib/db";

export const getAllPrograms = async () => {
  try {
    const programs = db.program.findMany();

    return programs;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
};
