"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import StatisticsTableItem from "./StatisticsTableItem";
import { ProductSold } from "@/interfaces/product";

interface StatisticsTableProps {
  data: ProductSold[];
}

const StatisticsTableUser = ({ data }: any) => {
  return (
    <>
      <div className="bg-white  px-6 py-3 ">
        <h2 className="pb-6 text-lg font-medium text-center">
          Top 5 Khách hàng chi tiêu nhiều
        </h2>
        <div className="overflow-x-auto flex flex-col gap-2">
          <div className="flex py-2 bg-slate-50 rounded">
            <div className="flex-[1] flex justify-center items-center">STT</div>
            <div className="flex-[3] flex justify-center items-center">
              Họ tên
            </div>
            <div className="flex-[3] flex justify-center items-center">
              Email
            </div>
            <div className="flex-[2] flex justify-center items-center">
              Tổng tiền
            </div>
          </div>

          <ul className="flex flex-col gap-2 py-1">
            {data?.map((item: any, index: any) => {
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

export default StatisticsTableUser;
