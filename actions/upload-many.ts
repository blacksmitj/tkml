"use server";

import { db } from "@/lib/db";
import { getApplicantRole } from "@/lib/get-applicante-role";
import { getBirthDate } from "@/lib/get-birthdate";
import { parseDisability } from "@/lib/parse-disability";
import { parseDate, isMale, chunkArray } from "@/lib/utils";
import { ApplicantUploadRow } from "@/types/upload-row-submission";

export const uploadDataMany = async (
  rows: ApplicantUploadRow[],
  programId: string
) => {
  try {
    console.time("⏱️ Total proses upload");

    // Cek existing applicants
    console.time("🔍 Cek applicant existing");
    const uniqueApplicants = rows.map((r) => ({
      ktpNumber: r.nik,
      name: r.nama,
    }));
    const existingApplicants = await db.applicant.findMany({
      where: { OR: uniqueApplicants },
      select: { id: true, ktpNumber: true, name: true },
    });
    console.timeEnd("🔍 Cek applicant existing");

    const applicantMap = new Map<string, string>();
    for (const a of existingApplicants) {
      applicantMap.set(`${a.ktpNumber}-${a.name}`, a.id);
    }

    // Cek existing submissions
    console.time("🔍 Cek submission existing");
    const existingSubmissions = await db.submission.findMany({
      where: {
        programId,
        applicantId: { in: Array.from(applicantMap.values()) },
      },
      select: { applicantId: true },
    });
    console.timeEnd("🔍 Cek submission existing");

    const existingSubmissionSet = new Set(
      existingSubmissions.map((s) => s.applicantId)
    );

    let inserted = 0;
    let skipped = 0;
    const errors: string[] = [];
    const applicantChunks = chunkArray(rows, 100);

    for (let i = 0; i < applicantChunks.length; i++) {
      const chunk = applicantChunks[i];
      console.time(`📦 Batch ${i + 1}/${applicantChunks.length}`);

      await Promise.allSettled(
        chunk.map(async (row, idx) => {
          const rowIndex = i * 100 + idx + 1;
          const rowKey = `${row.nik}-${row.nama}`;

          try {
            let applicantId = applicantMap.get(rowKey);

            // Buat applicant jika belum ada
            if (!applicantId) {
              const applicant = await db.applicant.create({
                data: buildApplicantData(row),
              });
              applicantId = applicant.id;
              applicantMap.set(rowKey, applicantId);
            }

            if (existingSubmissionSet.has(applicantId)) {
              skipped++;
              return;
            }

            await db.submission.create({
              data: buildSubmissionData(row, applicantId, programId),
            });

            inserted++;
          } catch (err) {
            skipped++;
            errors.push(
              `❌ Error baris ${rowIndex} - ${row.nik} - ${row.nama}: ${
                err instanceof Error ? err.message : String(err)
              }`
            );
          }
        })
      );

      console.timeEnd(`📦 Batch ${i + 1}/${applicantChunks.length}`);
    }

    console.timeEnd("⏱️ Total proses upload");

    return {
      success: true,
      message: `✅ Berhasil insert ${inserted} submission. Dilewati ${skipped}.`,
      inserted,
      skipped,
      errors,
    };
  } catch (err) {
    return {
      success: false,
      message: "❌ Kesalahan saat memproses data upload.",
      error: err instanceof Error ? err.message : String(err),
    };
  }
};

// Modular function: build data untuk applicant
function buildApplicantData(row: ApplicantUploadRow) {
  return {
    idTkm: row.id_tkm,
    name: row.nama,
    email: row.email,
    gender: isMale(row.gender),
    currentJob: row.aktivitas_saat_ini,
    lastEducation: row.pendidikan_terakhir,
    birthDate: getBirthDate(row),
    role: getApplicantRole(row.role),
    ktpNumber: row.nik,
    familyCardNumber: row.no_kk,
    submitDate: parseDate(row.tanggal_daftar),

    ktpAddress: row.alamat_ktp,
    ktpProvince: row.provinsi_ktp,
    ktpCity: row.kota_ktp,
    ktpDistrict: row.kecamatan_ktp,
    ktpVillage: row.desa_ktp,
    ktpPostalCode: row.kode_pos_ktp,

    domicileAddress: row.alamat_domisili,
    domicileProvince: row.provinsi_domisili,
    domicileCity: row.kota_domisili,
    domicileDistrict: row.kecamatan_domisili,
    domicileVillage: row.kelurahan_domisili,
    domicilePostalCode: row.kode_pos_domisili,
    domicileLinkMap: row.link_map_domisili,

    relative1Name: row.nama_kerabat_1,
    relative1Phone: row.no_kerabat_1,
    relative1Relationship: row.status_kerabat_1,
    relative2Name: row.nama_kerabat_2,
    relative2Phone: row.no_kerabat_2,
    relative2Relationship: row.status_kerabat_2,

    isDisability: parseDisability(row.penyandang_disabilitas),
    disabilityType: row.jenis_disabilitas,
    disabilityLink: row.link_surat_disabilitas,

    socialMediaPlatform: row.jenis_medsos,
    socialMediaAccount: row.nama_medsos,

    personalPhone: row.no_telp,
    personalWhatsapp: row.no_whatsapp,

    ktpFile: row.link_ktp,
    familyCardFile: row.link_kk,
    selfieFile: row.link_pas_foto,
  };
}

// Modular function: build data untuk submission
function buildSubmissionData(
  row: ApplicantUploadRow,
  applicantId: string,
  programId: string
) {
  const groupName = row.nama_group?.trim().toLowerCase();
  const group = groupName
    ? {
        connectOrCreate: {
          where: { name: groupName },
          create: { name: groupName },
        },
      }
    : undefined;

  return {
    applicant: { connect: { id: applicantId } },
    program: { connect: { id: programId } },
    group,
    documents: {
      create: [
        {
          name: row.dokumen1_legalitas_nama,
          fileUrl: row.dokumen1_legalitas_link,
          type: row.dokumen1_legalitas_type,
          number: row.dokumen1_legalitas_nomor,
        },
        {
          name: row.dokumen2_legalitas_nama,
          fileUrl: row.dokumen2_legalitas_link,
          type: row.dokumen2_legalitas_type,
          number: row.dokumen2_legalitas_nomor,
        },
        {
          name: "Proposal",
          fileUrl: row.link_proposal,
        },
        {
          name: "Surat Kesanggupan",
          fileUrl: row.link_surat_kesanggupan,
        },
        {
          name: "Bukti LPJ Bantuan Sebelumnya",
          fileUrl: row.bukti_lpj_bantuan_sebelumnya,
        },
        {
          name: "Bukti Kelompok Sebelumnya",
          fileUrl: row.bukti_surat_kelompok_sebelumnya,
        },
        {
          fileUrl: row.lpj_outline_laporan_pertanggung_jawaban_teknis,
          name: "LPJ Outline Laporan Pertanggung Jawaban Teknis",
        },
        {
          fileUrl: row.lpj_outline_laporan_pertanggung_jawaban_keuangan,
          name: "LPJ Outline Laporan Pertanggung Jawaban Keuangan",
          description: `Jumlah dana awal: {row.lpj_outline_jumlah_dana_awal} | Jumlah dana akhir: {row.lpj_outline_jumlah_dana_akhir} | Jumlah dana sisa: {row.lpj_outline_jumlah_dana_sisa}`,
        },
        {
          fileUrl: row.lpj_berita_acara_serah_terima_penyelesaian_pekerjaan,
          name: "LPJ Berita Acara Serah Terima Pekerjaan",
        },
        {
          fileUrl: row.link_recap_laporan_keuangan_pdf,
          name: "Recap Laporan Keuangan",
        },
        {
          fileUrl: row.link_recap_laporan_teknis_pdf,
          name: "Recap Laporan Teknis",
          description: `Total nonimal belanja: {row.total_nonimal_belanja}`,
        },
        {
          fileUrl: row.bukti_lpj_bantuan_sebelumnya,
          name: "Bukti LPJ Bantuan Sebelumnya",
        },
        {
          fileUrl: row.bukti_surat_kelompok_sebelumnya,
          name: "Bukti Kelompok Sebelumnya",
        },
        {
          fileUrl: row.link_keterangan_afirmasi,
          name: "Keterangan Afirmasi",
        },
        {
          fileUrl: row.mou_mou_user,
          name: "MOU User",
        },
        {
          fileUrl: row.mou_mou_admin,
          name: "MOU Admin",
        },
        {
          fileUrl: row.mou_bast_user,
          name: "BAST User",
        },
        {
          fileUrl: row.link_surat_pelatihan,
          name: "Surat Pelatihan",
        },
        {
          fileUrl: row.link_surat_keterangan_desmigratif,
          name: "Surat Keterangan Desmigrasi",
        },
        {
          fileUrl: row.link_dokumen_persyaratan,
          name: "Dokumen Persyaratan",
        },
        {
          fileUrl: row.lpj_laporan,
          name: "LPJ Laporan",
        },
        {
          fileUrl: row.lpj_bukti_pengeluaran,
          name: "LPJ Bukti Pengeluaran",
        },
        {
          fileUrl: row.lpj_bukti_sektor_sisa_dana,
          name: "LPJ Bukti Sektor Sisa Dana",
        },
        {
          fileUrl: row.link_video_usaha,
          name: "Video Usaha",
        },
        {
          fileUrl: row.link_foto_usaha,
          name: "Foto Usaha",
        },
      ].filter((d) => d.fileUrl),
    },
    business: {
      create: {
        nib: row.nib,
        name: row.nama_usaha,
        sector: row.sektor_usaha,
        businessType: row.jenis_usaha,
        description: row.deskripsi_usaha,
        mainProduct: row.produk_utama,

        buildingType: row.tipe_lokasi,
        ownershipStatus: row.status_lokasi,

        address: row.alamat_usaha,
        province: row.provinsi_usaha,
        city: row.kota_usaha,
        district: row.kecamatan_usaha,
        village: row.kelurahan_usaha,
        postalCode: row.kode_pos_usaha,
        linkMap: row.link_map_usaha,

        marketingArea: row.saluran_pemasaran,
        marketingChannel: row.wilayah_pemasaran,
        marketingCountry: row.negara_pemasaran,

        partnerDescription: row.partner,
        partnerCount: parseInt(row.jumlah_partner),

        omzetPerMonth: parseInt(row.omzet),
        profitPerMonth: parseInt(row.profit),
        unitsSoldPerMonth: parseInt(row.unit_terjual),
      },
    },
    workers: {
      create: [
        {
          name: row.tenaga_kerja1_nama,
          nik: row.tenaga_kerja1_nik,
          ktpUrl: row.tenaga_kerja1_ktp,
          status: row.tenaga_kerja1_status,
          jobType: row.tenaga_kerja1_tipe,
        },
        {
          name: row.tenaga_kerja2_nama,
          nik: row.tenaga_kerja2_nik,
          ktpUrl: row.tenaga_kerja2_ktp,
          status: row.tenaga_kerja2_status,
          jobType: row.tenaga_kerja2_tipe,
        },
      ].filter((d) => d.name && d.nik),
    },
  };
}
