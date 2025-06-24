import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  title: string;
  description?: string | null;
  alterDescription?: string;
  status?: string;
};

export const DetailPoint = ({
  icon: Icon,
  title,
  description,
  alterDescription,
  status,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 items-start text-sm text-muted-foreground">
      <div className="flex gap-2 items-center">
        <Icon className="w-4 h-4" />
        <h4 className="font-bold capitalize">{title}</h4>
        {status && status === "-" && (
          <Badge variant={"secondary"}>Unverified</Badge>
        )}
        {status && status !== "-" && (
          <Badge className="capitalize">{status}</Badge>
        )}
      </div>
      <div className="flex flex-col">
        <p className="capitalize">{description}</p>
        <p className="capitalize">{alterDescription}</p>
      </div>
    </div>
  );
};
