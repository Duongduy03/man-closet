import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  onClose : (value:boolean) => void,
  item: {
    href: string,
    name: string
  }
  itemSelected: string
}

const MenuModalLinkItem = ({item,itemSelected,onClose} : Props) => {
  return (
    <>
      <li>
        <Link
          onClick={() => onClose(false)}
          href={`/${item.href === "home" ? "" : item.href}`}
          className={cn(
            "flex items-center justify-between text-gray-600 hover:text-[#BE7178] group transition-all p-[6px] m-1",
            itemSelected === (item.href === "home" ? "" : item.href)
              ? "text-[#BE7178]"
              : ""
          )}
        >
          <p className="group-hover:translate-x-2 transition-all">
            {item.name}
          </p>
          <span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </Link>
      </li>
    </>
  );
};

export default MenuModalLinkItem;
