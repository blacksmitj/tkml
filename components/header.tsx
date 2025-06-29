"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";
import { ReactNode } from "react";

interface Props {
  title?: string;
  subtitle?: string;
  program?: {
    id: string;
    name: string;
    year: number;
    description: string | null;
  };
  filters?: ReactNode;
  action?: ReactNode;
}

export const Header = ({
  program,
  filters,
  action,
  title,
  subtitle,
}: Props) => {
  const { collapsed } = useSidebarStore();
  return (
    <div className="p-12 flex flex-col gap-4 h-[160px] w-full ">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            {title ? title : program?.name}
          </h1>
          <p className="text-xs">
            {subtitle ? subtitle : program?.description + " | " + program?.year}
          </p>
        </div>
        {action}
      </div>
      {filters}
    </div>
  );
};
