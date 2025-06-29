import { Applicant } from "@prisma/client";
import { DetailPoint } from "./detail-point";
import { CiPhone } from "react-icons/ci";
import { formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";

type Props = {
  applicant: Applicant;
};

export const Contact = ({ applicant }: Props) => {
  return (
    <div className="flex gap-16">
      <div className="flex flex-col gap-4 border-l pl-4 h-fit">
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
                  "https://wa.me/" +
                  formatPhoneNumber(applicant.personalWhatsapp)
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
      </div>

      <div className="flex flex-col gap-4 border-l pl-4 h-fit">
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
                <Link
                  href={"tel:" + formatPhoneNumber(applicant.relative1Phone)}
                >
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
                <Link
                  href={"tel:" + formatPhoneNumber(applicant.relative2Phone)}
                >
                  Whatsapp
                </Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};
