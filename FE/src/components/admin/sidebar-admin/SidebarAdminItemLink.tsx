import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  item: {
    href: string;
    name: string;
    icon: React.ReactNode;
  };
  activeLink: string;
};

const SidebarAdminItemLink = ({
  setIsOpenSidebar,
  activeLink,
  item,
}: Props) => {
  return (
    <>
      <li>
        <Link
          onClick={() => setIsOpenSidebar(false)}
          href={
            item.href === "home"
              ? "/"
              : `/admin/${item.href === "statistics" ? "" : item.href}`
          }
          className={cn(
            "after:bg-zinc-800 dark:after:bg-white group link_item",
            `${
              activeLink === (item.href === "statistics" ? "admin" : item.href)
                ? "active bg-zinc-800 dark:bg-slate-50 text-slate-50 dark:text-zinc-800"
                : ""
            }`
          )}
        >
          <span className="link_icon dark:group-hover:text-zinc-800 group-hover:text-slate-50 transition-all">
            {item.icon}
          </span>
          <span className="link_name dark:group-hover:text-zinc-800 group-hover:text-slate-50 transition-all">
            {item.name}
          </span>
        </Link>
        <span className="tooltip hidden md:block bg-slate-50 dark:bg-zinc-900">
          {item.name}
        </span>
      </li>
    </>
  );
};

export default SidebarAdminItemLink;
