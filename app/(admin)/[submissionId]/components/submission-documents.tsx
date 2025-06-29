import { Document } from "@prisma/client";
import { HeaderPoint } from "./header-point";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LinkPoint } from "./link-point";

type Props = {
  documents: Document[];
};

export const SubmissionDocuments = ({ documents }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPoint icon={IoDocumentAttachOutline} title={"Bukti Dokumen"} />
      {/* Deskripsi */}
      {documents.map((document) => (
        <LinkPoint document={document} key={document.id} />
      ))}
    </div>
  );
};
