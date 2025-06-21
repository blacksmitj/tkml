import { FullApplicant } from "@/types/full-applicant";
import ApplicantHeader from "./applicant-header";
import ApplicantBusiness from "./applicant-business";
import ApplicantData from "./applicant-data";
import { Separator } from "@/components/ui/separator";
import { ApplicantDocument } from "./applicant-document";

type Props = {
  applicant: FullApplicant;
};

export const ApplicantClient = ({ applicant }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 flex-col space-y-6">
        {/* Header */}
        <ApplicantHeader applicant={applicant} />
        {/* Business */}
        <ApplicantBusiness applicant={applicant} />
        {/* Documents */}
        <ApplicantDocument applicant={applicant} />
      </div>
      <ApplicantData applicant={applicant} />
    </div>
  );
};
