import { UploadStatus } from "@/types/upload-status";

export const uploadStatusMessage: Record<
  UploadStatus,
  { text: string; color: string }
> = {
  idle: { text: "", color: "" },
  loading: { text: "", color: "" },
  success: { text: "✅ File berhasil dibaca!", color: "text-green-600" },
  error: { text: "❌ Gagal membaca file.", color: "text-red-600" },
  invalid: {
    text: "⚠️ File tidak valid. Pastikan Anda mengunggah file Excel (.xlsx atau .xls).",
    color: "text-red-600",
  },
  headerInvalid: {
    text: "❌ Struktur data tidak sesuai. Pastikan Anda menggunakan template yang benar.",
    color: "text-red-600",
  },
};
