import { Button } from "@/components/ui/button";
import { FormattedApplicant } from "@/types/applicants";
import { Edit, EyeIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  submission: FormattedApplicant;
  programId: string;
};

export const Card = ({ submission, programId }: Props) => {
  const router = useRouter();

  const isPDF = (url: string) => url.toLowerCase().endsWith(".pdf");

  const onView = () => {
    router.push(`/admin/programs/${programId}/${submission.id}`);
  };

  return (
    <div className="flex gap-8 bg-white  border rounded-2xl shadow-xl/5 h-[160px] overflow-hidden p-4">
      <div className="relative w-[120px] h-[120px] flex-shrink-0">
        {isPDF(submission.selfieFile) ? (
          <iframe
            src={submission.selfieFile}
            className="w-32 h-32 rounded-md border overflow-hidden"
            title={`Dokumen ${submission.name}`}
            style={{ border: "none" }}
          />
        ) : (
          <Image
            alt={`Foto ${submission.name}`}
            src={submission.selfieFile}
            fill
            sizes="100"
            className="rounded-md object-cover"
            priority
          />
        )}
      </div>
      <div className="flex flex-col py-4 w-full pr-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold capitalize">
            {submission.name.toLowerCase()}
          </h1>
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground capitalize">
                <span className="font-bold">{submission.age} Tahun</span> -{" "}
                {submission.businessSector}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {submission.domicileCity.toLowerCase()},{" "}
                {submission.domicileProvince.toLowerCase()}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground capitalize">
                {submission.currentJob} |{" "}
                {submission.gender ? "Pria" : "Wanita"}
              </p>
              <p className="text-sm text-muted-foreground">
                {submission.ktpNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
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
