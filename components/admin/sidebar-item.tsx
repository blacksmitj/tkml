"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  icon?: LucideIcon;
  href: string;
};

const SidebarItem = ({ label, icon: Icon, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "default" : "secondary"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        {Icon && (
          <Icon
            fill={isActive ? "currentColor" : "none"}
            className="size-4 mr-1"
          />
        )}
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
