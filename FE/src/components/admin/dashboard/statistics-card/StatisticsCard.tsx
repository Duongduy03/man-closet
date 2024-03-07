"use client";

import { GridView } from "@/components/dataViews";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StatisticsCardItem from "./StatisticsCardItem";
import { useCurrency, usePercentage } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getAllOrderBillState,
  getCountBillState,
  getDoanhThuState,
} from "@/redux/reducer/order.reducer";
import { getCountUserState } from "@/redux/reducer/user.reducer";
import { User } from "@/interfaces/user.interface";

const StatisticsCard = ({ filter }: any) => {
  const ordersState = useAppSelector((state) => state.order.orders);
  const countBillState = useAppSelector((state) => state.order.countBill);
  const usersState = useAppSelector((state) => state.user.countUser);
  const doanhThuState = useAppSelector((state) => state.order.doanhthu);

  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [countBill, setCountBill] = useState(0);
  const [doanhthu, setDoanhThu] = useState(0);
  // const dispatchThunk = useAppDispatch();

  // useEffect(() => {
  //   dispatchThunk(getAllOrderBillState());
  //   dispatchThunk(getCountUserState());
  //   dispatchThunk(getCountBillState());
  //   dispatchThunk(getDoanhThuState());
  // }, [dispatchThunk]);

  useEffect(() => {
    setOrders(ordersState?.length);
    setUsers(usersState);
    setCountBill(countBillState ? countBillState : 0);
    setDoanhThu(doanhThuState ? doanhThuState : 0);
  }, [ordersState, usersState, countBillState, doanhThuState]);

  const statisticsData2 = [
    {
      title: `Số lượng đơn hàng đã bán trong ${filter}`,
      data: {
        complete: countBill,
        kpi: 30,
        percentage: usePercentage(countBill, 30),
      },
    },
    {
      title: `Khách hàng mới trong ${filter}`,
      data: {
        complete: users,
        kpi: 30,
        percentage: usePercentage(users, 30),
      },
    },
    {
      title: `Doanh thu trong ${filter}`,
      data: {
        complete: useCurrency(doanhthu),
        kpi: useCurrency(100000000),
        percentage: usePercentage(doanhthu, 100000000),
      },
    },
  ];

  return (
    <>
      <GridView className="gap-y-6" marginLeft="30px" wrap previews={3}>
        {statisticsData2.map((item) => (
          <StatisticsCardItem
            key={uuidv4()}
            title={item.title}
            complete={item.data.complete}
            kpi={item.data.kpi}
            percentage={item.data.percentage}
            marginLeft="30px"
          />
        ))}
      </GridView>
    </>
  );
};

export default StatisticsCard;
