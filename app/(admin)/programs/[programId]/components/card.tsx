import { ApplicantDescriptionHeader } from "@/components/applicant-description-header";
import ApplicantPhoto from "@/components/applicant-photo";
import { Button } from "@/components/ui/button";
import { FormattedApplicant } from "@/types/applicants";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  submission: FormattedApplicant;
  programId: string;
};

export const Card = ({ submission, programId }: Props) => {
  const router = useRouter();

  console.log(submission.businessName);

  const onView = () => {
    router.push(`/programs/${programId}/${submission.id}`);
  };

  return (
    <div className="flex gap-8 bg-white  border rounded-2xl shadow-xl/5 h-[160px] max-w-[800px] overflow-hidden p-4">
      <div className="relative w-[120px] h-[120px] flex-shrink-0">
        <ApplicantPhoto name={submission.name} selfie={submission.selfieFile} />
      </div>
      <ApplicantDescriptionHeader submission={submission} />
      {/* Action */}
      <div>
        <div className="flex flex-col items-center">
          <Button
            onClick={onView}
            className="rounded-none cursor-pointer"
            variant={"outline"}
          >
            <EyeIcon className="w-5 h-5" />
          </Button>
          {/* <Button className="rounded-none" variant={"outline"} asChild>
            <Link href={""}>
              <Edit className="w-5 h-5" />
            </Link>
          </Button>
          <Button className="rounded-none" variant={"outline"} asChild>
            <Link href={""}>
              <Trash className="w-5 h-5" />
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
};
