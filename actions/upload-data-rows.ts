"use server";

import { db } from "@/lib/db";
import { getApplicantRole } from "@/lib/get-applicante-role";
import { getBirthDate } from "@/lib/get-birthdate";
import { parseDisability } from "@/lib/parse-disability";
import { isMale, parseDate } from "@/lib/utils";
import { ApplicantUploadRow } from "@/types/upload-row-submission";

export const uploadDataRows = async (
  rows: ApplicantUploadRow[],
  programId: string
) => {
  try {
    // 3. Ambil semua kombinasi nik + name dari rows
    const uniqueApplicants = rows.map((r) => ({
      ktpNumber: r.nik,
      name: r.nama,
    }));

    // 4. Ambil semua applicant yang cocok
    const existingApplicants = await db.applicant.findMany({
      where: {
        OR: uniqueApplicants,
      },
      select: {
        id: true,
        ktpNumber: true,
        name: true,
      },
    });

    // 5. Mapping untuk lookup cepat
    const applicantMap = new Map<string, string>(); // "nik-name" => applicantId
    for (const a of existingApplicants) {
      applicantMap.set(`${a.ktpNumber}-${a.name}`, a.id);
    }

    // 6. Ambil semua submission yang sudah ada untuk program ini
    const existingSubmissions = await db.submission.findMany({
      where: {
        programId,
        applicantId: {
          in: Array.from(applicantMap.values()),
        },
      },
      select: {
        applicantId: true,
      },
    });

    const existingApplicantIds = new Set(
      existingSubmissions.map((s) => s.applicantId)
    );

    // 7. Filter baris yang belum pernah daftar di program ini
    const toInsert = rows.filter((r) => {
      const key = `${r.nik}-${r.nama}`;
      const applicantId = applicantMap.get(key);
      return !applicantId || !existingApplicantIds.has(applicantId);
    });

    let inserted = 0;
    const errors: string[] = [];

    for (const row of toInsert) {
      try {
        // Buat applicant jika belum ada
        let applicantId = applicantMap.get(`${row.nik}-${row.nama}`);
        if (!applicantId) {
          const applicant = await db.applicant.create({
            data: {
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
            },
          });
          applicantId = applicant.id;
          applicantMap.set(`${row.nik}-${row.nama}`, applicantId);
        }

        let tkmpGroup = null;
        if (row.nama_group && row.nama_group.trim() !== "") {
          const normalizedGroupName = row.nama_group.trim().toLowerCase();

          tkmpGroup = await db.tKMPGroup.findFirst({
            where: { name: normalizedGroupName },
          });

          if (!tkmpGroup) {
            tkmpGroup = await db.tKMPGroup.create({
              data: { name: normalizedGroupName },
            });
          }
        }

        // Make Submission
        await db.submission.create({
          data: {
            applicantId,
            programId,
            groupId: tkmpGroup?.id,

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
                  fileUrl:
                    row.lpj_berita_acara_serah_terima_penyelesaian_pekerjaan,
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
          },
        });

        inserted++;
      } catch (e) {
        errors.push(
          `Gagal upload ${row.nik} - ${row.nama}: ${
            e instanceof Error ? e.message : String(e)
          }`
        );
      }
    }

    const skipped = rows.length - inserted;

    return {
      success: true,
      message: `Program dibuat. ${inserted} baris berhasil dibuat, ${skipped} dilewati.`,
      inserted,
      skipped,
      errors,
    };
  } catch (e) {
    return {
      success: false,
      message: "Kesalahan saat memproses data upload.",
      error: e instanceof Error ? e.message : String(e),
    };
  }
};
