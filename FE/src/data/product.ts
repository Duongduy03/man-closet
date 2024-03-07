"use client";

import { getAll } from "@/services/products/products";
import { useEffect, useState } from "react";

export const listProduct = () => {
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    getAll(0).then(({ data }: any) => setProduct(data));
  }, []);

  return product;
  //   console.log(product);
};
