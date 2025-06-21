import { FullApplicant } from "@/types/full-applicant";
import { DetailPoint } from "./detail-point";
import { IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";
import { HeaderPoint } from "./header-point";
import { FaInstagram, FaRegUser } from "react-icons/fa";
import { CiFacebook, CiLocationOn, CiPhone } from "react-icons/ci";
import { PiTiktokLogo } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";

type Props = {
  applicant: FullApplicant;
};

const ApplicantData = ({ applicant }: Props) => {
  return (
    <div className="flex flex-col gap-4 text-sm text-muted-foreground max-w-[300px] border-l pl-8">
      <DetailPoint
        icon={CiLocationOn}
        title="Domisili"
        description={applicant.domicileAddress}
        alterDescription={
          applicant.domicileProvince +
          ", " +
          applicant.domicileCity +
          ", " +
          applicant.domicileDistrict +
          ", " +
          applicant.domicileVillage
        }
      />
      <DetailPoint
        icon={CiLocationOn}
        title="Business Address"
        description={applicant.business?.address}
        alterDescription={
          applicant.business?.province +
          ", " +
          applicant.business?.city +
          ", " +
          applicant.business?.district +
          ", " +
          applicant.business?.village
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
        description={"0" + applicant.phoneNumber}
      />
      <DetailPoint
        icon={IoLogoWhatsapp}
        title="Whatsapp"
        description={"0" + applicant.whatsappNumber}
        status={applicant.whatsappStatus}
      />
      <DetailPoint
        icon={IoMailOutline}
        title="Email"
        description={"email@gmail.com"}
      />
      <Separator />
      {applicant.relatives.length > 0 &&
        applicant.relatives.map((r) => (
          <DetailPoint
            key={r.id}
            icon={CiPhone}
            title={r.name + " (" + r.status + ")"}
            description={"0" + r.number}
          />
        ))}
    </div>
  );
};

export default ApplicantData;
