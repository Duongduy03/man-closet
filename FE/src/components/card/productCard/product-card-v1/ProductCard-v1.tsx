"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks";

// ui
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ActionTooltip from "@/components/actionTooltip/actionTooltip";
import { Heart, ShoppingCart, ZoomInIcon } from "lucide-react";

// css
import style from "./productCard-v1.module.scss";
import { IProduct } from "@/interfaces/product";

// type
interface Data {
  href: string;
  imageUrl: string;
  name: string;
  price: number;
  oldPrice?: number;
}

interface ProductCardV1Props {
  data: IProduct;
  marginLeft?: string;
}

const ProductCardV1 = ({ data, marginLeft = "0px" }: ProductCardV1Props) => {
  const { properties, productName, price, _id } = data || {};
  const priceFormatted = useCurrency(price);
  const dynamicStyles = {
    "--ml": marginLeft,
  } as React.CSSProperties;
  return (
    <Link
      href={''}
      style={dynamicStyles}
      className={cn(
        style.product_card,
        "flex flex-col shadow dark:shadow-lg overflow-hidden relative rounded cursor-pointer group bg-white dark:bg-zinc-900"
      )}
    >
      <div className="relative w-full h-[300px]">
        <ActionTooltip label="Thêm vào yêu thích" side="left" align="center">
          <div className="absolute z-30 top-4 right-4">
            <Heart className="w-8 h-8 text-white bg-black p-[6px] rounded-full hover:bg-rose-500" />
          </div>
        </ActionTooltip>
        <Image
          src={properties?.[0]?.imageUrl}
          layout="fill"
          objectFit="cover"
          alt="anh san pham"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <h4 className={cn(style.name, "text-base md:text-md font-medium")}>
          {productName}
        </h4>
        <h4 className="text-base md:text-md font-medium text-center">
          {priceFormatted}
        </h4>
        <div className="flex items-center justify-center gap-y-2 flex-col">
          <Link href={`/shop/detail/${_id}`} className="w-full">
            <Button variant={"bordered"} className="grow w-full">

              <span>Chi tiết</span>


              <ZoomInIcon className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/paypage" className="w-full">

            <Button variant={"primary"} className="grow w-full">
              <span>Thêm vào</span>
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardV1;
