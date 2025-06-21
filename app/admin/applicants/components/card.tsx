import { Button } from "@/components/ui/button";
import { Applicant, Business } from "@prisma/client";
import { Edit, EyeIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  applicant: Applicant & {
    business: Business | null;
  };
};

export const Card = ({ applicant }: Props) => {
  const router = useRouter();

  const onEdit = () => {
    router.push(`/admin/applicants/${applicant.id}`);
  };

  return (
    <div className="flex gap-8 bg-white border rounded-2xl shadow-xl/5 h-[200px] overflow-hidden p-4">
      <Image
        alt="Foto Profile flex items-center"
        src={applicant.photoLink}
        className="bg-red-400 rounded-full aspect-square object-cover"
        width={180}
        height={180}
        priority
      />
      <div className="flex flex-col py-4 w-full pr-8 justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold capitalize">
            {applicant.fullName}
          </h1>
          <p className="text-sm text-muted-foreground capitalize">
            {applicant.age} Tahun - {applicant.business?.sector}
          </p>
        </div>
        <p className="text-sm text-muted-foreground capitalize">
          {applicant.domicileCity}, {applicant.domicileProvince}
        </p>
      </div>
      {/* Action */}
      <div>
        <div className="flex flex-col items-center">
          <Button onClick={onEdit} className="rounded-none" variant={"outline"}>
            <EyeIcon className="w-5 h-5" />
          </Button>
          <Button className="rounded-none" variant={"outline"} asChild>
            <Link href={""}>
              <Edit className="w-5 h-5" />
            </Link>
          </Button>
          <Button className="rounded-none" variant={"outline"} asChild>
            <Link href={""}>
              <Trash className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
