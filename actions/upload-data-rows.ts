"use server";

import { db } from "@/lib/db";
import { ApplicantUploadRow } from "@/types/applicant-upload";

export const uploadDataRows = async (rows: ApplicantUploadRow[]) => {
  try {
    const identifiers = rows.map((r) => ({
      nationalId: r.nik_pendaftar,
      fullName: r.nama_lengkap,
    }));

    // Cari yang sudah ada di database
    const existingApplicants = await db.applicant.findMany({
      where: {
        OR: identifiers.map((id) => ({
          nationalId: id.nationalId,
          fullName: id.fullName,
        })),
      },
      select: {
        nationalId: true,
        fullName: true,
      },
    });

    const existingSet = new Set(
      existingApplicants.map((a) => `${a.nationalId}-${a.fullName}`)
    );

    // Filter hanya yang belum ada
    const toInsert = rows.filter(
      (r) => !existingSet.has(`${r.nik_pendaftar}-${r.nama_lengkap}`)
    );

    let skipped = rows.length - toInsert.length;
    let inserted = 0;
    const errors: string[] = [];

    for (const row of toInsert) {
      try {
        const [selectionTeam, tkmpGroup] = await Promise.all([
          db.selectionTeam.upsert({
            where: { name: row.nama_tim_seleksi },
            update: {},
            create: { name: row.nama_tim_seleksi },
          }),
          db.tKMPGroup.upsert({
            where: { tkmpId: row.id_tkmp },
            update: {},
            create: {
              name: row.nama_kelompok_tkmp,
              tkmpId: row.id_tkmp,
              data: row.data_kelompok,
              history: row.history_tkmp,
            },
          }),
        ]);

        // Gunakan transaction agar aman dan cepat
        await db.applicant.create({
          data: {
            tkmId: row.id_tkm,
            fullName: row.nama_lengkap,
            nationalId: row.nik_pendaftar,
            familyCardNumber: row.no_kk,
            age: Number(row.umur),
            currentActivity: row.aktivitas_saat_ini,
            domicileAddress: row.alamat_domisili,
            domicileProvince: row.provinsi_domisili,
            domicileCity: row.kabkota_domisili,
            domicileDistrict: row.kecamatan_domisili,
            domicileVillage: row.kelurahan_domisili,
            phoneNumber: row.no_telp,
            whatsappNumber: row.no_whatsapp,
            whatsappStatus: row.status_no_wa,
            registrationDocStatus: row.status_dokumen_pendaftar,
            ktpLink: row.link_ktp_pendaftar,
            photoLink: row.link_pas_foto,
            selectionTeam: { connect: { id: selectionTeam.id } },
            group: { connect: { id: tkmpGroup.id } },
            relatives: {
              create: [
                {
                  name: row.nama_kerabat_1,
                  number: row.nomor_kerabat_1,
                  status: row.status_kerabat_1,
                },
                {
                  name: row.nama_kerabat_2,
                  number: row.nomor_kerabat_2,
                  status: row.status_kerabat_2,
                },
              ],
            },
            document: {
              create: {
                commitmentLetterLink: row.link_surat_kesanggupan,
                proposalLink: row.link_proposal,
                videoLink: row.link_video,
                document1Type: row.dokumen1_type,
                document1Link: row.dokumen1_link,
                document2Type: row.dokumen2_type,
                document2Link: row.dokumen2_link,
                previousAidProof: row.bukti_lpj,
                previousGroupProof: row.bukti_kelompok,
              },
            },
            business: {
              create: {
                name: row.nama_usaha,
                sector: row.sektor_usaha,
                type: row.jenis_usaha,
                description: row.deskripsi_usaha,
                mainProduct: row.produk_utama,
                address: row.alamat_lengkap_usaha,
                province: row.provinsi_usaha,
                city: row.kabkota_usaha,
                district: row.kecamatan_usaha,
                village: row.kelurahan_usaha,
              },
            },
            worker: {
              create: {
                name: row.nama_tenaga_kerja,
                nationalId: row.nik_tenaga_kerja,
                ktpLink: row.link_ktp_tenaga_kerja,
                description: row.keterangan_tenaga_kerja,
              },
            },
          },
        });

        inserted++;
      } catch (e) {
        errors.push(
          `Gagal upload untuk ${row.nik_pendaftar} - ${row.nama_lengkap}: ${
            e instanceof Error ? e.message : String(e)
          }`
        );
      }
    }

    return {
      success: true,
      message: `Selesai upload. ${inserted} berhasil, ${skipped} duplikat dilewati.`,
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
