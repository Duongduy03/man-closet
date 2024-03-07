import { IBill } from "@/interfaces/bill";
import { ProductSold } from "@/interfaces/product";
import { AxiosResponse } from "axios";

export interface GetProductSoldRes extends AxiosResponse {
  message: string;
  data: ProductSold[];
}

export interface GetAllOrderBillRes extends AxiosResponse {
  message: string;
  data: IBill[];
  paginate: {
    currentPage: number,
    totalPages: number,
    totalItems: number,
    limit: number
  },
}
