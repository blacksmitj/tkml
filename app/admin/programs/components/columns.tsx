import { Program } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellActtion } from "./cell-action";
import { ProgramsColumn } from "@/types/programs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columns: ColumnDef<ProgramsColumn>[] = [
  {
    accessorKey: "name",
    header: "Program Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <Link
            href={`/admin/programs/${row.original.id}`}
            className="hover:underline font-bold text-lg capitalize"
          >
            {row.original.name}
          </Link>
          <span className="text-muted-foreground font-medium">
            {row.original.year}
          </span>
          <p>{row.original.description}</p>
        </div>
      );
    },
  },
  {
    header: "Total Applicants",
    accessorKey: "totalApplicants",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActtion data={row.original} />,
  },
];
