import SubmissionHeader from "./submission-header";
import SubmissionBusiness from "./submission-business";
import { FullSubmission } from "@/types/full-submission";
import { SubmissionDocuments } from "./submission-documents";
import ApplicantData from "./applicant-data";

type Props = {
  submission: FullSubmission;
};

export const SubmissionClient = ({ submission }: Props) => {
  return (
    <div className="flex gap-4 p-8">
      <div className="flex-1 flex-col space-y-6">
        {/* Header */}
        <SubmissionHeader submission={submission} />
        {/* Business */}
        <SubmissionBusiness business={submission.business} />
        {/* Documents */}
        <SubmissionDocuments documents={submission.documents} />
      </div>
      <ApplicantData
        applicant={submission.applicant}
        business={submission.business}
      />
    </div>
  );
};
