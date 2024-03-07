"use client";

import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks";
import { IProduct, ProductSold } from "@/interfaces/product";
import { getProductState } from "@/redux/reducer/product.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface StatisticsTableItemProps {
  data: ProductSold;
  index: number;
}

const StatisticsTableItem = ({ data, index }: any) => {
  return (
    <>
      <li className="flex">
        <div className="flex-[1] flex justify-center items-center">
          {index + 1}
        </div>
        <div className="flex-[3] flex justify-center items-center">
          {data.name}
        </div>
        <div className="flex-[3] flex justify-center items-center">
          {data.email}
        </div>
        <div className="flex-[2] flex justify-center items-center">
          {useCurrency(data.totalSpent)}
        </div>
      </li>
    </>
  );
};

export default StatisticsTableItem;
