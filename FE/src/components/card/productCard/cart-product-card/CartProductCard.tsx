"use client";

import React, { useEffect, useState } from "react";
import style from "./cardProductCard.module.scss";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useCurrency } from "@/hooks";

interface CardProductCardProps {
  _id: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  color: string;
  size: number | string;
  selected: boolean;
  handleChangeSelect: (product_id: string, isChecked: boolean) => void;
  handleUpdateQuantity: (
    product_id: string,
    quantity: number,
    totalPrice: number
  ) => void;
}

const CartProductCard = ({
  _id,
  imageUrl,
  name,
  quantity,
  price,
  totalPrice,
  color,
  size,
  selected,
  handleChangeSelect,
  handleUpdateQuantity,
}: CardProductCardProps) => {
  const formattedTotalPrice = useCurrency(totalPrice);

  const handleChangeQuantity = (calculation: string) => {
    if (calculation === "plus") {
      const newQuantity = quantity + 1;
      const newTotalPrice = price * newQuantity;
      handleUpdateQuantity(_id, newQuantity, newTotalPrice);
    }

    if (calculation === "minus") {
      if (quantity === 0) {
        const newQuantity = 0;
        const newTotalPrice = 0;
        handleUpdateQuantity(_id, newQuantity, newTotalPrice);
      } else {
        const newQuantity = quantity - 1;
        const newTotalPrice = price * newQuantity;
        handleUpdateQuantity(_id, newQuantity, newTotalPrice);
      }
    }
  };

  const handleChangeChecked = (id: string, checked: boolean) => {
    handleChangeSelect(id, !checked);
  };

  return (
    <div
      className={cn(
        "cart-product-card",
        "flex gap-4 px-4 py-3 bg-white dark:bg-zinc-900 items-center rounded-sm"
      )}
    >
      <div>
        <input
          type="checkbox"
          checked={selected}
          disabled={quantity > 0 ? false : true}
          onChange={() => handleChangeChecked(_id, selected)}
        />
      </div>
      <article className="figure w-[80px] min-w-[80px] h-[80px] md:w-[100px] md:min-w-[100px] md:h-[100px] relative border">
        <Image
          src={imageUrl}
          alt="product img"
          fill
          className="object-contain"
        />
      </article>
      <div className="flex flex-col gap-4 md:flex-row md:items-center w-full">
        <div className="product-info flex flex-col gap-1 flex-[3]">
          <h4 className="text-md md:text-lg font-medium text-zinc-800 dark:text-white flex-1">
            {name}
          </h4>
          <p className="text-sm flex gap-1 text-zinc-700 dark:text-slate-100">
            <span className="font-medium">Color:</span>
            <span>{color}</span>
          </p>
          <p className="text-sm flex gap-1 text-zinc-700 dark:text-slate-100">
            <span className="font-medium">Size:</span>
            <span>{size}</span>
          </p>
        </div>
        <div className={cn(style.product_quantity, "flex-1")}>
          <div className="flex gap-2">
            <button
              onClick={() => handleChangeQuantity("minus")}
              className="border border-zinc-400 rounded-full grid place-items-center w-8 h-8 group hover:bg-zinc-800 dark:hover:bg-slate-50 transition-all"
            >
              <Minus className="w-4 h-4 group-hover:text-white dark:group-hover:text-zinc-800" />
            </button>
            <div className="bg-slate-100 dark:bg-zinc-800 w-8 h-8 grid place-items-center rounded-sm">
              {quantity}
            </div>
            <button
              onClick={() => handleChangeQuantity("plus")}
              className="border border-zinc-400 rounded-full grid place-items-center w-8 h-8 group hover:bg-zinc-800 dark:hover:bg-slate-50 transition-all"
            >
              <Plus className="w-4 h-4 group-hover:text-white dark:group-hover:text-zinc-800" />
            </button>
          </div>
        </div>
        <div className={cn(style.product_price, "flex-1")}>
          <h4 className="self-end">{formattedTotalPrice}</h4>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
