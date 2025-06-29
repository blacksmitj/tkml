import { FormattedApplicant } from "@/types/applicants";
import Link from "next/link";
import { AiOutlinePushpin, AiOutlineShopping } from "react-icons/ai";
import {
  IoCamera,
  IoCameraOutline,
  IoDocumentText,
  IoDocumentTextOutline,
  IoEye,
  IoEyeOutline,
  IoVideocam,
  IoVideocamOffOutline,
} from "react-icons/io5";

interface Props {
  submission: FormattedApplicant;
}

export const ApplicantHeader = ({ submission }: Props) => {
  return (
    <div className="flex flex-col w-full justify-center">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <div className="bg-orange-400 text-white rounded-full p-1 flex items-center justify-center">
            <IoDocumentText className="w-3 h-3" />
          </div>
          <span className="w-6 h-[2px] bg-orange-400 rounded-full" />
          <div className="bg-orange-400 text-white rounded-full p-1 flex items-center justify-center">
            <IoEye className="w-3 h-3" />
          </div>
          <span className="w-6 h-[2px] bg-orange-400 rounded-full" />
          <div className="bg-orange-400 text-white rounded-full p-1 flex items-center justify-center">
            <IoVideocam className="w-3 h-3" />
          </div>
        </div>
        <h1 className="text-3xl font-bold capitalize">
          <Link href={`/${submission.id}`} className="hover:underline">
            {submission.name.toLowerCase()}
          </Link>
        </h1>
        <div className="flex flex-col gap-1">
          <p className="flex capitalize text-sm text-muted-foreground">
            <AiOutlineShopping className="w-5 h-5 mr-2" />
            {submission.businessSector.toLowerCase()}
          </p>
          <p className="flex capitalize text-sm text-muted-foreground">
            <AiOutlinePushpin className="w-5 h-5 mr-2" />
            {submission.domicileCity.toLowerCase()},{" "}
            {submission.domicileProvince}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
