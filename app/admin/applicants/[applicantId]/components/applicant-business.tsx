import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/capitalize-first";
import { FullApplicant } from "@/types/full-applicant";
import { BoxIcon, LocateIcon } from "lucide-react";
import { DetailPoint } from "./detail-point";
import { HeaderPoint } from "./header-point";

type Props = {
  applicant: FullApplicant;
};

const ApplicantBusiness = ({ applicant }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPoint
        icon={BoxIcon}
        title={applicant.business?.name}
        description={
          applicant.business?.sector + " - " + applicant.business?.type
        }
      />
      {/* Deskripsi */}
      <p>{capitalizeFirstLetter(applicant.business?.description)}</p>
    </div>
  );
};

export default ApplicantBusiness;
