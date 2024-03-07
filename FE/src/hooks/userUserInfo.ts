"use client"

import { TAddress } from "@/services/address.services";
import { useEffect, useState } from "react";

type TUserInfo = {
  _id: string;
  isBlocked: boolean;
  name: string;
  avatar:string,
  email: string;
  role: string;
  address: TAddress[];
  updatedAt: Date;
  wishlist:[],
  phone: string
};

const useUserInfo = () => {
  const [user, setUser] = useState({} as TUserInfo)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as string))
  }, [])

  return user;
};

export default useUserInfo;
