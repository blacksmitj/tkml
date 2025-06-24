"use server";

import { db } from "@/lib/db";
import { UploadProgramSchema } from "@/schemas";
import { z } from "zod";

export const createProgram = async (
  values: z.infer<typeof UploadProgramSchema>
) => {
  try {
    const { name, year, description } = values;

    const existingProgram = await db.program.findUnique({
      where: {
        name_year: {
          name,
          year,
        },
      },
    });

    if (existingProgram) {
      return {
        success: false,
        message: `Program: ${name} year: ${year} already exist!.`,
      };
    }

    await db.program.create({
      data: {
        name,
        year,
        description,
      },
    });

    return {
      success: true,
      message: `Program berhasil dibuat.`,
    };
  } catch (e) {
    return {
      success: false,
      message: "Kesalahan saat upload.",
      error: e instanceof Error ? e.message : String(e),
    };
  }
};
