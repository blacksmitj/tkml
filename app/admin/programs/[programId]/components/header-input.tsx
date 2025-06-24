import { Header } from "@/components/admin/header";
import React from "react";
import { ButtonUpload } from "./button-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const HeaderSearch = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="ml-[256px]">
        <div className="px-8 py-6 flex flex-col gap-4 bg-white shadow-md/5 h-[160px] justify-center">
          <div className="flex gap-4 justify-between">
            <Header
              title={`${program.name} | ${program.year}`}
              subtitle={program?.description}
            />
            <ButtonUpload programId={program.id} />
          </div>
          <div className="flex justify-between gap-4">
            <Input
              placeholder="Cari nama, nomor KTP, nama bisnis, atau sektor bisnis"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="flex"
            />
            <Button variant="outline" onClick={() => setOpen(true)}>
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
