"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  const { collapsed } = useSidebarStore();
  return (
    <main
      className={cn(
        "h-full transition-all duration-300 ease-in-out",
        collapsed ? "pl-[80px]" : "pl-[256px]"
      )}
    >
      {children}
    </main>
  );
};

export default Container;
