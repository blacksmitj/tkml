"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import {
  ChevronsLeft,
  ChevronsRight,
  HomeIcon,
  ListCheckIcon,
  Settings,
} from "lucide-react";
import { Program } from "@prisma/client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSidebarStore } from "@/store/sidebar";

interface Props {
  programs: Program[];
}

export const Sidebar = ({ programs }: Props) => {
  const { collapsed, toggle } = useSidebarStore();
  return (
    <div
      className={cn(
        "flex h-full left-0 top-0 border-r-2 flex-col fixed bg-white transition-all duration-300 px-4 ease-in-out z-20",
        collapsed ? "w-[80px]" : "w-[256px]"
      )}
    >
      {/* Header */}
      <div className="pt-6 px-4 pb-4 h-[100px] flex items-center justify-between transition-all duration-300">
        {!collapsed && (
          <Link href="/admin">
            <h1 className="text-xl font-extrabold tracking-wide">BBPKK</h1>
            <p className="text-sm text-muted-foreground">Bandung Barat</p>
          </Link>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="ml-auto"
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
        <SidebarItem label="Home" href="/admin" icon={HomeIcon} />
        <SidebarItem
          label="Programs"
          href="/admin/programs"
          icon={ListCheckIcon}
          children={programs.map((program) => ({
            label: program.name + " | " + program.year,
            href: `/admin/programs/${program.id}`,
          }))}
        />
        <SidebarItem label="Settings" href="/admin/settings" icon={Settings} />
      </div>
    </div>
  );
};
