"use client";
import React, { useEffect, useState } from "react";
import {
  StatisticsCard,
  StatisticsChart,
  StatisticsTable,
  StatisticsTableUser,
} from "@/components/admin/dashboard";
import { ProductSold } from "@/interfaces/product";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getAllOrderBillState,
  getCountBillState,
  getDoanhThuState,
  getProductSoldState,
  topUserChiTieu,
} from "@/redux/reducer/order.reducer";
import { getCountUserState } from "@/redux/reducer/user.reducer";

const Dashboard = () => {
  const [productSold, setProductSold] = useState<ProductSold[]>([]);
  const [topUser, setTopUser] = useState<any>([]);

  const productSoldState = useAppSelector((state) => state.order.productSold);
  const topUserState = useAppSelector((state) => state.order.users);
  const [filter, setFilter] = useState<any>({
    filter: "Tháng",
  });
  const dispatchThunk = useAppDispatch();

  console.log(productSoldState)

  useEffect(() => {
    dispatchThunk(getProductSoldState(filter));
    dispatchThunk(getAllOrderBillState());
    dispatchThunk(getCountUserState(filter));
    dispatchThunk(getCountBillState(filter));
    dispatchThunk(getDoanhThuState(filter));
    dispatchThunk(topUserChiTieu(filter));
  }, [dispatchThunk, filter]);

  useEffect(() => {
    setProductSold(productSoldState);
    setTopUser(topUserState);
  }, [productSoldState, topUserState]);

  return (
    <div>
      <section className="section_container py-4">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Lọc theo
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setFilter({
              filter: e.target.value,
            });
          }}
        >
          <option value="Ngày">Ngày</option>
          <option value="Tuần">Tuần</option>
          <option selected value="Tháng">
            Tháng
          </option>
          <option value="Năm">Năm</option>
        </select>
      </section>
      <section className="section_container py-4">
        <StatisticsCard filter={filter.filter} />
      </section>

      <section className="section_container py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[1] lg:flex-[3]">
            <StatisticsTable data={productSold} />
          </div>
        </div>
      </section>
      <section className="section_container py-4">
        <StatisticsTableUser data={topUser} />
      </section>
    </div>
  );
};

export default Dashboard;
