import { isPDF } from "@/lib/utils";
import { Applicant } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Props {
  selfie: string | null;
  name: string;
}

const ApplicantPhoto = ({ selfie, name }: Props) => {
  const isPDFImage = isPDF(selfie);

  if (isPDFImage) {
    return (
      <iframe
        src={selfie ? selfie : ""}
        className="w-32 h-32 rounded-md border overflow-hidden"
        title={`Dokumen ${name}`}
        style={{ border: "none" }}
      />
    );
  }

  return (
    <Image
      alt={`Foto ${name}`}
      src={selfie ? selfie : ""}
      fill
      sizes="100"
      className="rounded-md object-cover"
      priority
    />
  );
};

export default ApplicantPhoto;
