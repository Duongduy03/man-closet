"use client";

import { Button } from "@/components/ui/button";
import {
  parseCurrencyToNumber,
  parseNumberToCurrency,
} from "@/helper/convertCurrency";
import { useHash, useLocalStorage, useUserInfo } from "@/hooks";
import { ProductInCart } from "@/interfaces/product";
import { deleteProductInCartAsync } from "@/redux/reducer/cart.reducer";
import { getAddressByUserIdState } from "@/redux/reducer/user.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteProductInCart } from "@/services/cart.services";
import instance from "@/services/instance";
import { CircleDollarSign, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type TCheckoutData = {
  products: ProductInCart[];
  total: string;
};

const CheckoutInfo = () => {
  const router = useRouter();
  const { getItemAndSetValue } = useLocalStorage("checkoutData");
  const { decodeObjectBase64 } = useHash();
  const userAddressList = useAppSelector((state) => state.user.address);

  const selectAddress = useMemo(() => userAddressList.find(item => item.isDefault === true), [userAddressList])
  const user = useUserInfo()
  const [state, setState] = useState<TCheckoutData>({} as TCheckoutData);
  const shipCode = 30000;
  const [totalBill, setTotalBill] = useState(0);
  const {_id} = useUserInfo()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAddressByUserIdState(_id))
  }, [dispatch, _id])

  useEffect(() => {
    const item = decodeObjectBase64(getItemAndSetValue());
    setState(item);
  }, []);

  useEffect(() => {
    setTotalBill(shipCode + parseCurrencyToNumber(state.total));
  }, [state.total, shipCode]);

  function isEmpty(obj: { [key: string]: unknown }) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }
  const isDataEmpty = isEmpty(state);

  // payment =========================
  const payment = async () => {
    if(user){
      if(!user.phone){
        toast.error("Vui lòng thêm số điện thoại mua hàng")
        return
      }
      if(!user.address){
        toast.error("Vui lòng thêm địa chỉ mua hàng")
        return
      }
    }
    if (localStorage.getItem("user")) {
      const body = {
        shipping_address: `${selectAddress?.detailAddress}, ${selectAddress?.wards}, ${selectAddress?.district}, ${selectAddress?.city}`,
        payment_method: "vnpay",
        items: state.products,
        total_price: totalBill,
      };
      const data = {
        ...body,
        bankCode: "",
        language: "vn",
      };
      try {
        let response: any;
        if (body.payment_method === "vnpay") {
          response = await instance.post("order/create_payment_url", data);
          dispatch(deleteProductInCartAsync({user_id: _id, data: data.items}))
          dispatch(deleteProductInCartAsync({
            user_id: _id,
            data: data.items
          }))
          router.push(response);
        }
      } catch (error) {
        console.error("Error", error);

        throw error;
      }
    }
  };

  if (isDataEmpty) {
    return (
      <>
        <p></p>
      </>
    );
  }

  return (
    <>
      <div className="bg-zinc-50 rounded w-full h-full flex-col flex">
        <div className="flex-[1] w-full p-4">
          <div className="flex items-center justify-between pb-4">
            <p className="flex items-center gap-1">
              <CircleDollarSign className="w-5 h-5 text-yellow-500" />
              <span>Phương thức thanh toán</span>
            </p>
            <p>Online</p>
          </div>
          <div className="">
            <p className="flex items-center gap-1 pb-2">
              <ScrollText className="w-5 h-5 text-yellow-500" />
              <span>Chi tiết thanh toán</span>
            </p>
            <ul className="text-gray-500">
              <li className="flex items-center justify-between">
                <p>Tổng tiền hàng</p>
                <p>{state.total}</p>
              </li>
              <li className="flex items-center justify-between">
                <p>Phí vận chuyển</p>
                <p>{parseNumberToCurrency(shipCode)}</p>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <p className="">Tổng thanh toán</p>
            <p className="font-medium text-[--secondary-color]">
              {parseNumberToCurrency(totalBill)}
            </p>
          </div>
        </div>
        <Button
          variant={"primary"}
          onClick={() => payment()}
          className="w-full mt-auto"
      >
          Thanh toán
        </Button>
      </div>
    </>
  );
};

export default CheckoutInfo;
