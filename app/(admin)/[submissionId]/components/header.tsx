import { ApplicantHeader } from "@/components/applicant-header";
import ApplicantPhoto from "@/components/applicant-photo";
import { formatSubmission } from "@/lib/utils";
import { FullSubmission } from "@/types/full-submission";

type Props = {
  submission: FullSubmission;
};

const Header = ({ submission }: Props) => {
  const formatted = formatSubmission(submission);
  return (
    <div className="flex gap-8 items-center p-4">
      <div className="w-[160px] h-[160px] flex-shrink-0 overflow-hidden relative rounded-full">
        <ApplicantPhoto
          selfie={submission.applicant.selfieFile}
          name={submission.applicant.name}
        />
      </div>
      <div className="flex flex-col gap-1">
        <ApplicantHeader submission={formatted} />
      </div>
    </div>
  );
};

export default Header;
