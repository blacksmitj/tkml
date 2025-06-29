"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import {
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  Grid2X2Plus,
  ListCheckIcon,
  NotebookPen,
  Users2,
} from "lucide-react";
import { Program } from "@prisma/client";
import { Button } from "./ui/button";
import { useSidebarStore } from "@/store/sidebar";
import { useEffect, useState } from "react";

interface Props {
  programs: Program[];
}

export const Sidebar = ({ programs }: Props) => {
  const { collapsed, toggle } = useSidebarStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Hindari SSR mismatch

  return (
    <div
      className={cn(
        "flex h-full left-0 top-0 border-r-2 flex-col fixed bg-white py-8 transition-all duration-300 px-4 ease-in-out z-20",
        collapsed ? "w-[80px]" : "w-[256px]"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "px-2 py-4 h-[100px] flex items-center transition-all duration-300",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <Link href="/">
            <h1 className="text-xl font-extrabold tracking-wide">BBPKK</h1>
            <p className="text-sm text-muted-foreground">Bandung Barat</p>
          </Link>
        )}
        <Button
          size="icon"
          variant="outline"
          className="ml-auto cursor-pointer"
          onClick={() => toggle()}
        >
          {collapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Programs"
          href="/programs"
          icon={ListCheckIcon}
          children={
            programs &&
            programs.map((program) => ({
              label: program.name + " | " + program.year,
              href: `/programs/${program.id}`,
            }))
          }
        />
        <SidebarItem label="Penugasan" href="/assignment" icon={Grid2X2Plus} />
        <SidebarItem label="Assessment" href="/assessment" icon={NotebookPen} />
        <SidebarItem label="Users" href="/users" icon={Users2} />
      </div>
      <SidebarItem label="Pofile" href="/profile" icon={CircleUserRound} />
    </div>
  );
};
