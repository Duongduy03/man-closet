"use client";
import React, { useCallback, useEffect, useState } from "react";
import OrderManagerHeader from "./subComponents/OrderManagerHeader";
import OrderManagerList from "./subComponents/OrderManagerList";
import { getOrdersAsync } from "@/redux/reducer/order.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import OrderManagerPaginate from "./subComponents/OrderManagerPaginate";

type TPaginate = {
  totalItem: number;
  itemPerPage: number;
  totalPage: number;
  currentPage: number;
};
const OrderManager = () => {
  const [page, setPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const orders = useAppSelector((state) => state.order.orders);
  const paginate = useAppSelector((state) => state.order.paginate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(
      getOrdersAsync({
        page: page,
        limit: 10,
        orderStatus: orderStatus,
        paymentStatus: paymentStatus,
      })
    );
    return () => {
      promise.abort()
    }
  }, [dispatch, page, orderStatus, paymentStatus]);

  const handleChangePage = useCallback((pageNum: number): void => {
    setPage(pageNum);
  }, []);

  const handleChangeOrderState = (state: string) => {
    setOrderStatus(state);
  };

  const handleChangePaymentState = (state: string) => {
    setPaymentStatus(state);
  };

  return (
    <>
      <div className="mt-4">
        <OrderManagerHeader
          selectOrderState={handleChangeOrderState}
          selectPaymentState={handleChangePaymentState}
        />
        <div className="pt-4">
          <OrderManagerList data={orders} />
          <OrderManagerPaginate
            data={paginate as TPaginate}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default OrderManager;
