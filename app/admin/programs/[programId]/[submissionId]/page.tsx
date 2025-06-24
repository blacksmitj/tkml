import { getSubmissionById } from "@/data/submissions";
import { SubmissionClient } from "./components/client";

interface Props {
  params: {
    submissionId: string;
  };
}

const SubmissionPage = async ({ params }: Props) => {
  const { submissionId } = await params;

  if (!submissionId) {
    return <div>Submission not found</div>;
  }
  const submission = await getSubmissionById(submissionId);

  if (submission === null) {
    return <div>Submission not found</div>;
  }

  return (
    <section>
      <SubmissionClient submission={submission} />
    </section>
  );
};

export default SubmissionPage;
