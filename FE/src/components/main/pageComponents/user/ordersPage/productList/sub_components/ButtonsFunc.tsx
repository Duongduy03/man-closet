import { ORDER_STATUS, PAYMENT_STATUS } from "@/interfaces/bill";
import { changeStatusBillState } from "@/redux/reducer/order.reducer";
import { useAppDispatch } from "@/redux/store";
import { useMemo } from "react";

type ButtonsFucProps = {
  orderStatus: string;
  data: {
    billId: string;
    payment_status: string;
    payment_method: string;
  };
};
type TNextCase = {
  caseStatus: string;
  label: string;
};
const ButtonsFunc = ({ orderStatus, data }: ButtonsFucProps) => {
  const dispatch = useAppDispatch();
  const { billId, payment_status, payment_method } = data;

  const typeNextCase = useMemo(() => {
    switch (orderStatus) {
      case ORDER_STATUS.PENDING:
        return {
          caseStatus: ORDER_STATUS.CANCEL,
          label: "Huỷ đơn",
        };
      case ORDER_STATUS.DELIVERED:
        return {
          caseStatus: ORDER_STATUS.RECEIVER,
          label: "Đã nhận hàng"
        };
      case ORDER_STATUS.RECEIVER:
        return {
          caseStatus: ORDER_STATUS.EXCHANGE,
          label: "Đổi hàng"
        };
    }
  }, [orderStatus]) as TNextCase;

  const handleChangeBillStatus = (orderS: string, paymentS: string) => {
    dispatch(
      changeStatusBillState({
        billId,
        orderStatus: orderS,
        paymentStatus: paymentS || payment_status,
      })
    );
  };
  return (
    <>
      <div className=" pt-2 flex w-full md:w-fit h-[50px] gap-1 sm:gap-2 sm:ml-auto">
        {/* payment btn */}
        {payment_status === PAYMENT_STATUS.UNPAID &&
          orderStatus === ORDER_STATUS.PENDING &&
          payment_method === "vnpay" && (
            <button
              onClick={() => handleChangeBillStatus("", PAYMENT_STATUS.PAID)}
              className="flex-[1] sm:w-[180px] text-gray-800 hover:text-gray600-500 transition-all border rounded border-gray-800 hover:border-rose-500"
            >
              <p>Thanh toán</p>
            </button>
          )}

        {/* primary */}
        {typeNextCase && (
          <button
            onClick={() =>
              handleChangeBillStatus(typeNextCase.caseStatus, payment_status)
            }
            className="flex-[1] sm:w-[180px] bg-zinc-800 text-white hover:bg-zinc-600 rounded transition-all"
          >
            <p>{typeNextCase?.label}</p>
          </button>
        )}
      </div>
    </>
  );
};

export default ButtonsFunc;
