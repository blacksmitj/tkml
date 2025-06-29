import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProgramsColumn } from "@/types/programs";
import { Program } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  data: ProgramsColumn;
}

export const CellActtion = ({ data }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-5 w-5"></MoreHorizontal>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
