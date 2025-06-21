"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import { HomeIcon, ListCheckIcon, Settings, UploadCloud } from "lucide-react";

export const Sidebar = () => {
  return (
    <div
      className={cn(
        "flex h-full left-0 top-0 px-4 border-r-2 flex-col w-[256px] fixed"
      )}
    >
      <Link href={"/admin"}>
        <div className=" pt-8 pl-4 pb-7">
          <h1 className="text-2xl font-extrabold tracking-wide">BBPKK</h1>
          <p>Bandung Barat</p>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Home" href="/admin" icon={HomeIcon} />
        <SidebarItem
          label="Applicants"
          href="/admin/applicants"
          icon={ListCheckIcon}
        />
        <SidebarItem label="Settings" href="/admin/settings" icon={Settings} />
        <SidebarItem label="Upload" href="/admin/upload" icon={UploadCloud} />
      </div>
    </div>
  );
};
