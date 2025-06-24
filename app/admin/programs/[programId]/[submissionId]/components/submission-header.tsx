import { FullSubmission } from "@/types/full-submission";
import Image from "next/image";

type Props = {
  submission: FullSubmission;
};

const SubmissionHeader = ({ submission }: Props) => {
  return (
    <div className="flex gap-8 items-center">
      <Image
        src={submission.applicant.selfieFile || ""}
        alt={submission.applicant.name}
        className="aspect-square object-cover rounded-full border-8  border-secondary"
        width={200}
        height={200}
      />
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold capitalize">
          {submission.applicant.name}
        </h1>
        <p className="capitalize">
          {submission.applicant.domicileCity},{" "}
          {submission.applicant.domicileProvince}
        </p>
        <p className="capitalize">{submission.business?.sector}</p>
      </div>
    </div>
  );
};

export default SubmissionHeader;
