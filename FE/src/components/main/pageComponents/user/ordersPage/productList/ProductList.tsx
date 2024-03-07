import React from "react";
import ProductListItem from "./ProductListItem";
import { v4 as uuidv4 } from "uuid";
import style from "./productList.module.scss";
import { LineSkeleton } from "@/components/skeletons";
import { IBill } from "@/interfaces/bill";

type Props = {
  data: IBill[];
  isLoading: boolean;
};

const ProductList = ({ data, isLoading }: Props) => {
  return (
    <>
      {isLoading && <LineSkeleton />}
      {!isLoading && (
        <ul className={style.product_list}>
          {data?.slice()?.reverse()?.map((item) => <ProductListItem data={item} key={uuidv4()} />)}
        </ul>
      )}
    </>
  );
};

export default ProductList;
