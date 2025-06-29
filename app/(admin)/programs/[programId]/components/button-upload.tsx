"use client";

import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import { ApplicantUploadModal } from "./upload-modal";

interface Props {
  programId: string;
}

export const ButtonUpload = ({ programId }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ApplicantUploadModal
        programId={programId}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        <UploadCloudIcon className="mr-1" />
        Upload
      </Button>
    </>
  );
};
