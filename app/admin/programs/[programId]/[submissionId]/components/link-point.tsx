import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import { FaEye, FaEyeDropper } from "react-icons/fa";

type Props = {
  title?: string;
  status?: string;
  linkDocument?: string;
  description?: string;
};

export const LinkPoint = ({
  title = "Document",
  status = "Unverified",
  linkDocument,
  description,
}: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <Button size={"sm"} variant={"secondary"} className="cursor-pointer">
        <FaEye className="w-4 h-4" /> Open
      </Button>
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <Badge variant={"secondary"}>{status}</Badge>
    </div>
  );
};
