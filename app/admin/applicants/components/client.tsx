"use client";

import { Input } from "@/components/ui/input";
import { Card } from "./card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Applicant, Business } from "@prisma/client";

export const ApplicantsClient = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["applicants"],
      queryFn: async ({ pageParam }) => {
        const res = await fetch(`/api/applicants?cursor=${pageParam}`);
        return res.json();
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: null,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Search..." className="w-80" />
      {/* {JSON.stringify(data)} */}
      {data?.pages.flatMap((page) =>
        page.data.map(
          (
            applicant: Applicant & {
              business: Business | null;
            }
          ) => (
            <Card applicant={applicant} key={applicant.id} />
            // <div key={applicant.id} className="p-4 rounded-lg border shadow-sm">
            //   <p className="font-semibold">{applicant.fullName}</p>
            //   <p className="text-muted-foreground text-sm">
            //     {applicant.nationalId}
            //   </p>
            // </div>
          )
        )
      )}

      {isLoading && <p>Loading...</p>}
      <div ref={ref} />
      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && !isLoading && (
        <p className="text-sm text-center text-muted-foreground">
          Semua data telah dimuat
        </p>
      )}
      {/* <Card />
      <Card />
      <Card /> */}
    </div>
  );
};
