"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ProgramsColumn } from "@/types/programs";

interface Props {
  data: ProgramsColumn[];
}

const ProgramsClient = ({ data }: Props) => {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <DataTable columns={columns} data={data} searchKey={"name"} />
    </div>
  );
};

export default ProgramsClient;
