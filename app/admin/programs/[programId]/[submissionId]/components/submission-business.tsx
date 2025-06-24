import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/capitalize-first";
import { FullSubmission } from "@/types/full-submission";
import { BoxIcon, LocateIcon } from "lucide-react";
import { DetailPoint } from "./detail-point";
import { HeaderPoint } from "./header-point";

type Props = {
  submission: FullSubmission;
};

const SubmissionBusiness = ({ submission }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPoint
        icon={BoxIcon}
        title={submission.business?.name}
        description={
          submission.business?.sector +
          " - " +
          submission.business?.businessType
        }
      />
      {/* Deskripsi */}
      <p>{capitalizeFirstLetter(submission.business?.description)}</p>
    </div>
  );
};

export default SubmissionBusiness;
