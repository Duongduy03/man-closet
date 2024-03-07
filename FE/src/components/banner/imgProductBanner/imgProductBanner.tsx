import { DemoProduct } from "@/assets/media/images/png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ImgProductBanner = () => {
  return (
    <div className="bg-zinc-200 dark:bg-slate-50/70 text-zinc-800 py-4 md:py-10">
      <div className="section_container flex md:flex-row flex-col-reverse gap-x-10 item-center justify-center">
        <div className="grow flex items-center justify-center md:justify-center relative">
          <Image
            src={DemoProduct}
            alt="product-img"
            width={400}
            height={400}
            className="object-contain"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="grow py-8 flex flex-col gap-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider leading-normal max-w-[600px]">
            Sự Đặc Sắc Độc Nhất của Sản Phẩm mới và Trending
          </h2>
          <ul className="pl-4 list-disc flex flex-col gap-y-3 text-normal text-zinc-600 text-md  md:text-lg ">
            <li>Form đầy đặn, vải giày tạo cho người mặc cảm giác ấm áp</li>
            <li>Logo Fear Of God độc quyền</li>
            <li>Limited, có thể dùng làm mang tính chất sưu tầm</li>
          </ul>
          <Link href={"/"} className="flex justify-center md:justify-normal">
            <Button className="dark:bg-zinc-800 dark:text-white">
              Thêm Vào Giỏ Hàng
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImgProductBanner;
