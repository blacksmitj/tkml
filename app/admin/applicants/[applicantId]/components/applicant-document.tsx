import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/capitalize-first";
import { FullApplicant } from "@/types/full-applicant";
import { DetailPoint } from "./detail-point";
import { HeaderPoint } from "./header-point";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { LinkPoint } from "./link-point";

type Props = {
  applicant: FullApplicant;
};

export const ApplicantDocument = ({ applicant }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderPoint icon={IoDocumentAttachOutline} title={"Bukti Dokumen"} />
      {/* Deskripsi */}
      <LinkPoint
        title="Surat Kesanggupan"
        linkDocument={applicant.document?.commitmentLetterLink}
      />
      <LinkPoint
        title="Proposal"
        linkDocument={applicant.document?.proposalLink}
      />
      <LinkPoint title="Video" linkDocument={applicant.document?.videoLink} />
      <LinkPoint
        title={applicant.document?.document1Type}
        linkDocument={applicant.document?.document1Link}
      />
      <LinkPoint
        title={applicant.document?.document2Type}
        linkDocument={applicant.document?.document2Link}
      />
      <LinkPoint
        title="Bukti LPJ"
        linkDocument={applicant.document?.previousAidProof}
      />
      <LinkPoint
        title="Bukti Kelompok"
        linkDocument={applicant.document?.previousGroupProof}
      />
    </div>
  );
};
