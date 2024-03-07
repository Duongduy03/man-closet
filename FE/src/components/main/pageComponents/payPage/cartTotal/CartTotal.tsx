
"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import instance from "@/services/instance";
import { useRouter } from "next/navigation";

const CartTotal = () => {
  // function payment() {
  //   const res = instance.post('/create_payment_url')
  //   return res
  // }
  const router = useRouter();
  const payment = async () => {
    const body = {
      user_id: "65314ba0d0253dbb606a1c4e",
      shipping_address: "HA NOi",
      payment_method: "vnpay",
      items: [
        {
          product_id: "6530d9f81dfde459a5fd287a",
          price: 20000,
          property: {
            quantity: 2,
            color: "vàng",
            size: "M",
          },
          sub_total: 40000,
        },
      ],
      total_price: 40000,
    };
    const data = {
      ...body,
      bankCode: "",
      language: "vn",
    };
    try {
      let response;
      if (body.payment_method === "shipcode") {
        response = await instance.post("cart", body);
      } else if (body.payment_method === "vnpay") {
        response = await instance.post("order/create_payment_url", data);
        if (response.status === 200) {
          router.push(response.data);
        }
        // console.log("test", response);
      }
      console.log(response);
    } catch (error) {
      console.error("Error", error);

      throw error;
    }
  };

  return (
    <div className="flex flex-col w-full  h-fit gap-4 p-4 mt-[30px]">
      <p className="text-blue-900 text-xl font-extrabold">Caculate Shopping</p>
      <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
        <div className="flex flex-row justify-between">
          <p className="text-gray-600">Subtotal </p>
          <p className="text-end font-bold">$99.98</p>
        </div>

        <hr className="bg-gray-200 h-0.5" />
        <div className="flex flex-row justify-between">
          <p className="text-gray-600">Total</p>
          <div>
            <p className="text-end font-bold">$103.88</p>
          </div>
        </div>
        <hr className="bg-gray-200 h-0.5" />
        <div className="flex items-center mb-4">
          <input type="checkbox" />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Shipping & taxes calculated at checkout
          </label>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              payment();
            }}
            variant={"primary"}
            className="transition-colors text-sm p-2 rounded-sm w-full text-white text-hover shadow-md"
          >
            Processd To Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
