import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { valueFormat } from "@/lib/utils";
import { Document } from "@prisma/client";
import { IconType } from "react-icons";
import { FaEye, FaEyeDropper } from "react-icons/fa";

interface Props {
  document: Document;
}

export const LinkPoint = ({ document }: Props) => {
  return (
    <div className="flex gap-4 items-start">
      <Button size={"sm"} variant={"secondary"} className="cursor-pointer">
        <FaEye className="w-4 h-4" /> Open
      </Button>
      <div className="flex flex-col gap-1">
        <p className="capitalize">{valueFormat(document.name)}</p>
        <p className="text-muted-foreground/50 text-sm">
          {document.description}
        </p>
      </div>
      <Badge variant={document.verification ? "default" : "secondary"}>
        {document.verification ? "Verified" : "Unverified"}
      </Badge>
    </div>
  );
};
