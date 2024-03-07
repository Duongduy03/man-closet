"use client"

import { useUserInfo } from "@/hooks";
import { cn } from "@/lib/utils";
import { FolderHeart, LayoutDashboard, Package, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid"

const navData = [
  {
    title: "Tổng quan",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "dashboard",
  },
  {
    title: "Hồ sơ",
    icon: <UserCog className="w-5 h-5" />,
    href: "profile",
  },
  { title: "Đơn hàng",
   icon: <Package className="w-5 h-5" />,
    href: "orders"
   },
  { title: "Danh sách yêu thích",
   icon: <FolderHeart className="w-5 h-5" />,
    href: "wishlist"
   },
];

const UserPageNavigation = () => {
  const pathName = usePathname();
  const [activeLink, setActiveLink] = useState("");

  useEffect(()=> {
    setActiveLink(pathName.split("/")[pathName.split("/").length - 1])
  },[pathName])

  return (
    <>
      <nav className="">
        <ul className="flex flex-row md:flex-col gap-2 w-full">
          {navData.map((item) => (
            <li key={uuidv4()} className="flex-[1]">
              <Link
                href={`/user/${item.href}`}
                className={cn("text-center md:text-left flex gap-1 md:gap-2 flex-col md:flex-row items-center px-2 py-1 text-gray-800 cursor-pointer rounded hover:text-[--secondary-color] transition-all", 
                  activeLink === item.href ? "active text-[--secondary-color]" : ""
                )}
              >
                {item.icon}
                <p>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default UserPageNavigation;
