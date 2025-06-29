import { FormattedApplicant } from "@/types/applicants";
import React from "react";

interface Props {
  submission: FormattedApplicant;
}

export const ApplicantDescriptionHeader = ({ submission }: Props) => {
  return (
    <div className="flex flex-col w-full pr-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold capitalize">
          {submission.name.toLowerCase()}
        </h1>
        <div className="flex gap-8 capitalize text-sm text-muted-foreground">
          <ul className="flex flex-col gap-1">
            <li>{submission.ktpNumber}</li>
            <li>
              <span className="font-bold">{submission.age} Tahun</span> |{" "}
              {submission.gender ? "Pria" : "Wanita"}
            </li>
          </ul>
          <ul className="hidden md:flex-col md:flex">
            <li>
              {submission.domicileCity.toLowerCase()},{" "}
              {submission.domicileProvince.toLowerCase()}{" "}
            </li>
            <li>{submission.currentJob}</li>
          </ul>
        </div>
        <p className="capitalize text-sm text-muted-foreground">
          {submission.businessName.toLowerCase()} |{" "}
          {submission.businessSector.toLowerCase()}
        </p>
      </div>
    </div>
  );
};
