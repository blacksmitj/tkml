"use client";

import { Input } from "@/components/ui/input";
import { Card } from "./card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FormattedApplicant } from "@/types/applicants";
import { Header } from "@/components/admin/header";
import { ButtonUpload } from "./button-upload";
import { FilterDrawer } from "./filter-drawer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Props {
  program: {
    id: string;
    name: string;
    year: number;
    description: string | null;
  };
}

export const SubmissionsClient = ({ program }: Props) => {
  const [open, setOpen] = useState(false);

  // filter yang dipakai query
  const [filters, setFilters] = useState({
    search: "",
    province: "",
    city: "",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["submissions", filters],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        cursor: pageParam ?? "",
        search: filters.search,
        province: filters.province,
        city: filters.city,
        programId: program.id,
      });

      const res = await fetch(`/api/submissions?${params.toString()}`);
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });

  const { ref, inView } = useInView();

  // fetch next page saat scroll
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // apply filter dari drawer
  const handleApplyDrawerFilter = (filters: {
    province?: string | null;
    city?: string | null;
  }) => {
    console.log("test");

    setFilters((prev) => ({
      ...prev,
      province: filters.province ?? "",
      city: filters.city ?? "",
    }));
  };
  console.log({ filters });

  return (
    <>
      <FilterDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        programId={program.id}
        onApply={handleApplyDrawerFilter}
        initialProvince={filters.province}
        initialCity={filters.city}
      />
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
      <div className="flex flex-col gap-4 pt-[200px] p-8">
        {data?.pages.flatMap((page) =>
          page.data.map((submission: FormattedApplicant) => (
            <Card
              programId={program.id}
              submission={submission}
              key={submission.id}
            />
          ))
        )}

        {isLoading && <p>Loading...</p>}
        <div ref={ref} />
        {isFetchingNextPage && <p>Loading more...</p>}
        {!hasNextPage && !isLoading && (
          <p className="text-sm text-center text-muted-foreground">
            Semua data telah dimuat
          </p>
        )}
      </div>
    </>
  );
};
