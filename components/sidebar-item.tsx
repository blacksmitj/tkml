"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

type SubmenuItem = {
  label: string;
  href: string;
};

type Props = {
  label: string;
  icon?: LucideIcon;
  href: string;
  children?: SubmenuItem[];
};

const SidebarItem = ({ label, icon: Icon, href, children = [] }: Props) => {
  const pathname = usePathname();
  const { collapsed } = useSidebarStore();
  const isActive =
    pathname === href ||
    children.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + "/")
    );
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(children) && children.length > 0;

  if (hasChildren && !collapsed) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={isActive ? "default" : "secondary"}
            className="w-full justify-between h-[48px] px-3 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              {!collapsed && <span>{label}</span>}
            </span>
            {open ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-6 animate-slide-down my-2">
          <Button
            variant="link"
            className={cn("w-full justify-start text-sm px-3")}
          >
            <Link href={href}>All Programs</Link>
          </Button>
          {children.map((child) => {
            const isChildActive = pathname === child.href;
            return (
              <Button
                key={child.href}
                variant={"link"}
                className={cn(
                  "w-full justify-start text-sm px-3",
                  isChildActive ? "underline" : ""
                )}
              >
                <Link href={child.href}>{child.label}</Link>
              </Button>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      variant={isActive ? "default" : "secondary"}
      className={cn(
        "w-full h-[48px] cursor-pointer",
        !collapsed ? "justify-start" : "justify-center"
      )}
      asChild
    >
      <Link href={href!}>
        {Icon && <Icon className="w-4 h-4" />}
        {!collapsed && <span>{label}</span>}
      </Link>
    </Button>
  );
};

export default SidebarItem;
