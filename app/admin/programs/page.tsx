import { Header } from "@/components/admin/header";
import ProgramsClient from "./components/client";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { ProgramsColumn } from "@/types/programs";
import { CreateButton } from "./components/create-button";

const ApplicantsPage = async () => {
  const programs = await db.program.findMany({
    orderBy: {
      year: "desc",
    },
  });

  // Ambil jumlah applicant untuk setiap program
  const programCounts = await Promise.all(
    programs.map(async (program) => {
      const count = await db.submission.count({
        where: { programId: program.id },
      });
      return { programId: program.id, count };
    })
  );

  // Gabungkan data program dengan total applicants
  const formatProgram: ProgramsColumn[] = programs.map((item) => {
    const total =
      programCounts.find((p) => p.programId === item.id)?.count ?? 0;

    return {
      id: item.id,
      name: item.name,
      description: item.description ?? "",
      isActive: item.isActive,
      year: item.year.toString(),
      createdAt: format(item.createdAt, "dd MMM yyyy"),
      totalApplicants: total,
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Header title="Programs" subtitle="All Programs BBPKK Bandung Barat" />
        <CreateButton />
      </div>
      <ProgramsClient data={formatProgram} />
    </div>
  );
};

export default ApplicantsPage;
