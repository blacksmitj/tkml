import { ApplicantRole } from "@prisma/client";

export const getApplicantRole = (
  value: string | undefined | null
): ApplicantRole => {
  const normalized = value?.toLowerCase().trim();

  switch (normalized) {
    case "leader":
      return "LEADER";
    case "member":
      return "MEMBER";
    default:
      return "INDIVIDUAL";
  }
};
