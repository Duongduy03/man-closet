"use client";
import React, { useEffect, useState } from "react";
import { bannerData } from "./demo.data";
import { ProductCardV2 } from "@/components/card";
import { v4 as uuidv4 } from "uuid";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GridView } from "@/components/dataViews";
import TitleGap from "@/components/titleGap";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllProductState } from "@/redux/reducer/product.reducer";
import { IProduct } from "@/interfaces/product";

const Banner = ({
  label,
  href,
  banner,
}: {
  label: string;
  href: string;
  banner: string | StaticImageData;
}) => {
  return (
    <div className="rounded h-full w-full relative overflow-hidden">
      <Image
        src={banner}
        alt="banner"
        width={500}
        height={500}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-700/50 z-[8]"></div>
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center gap-y-2">
        <h4 className="text-white font-medium">{label}</h4>
        <Link href={href}>
          <Button variant={"shop_now"}>Xem ngay</Button>
        </Link>
      </div>
    </div>
  );
};

const GridProduct = () => {
  const products = useAppSelector((state) => state.product.products);

  const dispatchThunk = useAppDispatch();

  useEffect(() => {
    dispatchThunk(getAllProductState());
  }, [dispatchThunk]);

  return (
    <div>
      <TitleGap title="Sản phẩm trending" />
      <div className="py-2">
        <GridView className="py-3 gap-y-6" marginLeft="30px" wrap previews={4}>
          {products?.map((item: any) => {
            const data = {
              _id: item._id,
              name: item.productName,
              price: item.price,
              imageUrl: item.properties[0].imageUrl,
            };
            return (
              <ProductCardV2 key={uuidv4()} data={data} marginLeft="30px" />
            );
          })}
        </GridView>
        <div className="flex md:flex-row flex-col gap-4 md:gap-6 md:py-10 py-6">
          {bannerData.map((item) => (
            <Banner key={uuidv4()} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridProduct;
