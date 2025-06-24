import { Header } from "@/components/admin/header";
import { db } from "@/lib/db";
import { SubmissionsClient } from "./components/client";
import { redirect } from "next/navigation";
import { ButtonUpload } from "./components/button-upload";

interface Props {
  params: {
    programId: string;
  };
}

const ProgramPage = async ({ params }: Props) => {
  const { programId } = await params;

  const program = await db.program.findFirst({
    where: {
      id: programId,
    },
    select: {
      id: true,
      name: true,
      year: true,
      description: true,
    },
  });

  if (!program) {
    redirect("/admin/programs");
  }

  return <SubmissionsClient program={program} />;
};

export default ProgramPage;
