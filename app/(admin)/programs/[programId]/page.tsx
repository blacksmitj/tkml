import { db } from "@/lib/db";
import { SubmissionsClient } from "./components/client";
import { redirect } from "next/navigation";

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
    redirect("/programs");
  }

  return <SubmissionsClient program={program} />;
};

export default ProgramPage;
