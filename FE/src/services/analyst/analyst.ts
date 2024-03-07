import instance from "../instance";
import { GetProductSoldRes } from "../responses/order.responses";

export const getProductSold = (filter: any) => {
  const response = instance.post<any>("/analyst/product", filter);
  return response;
};
export const Thongkedonhang = (filter: any) => {
  const response = instance.post<any>("/analyst/bill", filter);
  return response;
};
export const Thongkedoanhthu = (filter: any) => {
  const response = instance.post<any>("/analyst/doanhthu", filter);
  return response;
};
export const Thongketaikhoanmoi = (filter: any) => {
  const response = instance.post<any>("/analyst/user", filter);
  return response;
};
export const Top5UserMuaHang = (filter: any) => {
  const response = instance.post<any>("/analyst/top5User", filter);
  return response;
};
