import { Badge } from "@/components/ui/badge";
import { valueFormat } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  title: string;
  description?: string | null;
  alterDescription?: string;
  status?: string;
  action?: ReactNode;
  email?: string;
};

export const DetailPoint = ({
  icon: Icon,
  title,
  description,
  alterDescription,
  status,
  action,
  email,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 items-start text-sm text-muted-foreground">
      <div className="flex gap-2 items-center">
        <Icon className="w-4 h-4" />
        <h4 className="font-bold capitalize">{valueFormat(title)}</h4>
        {status && status === "-" && (
          <Badge variant={"secondary"}>Unverified</Badge>
        )}
        {status && status !== "-" && (
          <Badge className="capitalize">{status}</Badge>
        )}
      </div>
      <div className="flex flex-col">
        <p className="capitalize">{description && valueFormat(description)}</p>
        <p className="capitalize">
          {alterDescription && valueFormat(alterDescription)}
        </p>
        <p>{email}</p>
      </div>
      <div>{action}</div>
    </div>
  );
};
