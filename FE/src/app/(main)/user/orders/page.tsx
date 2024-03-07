"use client";

import { ProductList } from "@/components/main/pageComponents/user/ordersPage";
import Tabline from "@/components/main/pageComponents/user/ordersPage/tabline/Tabline";
import { useUserInfo } from "@/hooks";
import { getUserOrdersHistory } from "@/redux/reducer/user.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {io} from 'socket.io-client'

const OrdersPage = () => {
  const socket = io("http://localhost:8088")
  const { _id } = useUserInfo();
  const { userOrdersHistory, isLoading, errorsMessage } = useAppSelector(
    (state) => state.user
  );

  const [page, setPage] = useState(1);
  const limitRef = useRef<number>(5);
  const [caseStatus, setCaseStatus] = useState("")

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise =  dispatch(
      getUserOrdersHistory({
        user_id: _id,
        page: page,
        limit: limitRef.current,
        caseStatus: caseStatus
      })
    );

    return () => {
      promise.abort()
    }
  }, [dispatch, _id, page, limitRef, caseStatus]);

  const changeCase = useCallback((value: string) => {
    setCaseStatus(value)
  }, [])

  socket.on('orderStatusUpdated', (data) => {
    console.log('Order status updated on the client side:', data);
    setCaseStatus(data?.newStatus)
  });


  return (
    <>
      <section>
        <Tabline changeCase={changeCase}/>
        <div className="pt-5">
          <h5 className="pb-2 font-medium text-gray-800">Đơn hàng:</h5>
          <ProductList data={userOrdersHistory?.items} isLoading={isLoading}/>
        </div>
      </section>
    </>
  );
};

export default OrdersPage;