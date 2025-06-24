import { z } from "zod";

export const UploadProgramSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  year: z.number().min(4, { message: "Year is required" }),
  description: z.string().optional(),
});
