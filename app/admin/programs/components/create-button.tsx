"use client";

import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";

import { ProgramModal } from "./program-modal";

export const CreateButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ProgramModal isOpen={open} onClose={() => setOpen(false)} />
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        <UploadCloudIcon className="mr-1" />
        Create
      </Button>
    </>
  );
};
