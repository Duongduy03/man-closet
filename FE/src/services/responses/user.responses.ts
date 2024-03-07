import { User } from "@/interfaces/user.interface";
import { AxiosResponse } from "axios";
import { TAddress } from "../address.services";

export interface GetAllUserRes extends AxiosResponse {
  messages: string
  data: User[]
}


export type GetUserAddressRes = {
  message: string,
  results: TAddress[]
}