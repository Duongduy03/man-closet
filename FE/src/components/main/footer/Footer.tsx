import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";
import style from "./footer.module.scss";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const pageData = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Sản phẩm",
    href: "/shop",
  },
  {
    name: "Liên hệ",
    href: "/contact",
  },
];

const socialData = [
  {
    icon: <Facebook className="w-5 h-5" />,
    href: "/",
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "/",
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "/",
  },
];

const Footer = () => {
  return (
    <footer className={cn(style.footer, "bg-white pt-8")}>
      <div className="section_container">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-full rounded h-[2px] bg-zinc-800"></div>
          <div className="bg-white absolute z-10 lg:px-32 md:px-26 sm:px-20 px-10">
            <Logo />
          </div>
        </div>

        <div className="flex md:items-start pt-10 md:pt-16 flex-col md:flex-row items-center">
          <div className="flex-[1] py-4 md:py-0 flex justify-center order-2 md:order-none">
            <ul>
              {pageData.map((item) => (
                <li key={uuidv4()} className="text-center my-2">
                  <Link
                    href={item.href}
                    className="px-4 py-1 font-semibold text-gray-800 text-md"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-[1] py-4 md:py-0 order-3 md:order-none">
            <div>
              <ul className="flex items-center justify-center">
                {socialData.map((item) => (
                  <li key={uuidv4()} className="px-[15%]">
                    <Link href={item.href} className="px-2">
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full h-[50px] md:h-[80px] relative my-4 flex items-center justify-center">
              <div className="absolute w-[2px] rounded h-full bg-zinc-800"></div>
            </div>
            <div className="py-2">
              <h3 className="uppercase text-center font-bold text-md md:text-lg text-gray-800 pb-4">
                Liên hệ nhanh
              </h3>
              <div>
                <button className="border-2 border-zinc-800 w-full block ">
                  <a
                    href="mailto:mancloset@gmail.com"
                    className="block px-4 py-2 md:py-4 uppercase text-gray-800 font-semibold text-sm md:text-md border-b-2 border-zinc-800"
                  >
                    mancloset@gmail.com
                  </a>
                  <a
                    href="tel:+0976244588"
                    className="block px-4 py-2 md:py-4 uppercase text-gray-800 font-semibold text-sm md:text-md"
                  >
                    (+84) 976244588
                  </a>
                </button>
              </div>

              <div className="pt-10 pb-4">
                <p className="flex items-center justify-center uppercase text-base md:text-md font-semibold">
                  <span>©</span> <span>Since 2023 | MANCLOSET</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-[1] py-4 md:py-0 order-1 md:order-none">
            <ul>
              {pageData.map((item) => (
                <li key={uuidv4()} className="text-center  my-2">
                  <Link
                    href={item.href}
                    className="px-4 py-1 font-semibold text-gray-800 text-md"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
