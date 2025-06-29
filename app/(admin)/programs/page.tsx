import ProgramsClient from "./components/client";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { ProgramsColumn } from "@/types/programs";

const ProgramsPage = async () => {
  const programs = await db.program.findMany({
    orderBy: {
      year: "desc",
    },
  });

  // Ambil jumlah submission untuk setiap program
  const programCounts = await Promise.all(
    programs.map(async (program) => {
      const count = await db.submission.count({
        where: { programId: program.id },
      });
      return { programId: program.id, count };
    })
  );

  // Gabungkan data program dengan total programss
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

  return <ProgramsClient data={formatProgram} />;
};

export default ProgramsPage;
