import { getSubmissionById } from "@/data/submissions";
import { SubmissionClient } from "./components/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    submissionId: string;
    programId: string;
  };
}

const SubmissionPage = async ({ params }: Props) => {
  const { submissionId, programId } = await params;

  if (!submissionId) {
    redirect("/programs");
  }

  const submission = await getSubmissionById(submissionId);

  if (!programId) {
    redirect("/programs");
  }
  if (!submission) {
    redirect(`/programs/${programId}`);
  }

  return <SubmissionClient submission={submission} />;
};

export default SubmissionPage;
