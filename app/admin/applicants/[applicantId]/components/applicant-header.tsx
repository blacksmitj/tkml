import { FullApplicant } from "@/types/full-applicant";
import Image from "next/image";

type Props = {
  applicant: FullApplicant;
};

const ApplicantHeader = ({ applicant }: Props) => {
  return (
    <div className="flex gap-8 items-center">
      <Image
        src={applicant.photoLink}
        alt={applicant.fullName}
        className="aspect-square object-cover rounded-full border-8  border-secondary"
        width={200}
        height={200}
      />
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold capitalize">{applicant.fullName}</h1>
        <p className="capitalize">
          {applicant.domicileCity}, {applicant.domicileProvince}
        </p>
        <p className="capitalize">{applicant.business?.sector}</p>
      </div>
    </div>
  );
};

export default ApplicantHeader;
