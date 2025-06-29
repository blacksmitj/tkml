import { getSubmissionById } from "@/data/submissions";
import { SubmissionClient } from "./components/client";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  params: {
    submissionId: string;
  };
}

const SubmissionPage = async ({ params }: Props) => {
  const { submissionId } = await params;

  if (!submissionId) {
    redirect("/programs");
  }

  const submission = await getSubmissionById(submissionId);

  if (!submission) {
    redirect(`/programs`);
  }

  return <SubmissionClient submission={submission} />;
};

export default SubmissionPage;
