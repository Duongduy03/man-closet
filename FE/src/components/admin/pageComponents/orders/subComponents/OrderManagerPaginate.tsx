import Pagination from "@/components/pagination/Pagination";
import React from "react";

type Props = {
  data: {
    totalItem: number;
    itemPerPage: number;
    totalPage: number;
    currentPage: number;
  };
  onChangePage: (page: number) => void;
};
const OrderManagerPaginate = ({ data, onChangePage }: Props) => {
  return (
    <Pagination
      currentPage={data.currentPage}
      totalPages={data.totalPage}
      totalItems={data.totalItem}
      limit={10}
      onPageChange={onChangePage}
    />
  );
};

export default OrderManagerPaginate;
