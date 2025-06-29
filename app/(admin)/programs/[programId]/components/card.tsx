import { ApplicantHeader } from "@/components/applicant-header";
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
    <div className="flex gap-8 bg-white border rounded-2xl shadow-lg/5 h-[160px] overflow-hidden px-8 items-center">
      <div className="relative w-[100px] h-[100px] flex-shrink-0">
        <ApplicantPhoto name={submission.name} selfie={submission.selfieFile} />
      </div>
      <ApplicantHeader submission={submission} />
      {/* Action */}
      <div className="flex flex-col items-center">
        <Button onClick={onView} className="cursor-pointer">
          Administrasi
        </Button>
      </div>
    </div>
  );
};
