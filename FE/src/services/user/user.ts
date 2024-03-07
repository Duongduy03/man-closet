import { OrderItem } from "@/interfaces/order.interface";
import axios from "axios";
import instance from "../instance";
import { GetAllUserRes, GetUserAddressRes } from "../responses/user.responses";
import { GetOrderHistoryResponse } from "@/interfaces/bill";

export const getAllUser = (page: number, limit: number) => {
  const response = instance.get<any, GetAllUserRes>(
    `/user?_page=${page}&_limit=${limit}`
  );
  return response;
};
export const getAllContact = (id: string) => {
  const response = instance.get<any, GetAllUserRes>(
    `/user/contacts/${id}`
  );
  return response;
};

export const getUserById = async (id: string) => {
  const response = await instance.get(`/user/${id}`);
  return response;
};

export const updateUserInfo = (
  id: string,
  data: { [key: string]: number | string | boolean }
) => {
  const response = instance.patch(`/user/${id}`, data);
  return response;
};

export const getUserAddress = (id: string) => {
  const response = instance.get<any, GetUserAddressRes>(`/user/${id}/address`);
  return response;
};

export const deleteUserAddress = (user_id: string, address_id: string) => {
  const response = instance.delete(`/user/${user_id}/address/${address_id}`);
  return response;
};

export const updateUserAddress = (
  user_id: string,
  address_id: string,
  data: { [key: string]: string | boolean }
) => {
  const response = instance.patch(
    `/user/${user_id}/address/${address_id}`,
    data
  );
  return response;
};

export const getUserOrderHistory = (
  user_id: String,
  page: number,
  limit: number,
  caseStatus: string,
  signal?: AbortSignal
) => {
  const response = axios.get<any, GetOrderHistoryResponse>(
    `http://localhost:8088/users/${user_id}/orders?page=${page}&limit=${limit}&case=${caseStatus}`,
    { signal: signal }
  );
  return response;
};

export const updateUserAvatar =  (userId:string | undefined,files:any) => {
  return axios.patch(`http://localhost:8088/user/${userId}/avatar`,files)
}
export const getAllUserDeleted = (page:number) => {
  const res = instance.get(`/user/moveToTrash/delete?page=${page}`);
  return res
}
export const restoreUser = (id:string | undefined) => {
  const res = instance.patch(`/user/restore/${id}`)
  return res
}
export const moveUserToTrash = (id:string | undefined) => {
  const res = instance.delete(`/user/remove/${id}`)
  return res
}

export const forgotPassword = (email:any) => {
  const res = instance.post("/user/forgotPassword",email);
  return res
}
export const resetPassword = (data:any) => {
  const res = instance.patch(`/user/resetpassword/${data.token}`,data);
  return res
}
