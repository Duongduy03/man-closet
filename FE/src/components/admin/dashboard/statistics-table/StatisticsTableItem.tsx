"use client";

import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks";
import { IProduct, ProductSold } from "@/interfaces/product";
import { getProductState } from "@/redux/reducer/product.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface StatisticsTableItemProps {
  data: ProductSold
  index: number;
}

const StatisticsTableItem = ({ data, index }: StatisticsTableItemProps) => {
  const { product_id, totalAmountSold, totalQuantitySold } = data
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatchThunk = useAppDispatch()


  return (
    <>
      <li className="flex">
        <div className="flex-[1] flex justify-center items-center">
          {index + 1}
        </div>
        <div className="flex-[2] flex justify-center items-center">
          <figure className="w-[80px] h-[80px] relative rounded overflow-hidden">
            <Image
              src={data?.productImage}
              fill
              objectFit="contain"
              className="absolute"
              alt=""
            />
          </figure>
        </div>
        <div className="flex-[6] flex justify-center items-center">
          {data?.productName}
        </div>
        <div className="flex-[3] flex justify-center items-center">
          {useCurrency(totalAmountSold)}
        </div>
        <div className="flex-[3] flex justify-center items-center">
          {totalQuantitySold}
        </div>
      </li>
    </>
  );
};

export default StatisticsTableItem;
