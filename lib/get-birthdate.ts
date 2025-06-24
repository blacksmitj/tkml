import { ApplicantUploadRow } from "@/types/upload-row-submission";

export const getBirthDate = (row: ApplicantUploadRow): Date | null => {
  // 1. Jika tgl_lahir valid, langsung pakai
  if (row.tgl_lahir && !isNaN(Date.parse(row.tgl_lahir))) {
    return new Date(row.tgl_lahir);
  }

  // 2. Fallback: hitung dari umur dan tanggal_daftar
  const umur = Number(row.umur);
  const tglDaftar = new Date(row.tanggal_daftar);

  if (
    !isNaN(umur) &&
    umur > 0 &&
    row.tanggal_daftar &&
    !isNaN(tglDaftar.getTime())
  ) {
    const birthYear = tglDaftar.getFullYear() - umur;
    const month = tglDaftar.getMonth();
    const day = tglDaftar.getDate();

    return new Date(birthYear, month, day); // 1 Juli {tahunLahir}
  }

  return null; // jika data tidak lengkap
};
