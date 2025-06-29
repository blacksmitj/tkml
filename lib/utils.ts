import { FormattedApplicant } from "@/types/applicants";
import { FullSubmission } from "@/types/full-submission";
import { clsx, type ClassValue } from "clsx";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAge(birthDate: Date | null): number | null {
  if (!birthDate) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function parseDate(value: unknown): Date | null {
  if (!value) return null;

  // Jika angka (mungkin serial Excel date)
  if (typeof value === "number") {
    const msPerDay = 24 * 60 * 60 * 1000;
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    return new Date(excelEpoch.getTime() + value * msPerDay);
  }

  // Jika string (coba parse langsung)
  if (typeof value === "string") {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

export function isMale(input: string): boolean {
  const normalized = input.trim().toLowerCase();

  const maleKeywords = ["laki", "pria", "cowok", "cowo", "lelaki"];
  const femaleKeywords = ["perempuan", "wanita", "cewek", "cewe"];

  for (const word of maleKeywords) {
    if (normalized.includes(word)) return true;
  }

  for (const word of femaleKeywords) {
    if (normalized.includes(word)) return false;
  }

  return true;
}

export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export const isPDF = (url: string | null) =>
  url && url.toLowerCase().endsWith(".pdf");

export function formatSubmission(
  submission: FullSubmission
): FormattedApplicant {
  return {
    id: submission.applicant.id,
    name: submission.applicant.name,
    selfieFile: submission.applicant.selfieFile || "",
    currentJob: submission.applicant.currentJob || "-",
    age: getAge(submission.applicant.birthDate)?.toString() ?? "-",
    gender: submission.applicant.gender ? "Pria" : "Wanita",
    ktpNumber: submission.applicant.ktpNumber,
    domicileCity: submission.applicant.domicileCity || "-",
    domicileProvince: submission.applicant.domicileProvince || "-",

    businessName: submission.business?.name || "-",
    businessSector: submission.business?.sector || "-",
  };
}

export const valueFormat = (url: string | number | null) =>
  url && typeof url === "string"
    ? url.toLocaleLowerCase()
    : typeof url === "number"
    ? url.toString()
    : "-";

export function getSocialIcon(platform: string): IconType {
  switch (platform.toLowerCase()) {
    case "facebook":
      return FaFacebook;
    case "instagram":
      return FaInstagram;
    case "twitter":
      return FaTwitter;
    case "linkedin":
      return FaLinkedin;
    case "tiktok":
      return FaTiktok;
    default:
      return FaUser;
  }
}

export function formatPhoneNumber(phone: string | null): string {
  if (!phone) {
    return "";
  }
  // Hapus semua karakter non-angka
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.startsWith("0")) {
    // Ganti 0 di depan dengan 62
    return "62" + digitsOnly.slice(1);
  }

  if (digitsOnly.startsWith("8")) {
    // Tambahkan 62 di depan
    return "62" + digitsOnly;
  }

  // Jika sudah dimulai dengan 62, kembalikan seperti biasa
  return digitsOnly;
}
