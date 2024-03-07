"use client";

import ButtonsFunc from "@/components/main/pageComponents/user/ordersPage/productList/sub_components/ButtonsFunc";
import { parseNumberToCurrency } from "@/helper/convertCurrency";
import { customDate } from "@/helper/convertDate";
import { getBillByIdAsync } from "@/redux/reducer/order.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cloneDeep } from "lodash";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const OrderDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { order, isLoading, errorMessage } = useAppSelector(
    (state) => state.order
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getBillByIdAsync(id as string));
    return () => {
      promise.abort();
    };
  }, [dispatch, id]);

  if (errorMessage) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const orderHistoryArr = cloneDeep(order?.history_order_status);
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-gray-800 underline">
            Thông tin đơn hàng:
          </h5>
          <button
            className="flex items-center text-gray-800 hover:text-gray-500 transition-all"
            onClick={() => router.push("/user/orders")}
          >
            <ChevronLeft /> <span>Quay lại</span>
          </button>
        </div>
        <div className="pt-4 flex flex-col gap-4">
          <div>
            <p className="font-medium text-gray-500">Mã số đơn hàng</p>
            <p>{order?._id}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500 pb-1">Sản phẩm đặt mua</p>
            <ul className="flex flex-col gap-3">
              {order?.items?.map((item) => {
                return (
                  <li key={uuidv4()} className="flex items-center">
                    <figure className="relative w-[60px] h-[60px] rounded overflow-hidden">
                      <Image
                        src={item?.property?.imageUrl}
                        alt={item?.product_name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </figure>
                    <div className="pl-2 flex flex-col">
                      <p className="flex-[1]">{item?.product_name}</p>
                      <p>
                        Phân loại: {item?.property?.size},{" "}
                        {item?.property?.color}
                      </p>
                      <p>Số lượng: {item?.property?.quantity}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-500">Ship tới</p>
            <p>{order?.shipping_address}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Thanh toán</p>
            <div>
              <p>Tổng: {parseNumberToCurrency(order?.total_price)}</p>
              <p>Phương thức: {order?.payment_method}</p>
              <p>Trạng thái: {order?.payment_status?.status}</p>
              <p>
                Thời gian:{" "}
                {customDate(order?.payment_status?.updatedAt.toString())}
              </p>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-500">Lịch sử vận chuyển</p>
            <ul className="flex flex-col gap-3">
              {orderHistoryArr?.reverse()?.map((item, index) => {
                return (
                  <li key={uuidv4()}>
                    <div className="flex items-start gap-3">
                      <p className="text-green-500">
                        {index === 0 ? "Hiện tại" : ""}
                      </p>
                      <div>
                        <p>Tình trạng: {item?.status}</p>
                        <p>
                          Thời gian: {customDate(item?.updatedAt.toString())}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <ButtonsFunc
            orderStatus={order.current_order_status?.status}
            data={{
              billId: order?._id,
              payment_status: order?.payment_status?.status,
              payment_method: order?.payment_method
            }}
          />
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;

export const Loading = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="w-[50vw] h-[30px] bg-zinc-100 rounded-lg"></div>
        <div className="w-[20vw] h-[30px] bg-zinc-100 rounded-lg"></div>
        <div className="w-[100vw] h-[70vh] bg-zinc-100 rounded-lg"></div>
      </div>
    </>
  );
};

export const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-[60vh] gird flex items-center justify-center">
        <article className="flex flex-col gap-3">
          <div>
            <h4 className="text-rose-500 pr-1">
              Opps! <span className="text-gray-800">Có lỗi xảy ra</span>
            </h4>
          </div>
          <button
            className="border text-gray-500 bg-white cursor-pointer px-2 py-1 rounded"
            onClick={() => router.push("/user/orders")}
          >
            Quay lại
          </button>
        </article>
      </div>
    </>
  );
};
