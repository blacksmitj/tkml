"use client";

import { DataUploadModal } from "@/app/admin/applicants/components/data-upload-modal";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";

export const ButtonUploadExcel = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DataUploadModal isOpen={open} onClose={() => setOpen(false)} />
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        <UploadCloudIcon className="mr-1" />
        Upload
      </Button>
    </>
  );
};
