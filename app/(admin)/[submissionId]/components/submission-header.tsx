import { ApplicantDescriptionHeader } from "@/components/applicant-description-header";
import ApplicantPhoto from "@/components/applicant-photo";
import { formatSubmission } from "@/lib/utils";
import { FullSubmission } from "@/types/full-submission";

type Props = {
  submission: FullSubmission;
};

const SubmissionHeader = ({ submission }: Props) => {
  const formatted = formatSubmission(submission);
  return (
    <div className="flex gap-8 items-center p-4">
      <div className="w-60 h-60 overflow-hidden relative rounded-md border-8 border-secondary">
        <ApplicantPhoto
          selfie={submission.applicant.selfieFile}
          name={submission.applicant.name}
        />
      </div>
      <div className="flex flex-col gap-1">
        <ApplicantDescriptionHeader submission={formatted} />
      </div>
    </div>
  );
};

export default SubmissionHeader;
