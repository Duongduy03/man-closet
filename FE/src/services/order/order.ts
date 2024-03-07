import { IBill } from "@/interfaces/bill";
import instance from "../instance";
import {
  GetAllOrderBillRes,
  GetProductSoldRes,
} from "../responses/order.responses";
import { OrderItem } from "@/interfaces/order.interface";

export const getBillByUser = (id_user: string, page: number) => {
  // console.log(id_user);
  const response = instance.get<IBill>(`/order/user/${id_user}?_page=${page}`);
  return response;
};

export const getAllOrderBill = (page: number, limit: number) => {
  const response = instance.get<any, GetAllOrderBillRes>(
    `/order?_page=${page}&_limit=${limit}`
  );
  return response;
};

export const exportBillById = (billId: string | undefined) => {
  const response = instance.get<any>(`/order/export/${billId}`);
  return response;
};

type TGetBillById = {
  message: string;
  data: IBill;
};
export const getBillById = (bill_id: string, signal?: AbortSignal) => {
  const response = instance.get<any, TGetBillById>(
    `/order/orderId/${bill_id}`,
    {
      signal: signal,
    }
  );

  return response;
};

type UpdateBillResponse = {
  message: string;
  data: IBill;
};
export const updateBill = (
  billId: string,
  orderStatus: string,
  paymentStatus: string
) => {
  const response = instance.patch<any, UpdateBillResponse>(`/order/${billId}`, {
    orderStatus: orderStatus,
    paymentStatus: paymentStatus,
  });
  return response;
};

export const getProductSold = () => {
  const response = instance.get<any, GetProductSoldRes>("/analyst/product");
  return response;
};

type TGetOrders = {
  message: string;
  result: {
    items: IBill[];
    totalItem: number;
    itemPerPage: number;
    totalPage: number;
    currentPage: number;
  };
};
export const getOrders = (
  page: number = 1,
  limit: number = 10,
  orderStatus: string = "",
  paymentState: string = "",
  signal: AbortSignal
) => {
  const response = instance.get<any, TGetOrders>(
    `/orders?page=${page}&&limit=${limit}&&orderStatus=${orderStatus}&&paymentStatus=${paymentState}`,
    {
      signal: signal,
    }
  );
  return response;
};
