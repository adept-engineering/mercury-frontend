"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  SidebarMenuButton,
  SidebarMenuSubButton,
  useSidebar,
} from "./ui/sidebar";

type SidebarMenuActiveButtonProps = {
  url: string;
  icon: ReactNode;
  title: string;
};

type CollapsibleMenuActiveButtonProps = {
  url: string;
  icon?: ReactNode;
  title: string;
};

export function SidebarMenuActiveButton({
  url,
  icon,
  title,
}: SidebarMenuActiveButtonProps) {
  const pathName = usePathname();
  const isActive = pathName === url;
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      className={`w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
        ? "bg-gray-700 text-primary"
        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      <Link
        href={url}
        onClick={() => setOpenMobile(false)}
        className="flex items-center gap-3"
      >
        <span className={`${isActive ? "text-blue-600" : "text-gray-400"}`}>
          {icon}
        </span>
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
}

export function CollapsibleMenuActiveButton({
  url,
  title,
  icon,
}: CollapsibleMenuActiveButtonProps) {
  const pathName = usePathname();
  const isActive = pathName === url;
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuSubButton
      asChild
      isActive={isActive}
      className={`w-full px-3 py-2 text-sm rounded-lg transition-colors ${isActive
        ? "bg-blue-50 text-blue-700 font-medium"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      <Link
        href={url}
        onClick={() => setOpenMobile(false)}
        className="flex items-center gap-3"
      >
        {icon && (
          <span className={`${isActive ? "text-blue-600" : "text-gray-400"}`}>
            {icon}
          </span>
        )}
        <span>{title}</span>
      </Link>
    </SidebarMenuSubButton>
  );
}
