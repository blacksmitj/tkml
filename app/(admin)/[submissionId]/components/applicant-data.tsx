"use client";
import { DetailPoint } from "./detail-point";
import { IoCardOutline, IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { formatPhoneNumber, getSocialIcon, valueFormat } from "@/lib/utils";
import { Applicant, Business } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { FileModal } from "./file-modal";
import { useState } from "react";

type Props = {
  applicant: Applicant;
  business: Business | null;
};

const ApplicantData = ({ applicant, business }: Props) => {
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
    <div className="flex flex-col gap-4 text-sm text-muted-foreground max-w-[300px] border-l pl-8">
      <FileModal
        title={selectedFile?.title}
        description={selectedFile?.description}
        fileUrl={applicant.selfieFile}
        open={open}
        onClose={() => setOpen(false)}
      />
      {applicant.ktpAddress && (
        <DetailPoint
          icon={CiLocationOn}
          title="KTP"
          description={applicant.ktpAddress}
          alterDescription={`${valueFormat(
            applicant.ktpProvince
          )}, ${valueFormat(applicant.ktpCity)}, ${valueFormat(
            applicant.ktpDistrict
          )}, ${valueFormat(applicant.ktpVillage)}, ${valueFormat(
            applicant.ktpPostalCode
          )}`}
        />
      )}
      {applicant.domicileAddress && (
        <DetailPoint
          icon={CiLocationOn}
          title="Domisili"
          description={applicant.domicileAddress}
          alterDescription={`${valueFormat(
            applicant.domicileProvince
          )}, ${valueFormat(applicant.domicileCity)}, ${valueFormat(
            applicant.domicileDistrict
          )}, ${valueFormat(applicant.domicileVillage)}, ${valueFormat(
            applicant.domicilePostalCode
          )}`}
        />
      )}
      {business && (
        <DetailPoint
          icon={CiLocationOn}
          title="Business"
          description={business.address}
          alterDescription={`${valueFormat(business.province)}, ${valueFormat(
            business.city
          )}, ${valueFormat(business.district)}, ${valueFormat(
            business.village
          )}, ${valueFormat(business.postalCode)}`}
        />
      )}
      <Separator />
      {applicant.socialMediaAccount && applicant.socialMediaPlatform && (
        <DetailPoint
          icon={getSocialIcon(applicant.socialMediaPlatform)}
          title={applicant.socialMediaPlatform}
          description={applicant.socialMediaAccount}
        />
      )}
      <Separator />
      <DetailPoint
        icon={CiPhone}
        title="Phone"
        description={"+" + formatPhoneNumber(applicant.personalPhone)}
        action={
          <Button variant={"outline"} size={"sm"}>
            <Link href={"tel:" + formatPhoneNumber(applicant.personalPhone)}>
              Whatsapp
            </Link>
          </Button>
        }
      />
      <DetailPoint
        icon={IoLogoWhatsapp}
        title="Whatsapp"
        description={"+" + formatPhoneNumber(applicant.personalWhatsapp)}
        action={
          <Button variant={"outline"} size={"sm"}>
            <Link
              href={
                "https://wa.me/" + formatPhoneNumber(applicant.personalWhatsapp)
              }
            >
              Whatsapp
            </Link>
          </Button>
        }
      />
      <DetailPoint
        icon={IoMailOutline}
        title="Email"
        email={applicant.email}
        action={
          <Button variant={"outline"} size={"sm"}>
            <Link href={"mailto:" + applicant.email}>Send Email</Link>
          </Button>
        }
      />
      <Separator />
      {applicant.relative1Name && (
        <DetailPoint
          key={applicant.relative1Name}
          icon={CiPhone}
          title={
            applicant.relative1Name + " - " + applicant.relative1Relationship
          }
          description={"+" + formatPhoneNumber(applicant.relative1Phone)}
          action={
            <Button variant={"outline"} size={"sm"}>
              <Link href={"tel:" + formatPhoneNumber(applicant.relative1Phone)}>
                Whatsapp
              </Link>
            </Button>
          }
        />
      )}
      {applicant.relative2Name && (
        <DetailPoint
          key={applicant.relative2Name}
          icon={CiPhone}
          title={
            applicant.relative2Name + " - " + applicant.relative2Relationship
          }
          description={"+" + formatPhoneNumber(applicant.relative2Phone)}
          action={
            <Button variant={"outline"} size={"sm"}>
              <Link href={"tel:" + formatPhoneNumber(applicant.relative2Phone)}>
                Whatsapp
              </Link>
            </Button>
          }
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
      <Separator />
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
  );
};

export default ApplicantData;
