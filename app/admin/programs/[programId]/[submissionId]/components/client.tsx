import SubmissionHeader from "./submission-header";
import SubmissionBusiness from "./submission-business";
import { SubmissionDocument } from "./submission-document";
import { FullSubmission } from "@/types/full-submission";
import SubmissionData from "./submission-data";

type Props = {
  submission: FullSubmission;
};

export const SubmissionClient = ({ submission }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 flex-col space-y-6">
        {/* Header */}
        <SubmissionHeader submission={submission} />
        {/* Business */}
        <SubmissionBusiness submission={submission} />
        {/* Documents */}
        <SubmissionDocument submission={submission} />
      </div>
      <SubmissionData submission={submission} />
    </div>
  );
};
