"use client";

import { Button } from "@/components/ui/button";
import { useHash, useLocalStorage } from "@/hooks";
import { ProductInCart } from "@/interfaces/product";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const ControlBar_SC = ({
  totalBillPrice,
  productsSelected,
}: {
  totalBillPrice: string;
  productsSelected: ProductInCart[];
}) => {
  const router = useRouter();
  const {setItem} = useLocalStorage("checkoutData")
  const {encodeObjectBase64} = useHash()

  const productWillThrough = useMemo(() => {
      return productsSelected.map((product) => {
        return {
          product_id: product._id,
          price: product.price,
          product_name: product.name,
          property: {
            quantity: product.quantity,
            color: product.color,
            size: product.size,
            imageUrl: product.imageUrl,
          },
          sub_total: product.totalPrice,
        }
      })
  }, [productsSelected])

  const goToCheckout = () => {
    if(productsSelected.length === 0 ){
      return  
    }

    const data = {
      products: productWillThrough,
      total: totalBillPrice
    }

    const encoded = encodeObjectBase64(data)

    setItem(encoded)
    router.push("/payment/checkout")
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="flex item-center gap-2">
          <span>Tổng ({productsSelected.length}):</span>
          <span className="text-[--secondary-color] font-medium">
            {totalBillPrice}
          </span>
        </p>
        <Button 
          onClick={() => goToCheckout()}
          variant={"primary"} className="">
          Mua hàng
        </Button>
      </div>
    </>
  );
};

export default ControlBar_SC;
