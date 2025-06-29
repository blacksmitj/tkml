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
    <div className="fixed top-0 left-0 right-0 z-10">
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "pl-[80px]" : "pl-[256px]"
        )}
      >
        <div className="px-8 py-6 flex flex-col gap-4 bg-white shadow-md/5 h-[160px] justify-center">
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">
                {title ? title : program?.name + " | " + program?.year}
              </h1>
              <p className="text-xs">
                {subtitle ? subtitle : program?.description}
              </p>
            </div>
            {action}
          </div>
          {filters}
        </div>
      </div>
    </div>
  );
};
