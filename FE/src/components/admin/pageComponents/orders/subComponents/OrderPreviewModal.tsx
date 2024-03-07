"use client";

import { parseNumberToCurrency } from "@/helper/convertCurrency";
import { customDate } from "@/helper/convertDate";
import { IBill, ORDER_STATUS } from "@/interfaces/bill";
import { changeStatusBillState } from "@/redux/reducer/order.reducer";
import { useAppDispatch } from "@/redux/store";
import { X } from "lucide-react";
import Image from "next/image";
import React , {useMemo, useRef} from "react";
import { v4 as uuidv4 } from "uuid";
import { io, Socket } from "socket.io-client";

type Props = {
  order: IBill;
  onClose: () => void;
};
const OrderPreviewModal = ({ order, onClose }: Props) => {
  const socket = io("http://localhost:8088")
  const { _id, payment_method, current_order_status, payment_status } = order;
  const dispatch = useAppDispatch();
  const handleChangeBillStatus = (orderS: string, paymentS: string) => {
    dispatch(
      changeStatusBillState({
        billId: order?._id,
        orderStatus: orderS,
        paymentStatus: paymentS || order?.payment_status?.status,
      })
    );

    socket.emit('updateOrderStatus', { orderId: order?._id, newStatus: orderS });
    onClose()
  };

  type TNextCase = {
    caseStatus: string;
    label: string;
  };

  const typeNextCase = useMemo(() => {
    switch (order?.current_order_status?.status) {
      case ORDER_STATUS.PENDING:
        return {
          caseStatus: ORDER_STATUS.CONFIRM,
          label: "Xác nhận đơn",
        };
      case ORDER_STATUS.CONFIRM:
        return {
          caseStatus: ORDER_STATUS.DELIVERY,
          label: "Đã giao cho vận chuyển",
        };
      case ORDER_STATUS.DELIVERY:
        return {
          caseStatus: ORDER_STATUS.DELIVERED,
          label: "Đã giao tới khách hàng",
        };
      case ORDER_STATUS.EXCHANGE:
        return {
          caseStatus: ORDER_STATUS.CONFIRM,
          label: "Xác nhận đổi hàng",
        };
    }
  }, [order?.current_order_status?.status]) as TNextCase;

  return (
    <>
      <div className="w-[500px] rounded p-3 bg-white">
        <div className="flex items-center justify-between pb-2">
          <h5 className="font-medium text-gray-800 underline">
            Thông tin đơn hàng:
          </h5>
          <button
            className="flex items-center text-gray-800 hover:text-gray-500 transition-all"
            onClick={() => onClose()}
          >
            <X />
          </button>
        </div>
        <div className="pt-4 flex flex-col gap-4 h-[60vh] max-h-[70vh] overflow-y-scroll">
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
              {order?.history_order_status
                ?.slice()
                ?.reverse()
                ?.map((item, index) => {
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

        <div className="pt-2 text-right">
          <button 
            className="py-2 px-3 text-white bg-zinc-800 hover:bg-zinc-600 cursor-pointer transition-all rounded" 
            onClick={() => handleChangeBillStatus(typeNextCase.caseStatus, "")}
          >
            {typeNextCase?.label}
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderPreviewModal;
