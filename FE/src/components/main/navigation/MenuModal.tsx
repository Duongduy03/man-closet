"use client";

import { gc_4 } from "@/assets/media/images/home_grid_category_banner";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import "./menuModal.scss";
import {
  ChevronRight,
  Contact,
  Heart,
  Home,
  LogOut,
  Shirt,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { commonSuccessToast } from "@/utils/notify";
import { useUserInfo } from "@/hooks";
import MenuModalLinkItem from "./MenuModalLinkItem";

interface MenuModalProps {
  onClose: (value: boolean) => void;
  isOpen: boolean;
}

const MenuModal = ({ onClose, isOpen }: MenuModalProps) => {
  const user = useUserInfo();

  const menuModalData = [
    {
      icon: <Home className="w-5 h-5" />,
      href: "home",
      name: "Trang chủ",
    },
    {
      icon: <Shirt className="w-5 h-5" />,
      href: "shop",
      name: "Sản phẩm",
    },
    {
      icon: <Contact className="w-5 h-5" />,
      href: "contact",
      name: "Liên hệ",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      href: `user/wishlist`,
      name: "Danh sách yêu thích",
    },
  ];

  const router = useRouter();
  const pathName = usePathname();
  const itemSelected = pathName.split("/")[pathName.split("/").length - 1];

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    document.body.style.marginRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
      document.body.style.marginRight = "0px";
    };
  }, [isOpen]);
  const logout = () => {
    localStorage.clear();
    commonSuccessToast("Đăng xuất thành công");
    router.push("/auth");
  };

  return (
    <>
      <div
        onClick={() => onClose(false)}
        className={cn(
          "blur_layer inset-0 fixed z-30",
          isOpen ? "block" : "hidden"
        )}
      ></div>

      <div
        className={cn(
          "mb_menu fixed z-50 top-0 left-0 bg-white rounded-r h-screen w-[80%] md:w-[46%] lg:w-[360px] p-3 md:p-5  block",
          isOpen ? "open" : "close"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => onClose(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-14">
            <ul className="flex flex-col gap-2">
              {menuModalData.map((item) => (
                <MenuModalLinkItem
                  key={uuidv4()}
                  item={item}
                  onClose={onClose}
                  itemSelected={itemSelected}
                />
              ))}
              {user?.role === "admin" && (
                <MenuModalLinkItem
                  key={uuidv4()}
                  item={{
                    href: "admin",
                    name: "Đi tới Admin",
                  }}
                  onClose={onClose}
                  itemSelected={itemSelected}
                />
              )}
            </ul>
          </div>

          <div className="mt-auto">
            {user ? (
              <div className="flex items-center gap-2 md:gap-3">
                <div
                  onClick={() => {
                    router.push("/user/dashboard");
                    onClose(false);
                  }}
                  className="flex flex-[1] gap-2 items-center rounded bg-white hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  <div className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden border border-zinc-800">
                    <Image
                      src={user.avatar}
                      alt="avatar"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="text-gray-800 font-medium">{user.name}</h5>
                    <span className="text-gray-600 font-normal">
                      {user.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => logout()}
                  className="bg-zinc-800 rounded overflow-hidden flex items-center justify-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] ml-auto hover:bg-zinc-600 transition-all"
                >
                  <LogOut className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth")}
                className="bg-zinc-800 text-white w-full py-1 md:py-3 rounded"
              >
                <p>Đăng nhập</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuModal;
