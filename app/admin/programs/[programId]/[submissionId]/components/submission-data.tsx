import { FullSubmission } from "@/types/full-submission";
import { DetailPoint } from "./detail-point";
import { IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";
import { FaInstagram, FaRegUser } from "react-icons/fa";
import { CiFacebook, CiLocationOn, CiPhone } from "react-icons/ci";
import { PiTiktokLogo } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";

type Props = {
  submission: FullSubmission;
};

const SubmissionData = ({ submission }: Props) => {
  return (
    <div className="flex flex-col gap-4 text-sm text-muted-foreground max-w-[300px] border-l pl-8">
      <DetailPoint
        icon={CiLocationOn}
        title="Domisili"
        description={submission.applicant.domicileAddress}
        alterDescription={
          submission.applicant.domicileProvince +
          ", " +
          submission.applicant.domicileCity +
          ", " +
          submission.applicant.domicileDistrict +
          ", " +
          submission.applicant.domicileVillage
        }
      />
      <DetailPoint
        icon={CiLocationOn}
        title="Business Address"
        description={submission.business?.address}
        alterDescription={
          submission.business?.province +
          ", " +
          submission.business?.city +
          ", " +
          submission.business?.district +
          ", " +
          submission.business?.village
        }
      />
      <Separator />
      <DetailPoint
        icon={CiFacebook}
        title="Facebook"
        description={"facebookaja"}
      />
      <DetailPoint
        icon={FaInstagram}
        title="Instagram"
        description={"instagram.account"}
      />
      <DetailPoint
        icon={PiTiktokLogo}
        title="Tiktok"
        description={"email@gmail.com"}
      />
      <Separator />
      <DetailPoint
        icon={CiPhone}
        title="Phone"
        description={"0" + submission.applicant.personalPhone}
      />
      <DetailPoint
        icon={IoLogoWhatsapp}
        title="Whatsapp"
        description={"0" + submission.applicant.personalWhatsapp}
      />
      <DetailPoint
        icon={IoMailOutline}
        title="Email"
        description={"email@gmail.com"}
      />
      <Separator />
      <DetailPoint
        key={submission.applicant.relative1Name}
        icon={CiPhone}
        title={
          submission.applicant.relative1Name +
          " (" +
          submission.applicant.relative1Relationship +
          ")"
        }
        description={"0" + submission.applicant.relative1Phone}
      />
    </div>
  );
};

export default SubmissionData;
