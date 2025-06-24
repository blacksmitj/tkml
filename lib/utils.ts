import { clsx, type ClassValue } from "clsx";
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
