import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/capitalize-first";
import { FullSubmission } from "@/types/full-submission";
import { DetailPoint } from "./detail-point";
import { HeaderPoint } from "./header-point";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LinkPoint } from "./link-point";

type Props = {
  submission: FullSubmission;
};

export const SubmissionDocument = ({ submission }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPoint icon={IoDocumentAttachOutline} title={"Bukti Dokumen"} />
      {/* Deskripsi */}
      {/* <LinkPoint
        title="Surat Kesanggupan"
        linkDocument={submission.documents}
      /> */}
    </div>
  );
};
