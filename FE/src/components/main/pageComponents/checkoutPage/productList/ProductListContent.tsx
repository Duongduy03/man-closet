"use client";

import { useHash, useLocalStorage } from "@/hooks";
import { ICheckoutProduct, ProductInCart } from "@/interfaces/product";
import React, { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import {v4 as uuidv4} from "uuid"
import style from "./productListItem.module.scss";

type TCheckoutData = {
  products : ICheckoutProduct[],
  total: string
}

const ProductListContent = () => {
  const { getItemAndSetValue } = useLocalStorage("checkoutData");
  const {decodeObjectBase64} = useHash()

  const [state, setState] = useState<TCheckoutData>({} as TCheckoutData)

  useEffect(() => {
    const item = decodeObjectBase64(getItemAndSetValue())
    setState(item)
  }, []);

  function isEmpty(obj: {[key:string]: unknown}) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
  }

  const isDataEmpty = isEmpty(state)

  console.log(state)

  if(isDataEmpty){
    return (
      <>
        <h5>Không có sản phẩm nào</h5>
      </>
    )
  }

  return (
    <>
      <ul className={style.product_list}>
        {state.products?.map(item => (
          <ProductListItem key={uuidv4()} data={item}/>
        )) }
      </ul>
    </>
  );
};

export default ProductListContent;
