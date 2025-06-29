import { Document } from "@prisma/client";
import { HeaderPoint } from "./header-point";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LinkPoint } from "./link-point";
import { DetailPoint } from "./detail-point";
import { formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileModal } from "./file-modal";
import { useState } from "react";

type Props = {
  documents: Document[];
};

export const Documents = ({ documents }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    title: string;
    description: string;
    fileUrl: string | null;
  } | null>(null);

  const handleOpen = (fileData: typeof selectedFile) => {
    setSelectedFile(fileData);
    setOpen(true);
  };
  return (
    <>
      <FileModal
        title={selectedFile?.title}
        description={selectedFile?.description}
        fileUrl={selectedFile?.fileUrl}
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedFile(null);
        }}
      />

      <div className="flex flex-col gap-4">
        <HeaderPoint icon={IoDocumentAttachOutline} title={"Bukti Dokumen"} />
        {/* Deskripsi */}
        {documents.map((document) => (
          <DetailPoint
            key={document.id}
            title={document.name}
            description={document.description}
            action={
              document.fileUrl && (
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() =>
                    handleOpen({
                      title: document.name,
                      description: document.description || "",
                      fileUrl: document.fileUrl,
                    })
                  }
                >
                  Open File
                </Button>
              )
            }
          />
        ))}
      </div>
    </>
  );
};
