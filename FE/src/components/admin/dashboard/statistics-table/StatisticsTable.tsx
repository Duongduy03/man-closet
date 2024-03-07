"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import StatisticsTableItem from "./StatisticsTableItem";
import { ProductSold } from "@/interfaces/product";

interface StatisticsTableProps {
  data: ProductSold[];
}

const StatisticsTable = ({ data }: StatisticsTableProps) => {
  return (
    <>
      <div className="bg-white  px-6 py-3 ">
        <h2 className="pb-6 text-lg font-medium text-center">
          Sản phẩm bán chạy
        </h2>
        <div className="overflow-x-auto flex flex-col gap-2">
          <div className="flex py-2 bg-slate-50 rounded">
            <div className="flex-[1] flex justify-center items-center">Stt</div>
            <div className="flex-[2] flex justify-center items-center">Ảnh</div>
            <div className="flex-[6] flex justify-center items-center">Tên</div>
            <div className="flex-[3] flex justify-center items-center">
              Doanh thu
            </div>
            <div className="flex-[3] flex justify-center items-center">
              Đã bán
            </div>
          </div>

          <ul className="flex flex-col gap-2 py-1">
            {data.map((item, index) => {
              return (
                <StatisticsTableItem key={uuidv4()} index={index} data={item} />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StatisticsTable;
