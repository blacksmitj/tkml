"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ProgramsColumn } from "@/types/programs";
import { Header } from "@/components/header";
import { CreateButton } from "./create-button";

interface Props {
  data: ProgramsColumn[];
}

const ProgramsClient = ({ data }: Props) => {
  return (
    <>
      <Header
        title="Programs"
        subtitle="All Programs BBPKK Bandung Barat"
        action={<CreateButton />}
      />
      <div className="flex-1 space-y-4 p-8 mt-[160px]">
        <DataTable columns={columns} data={data} searchKey={"name"} />
      </div>
    </>
  );
};

export default ProgramsClient;
