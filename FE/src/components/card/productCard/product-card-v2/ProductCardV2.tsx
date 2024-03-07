import Link from "next/link";
import React from "react";
import style from "./productCardV2.module.scss";
import Image from "next/image";
import { title } from "process";
import { useCurrency } from "@/hooks";

interface ProductCardV2Props {
  data: {
    imageUrl: string;
    name: string;
    price: number;
    oldPrice?: number;
    _id: string;
    sale?: number;
  };
  marginLeft?: string;
}

const ProductCardV2 = ({ data, marginLeft = "0px" }: ProductCardV2Props) => {
  const { _id, imageUrl, name, price, oldPrice, sale } = data;

  const priceFormatted = useCurrency(price);
  const oldPriceFormatted = useCurrency(oldPrice || 0);

  const dynamicStyles = {
    "--ml": marginLeft,
  } as React.CSSProperties;
  return (
    <>
      <Link
        href={`/shop/detail/${_id}`}
        className={style.product_card + " group"}
        style={dynamicStyles}
      >
        <div className="relative w-full h-[300px] overflow-hidden rounded-sm">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
          <button className="absolute -bottom-[60px] left-[50%] translate-x-[-50%] bg-white px-4 py-1 rounded shadow-sm group-hover:bottom-5 transition-all text-sm text-gray-800 hover:bg-slate-200">
            <span>xem</span>
          </button>
        </div>
        <div className="flex-[1] py-3 flex flex-col items-center gap-2">
          <h5
            className={
              style.name + " text-gray-800 flex-[1]"
            }
          >
            {name}
          </h5>
          <p className="text-[#BE7178]">
            {priceFormatted}
            {oldPrice ? (
              <span className="text-gray-500 line-through">
                {oldPriceFormatted}
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ProductCardV2;
