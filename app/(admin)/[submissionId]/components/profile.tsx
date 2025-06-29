"use client";
import { DetailPoint } from "./detail-point";
import {
  IoCardOutline,
  IoLogoWhatsapp,
  IoMailOutline,
  IoPerson,
} from "react-icons/io5";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import {
  formatPhoneNumber,
  getAge,
  getSocialIcon,
  valueFormat,
} from "@/lib/utils";
import { Applicant, Business } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { FileModal } from "./file-modal";
import { useState } from "react";

type Props = {
  applicant: Applicant;
};

const Profile = ({ applicant }: Props) => {
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
      <div className="flex flex-col gap-8 border-l pl-4 h-fit">
        <DetailPoint
          title="Umur"
          icon={IoPerson}
          description={getAge(applicant.birthDate)?.toString() + " tahun"}
        />
        <DetailPoint
          title="Identity Card"
          icon={IoCardOutline}
          description={applicant.ktpNumber}
          action={
            applicant.ktpFile && (
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() =>
                  handleOpen({
                    title: "Identity Card",
                    description: "KTP dari peserta",
                    fileUrl: applicant.ktpFile,
                  })
                }
              >
                Open File
              </Button>
            )
          }
        />
        <DetailPoint
          title="Kartu Keluarga"
          icon={Paperclip}
          description={applicant.familyCardNumber}
          action={
            applicant.familyCardFile && (
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() =>
                  handleOpen({
                    title: "Kartu Keluarga",
                    description: "Kartu Keluarga peserta",
                    fileUrl: applicant.familyCardFile,
                  })
                }
              >
                Open File
              </Button>
            )
          }
        />
      </div>

      <div className="flex flex-col gap-8 border-l pl-4 h-fit">
        {applicant.socialMediaAccount && applicant.socialMediaPlatform && (
          <DetailPoint
            icon={getSocialIcon(applicant.socialMediaPlatform)}
            title={applicant.socialMediaPlatform}
            description={applicant.socialMediaAccount}
          />
        )}

        {applicant.isDisability && (
          <DetailPoint
            icon={IoMailOutline}
            title="Disability"
            description={applicant.disabilityType}
            action={
              <Button variant={"outline"} size={"sm"}>
                <Link href={applicant.disabilityLink || "#"}>Open File</Link>
              </Button>
            }
          />
        )}
      </div>
    </>
  );
};

export default Profile;
