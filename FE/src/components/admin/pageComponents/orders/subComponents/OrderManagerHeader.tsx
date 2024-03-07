import { ORDER_STATUS, PAYMENT_STATUS } from "@/interfaces/bill";
import { Search } from "lucide-react";
import React, { useMemo } from "react";

type Props = {
  selectOrderState: (state: string) => void;
  selectPaymentState: (state: string) => void;
};
const OrderManagerHeader = ({
  selectOrderState,
  selectPaymentState,
}: Props) => {
  const orderData = useMemo(
    () => [
      ORDER_STATUS.PENDING,
      ORDER_STATUS.CONFIRM,
      ORDER_STATUS.DELIVERY,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.RECEIVER,
      ORDER_STATUS.CANCEL,
      ORDER_STATUS.EXCHANGE,
    ],
    []
  );

  const paymentData = useMemo(
    () => [PAYMENT_STATUS.UNPAID, PAYMENT_STATUS.PAID],
    []
  );
  return (
    <>
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <div className="bg-white flex items-center w-full px-3 py-2 rounded sm:flex-[1]">
          <p className="flex-[1]">TT thanh toán:</p>
          <select
            onChange={(e) => selectPaymentState(e.target.value)}
            name=""
            id=""
            className="w-full focus:outline-none bg-transparent px-2 flex-[2]"
          >
            {paymentData.map((item, index) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="bg-white flex items-center w-full px-3 py-2 rounded sm:flex-[1]">
          <p className="flex-[1]">TT đơn hàng:</p>
          <select
            onChange={(e) => selectOrderState(e.target.value)}
            name=""
            id=""
            className="w-full focus:outline-none bg-transparent px-2 flex-[2]"
          >
            {orderData.map((item, index) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default OrderManagerHeader;
