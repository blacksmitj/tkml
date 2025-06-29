import { Applicant, Business } from "@prisma/client";
import { DetailPoint } from "./detail-point";
import { CiLocationOn } from "react-icons/ci";
import { valueFormat } from "@/lib/utils";

type Props = {
  applicant: Applicant;
  business: Business | null;
};

export const Address = ({ applicant, business }: Props) => {
  return (
    <>
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
    </>
  );
};
