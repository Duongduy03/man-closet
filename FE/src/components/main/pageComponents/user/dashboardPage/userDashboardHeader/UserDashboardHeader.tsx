"use client"

import { useUserInfo } from "@/hooks";
import Image from "next/image";
import React from "react";

const UserDashboardHeader = () => {
  const {name, avatar} = useUserInfo()
  return (
    <>
      <div className="p-7 md:p-10 bg-zinc-800 rounded-md text-white relative">
        <div className="flex items-center justify-between ">
          <div>
            <h3 className="text-white font-medium pb-2 md:pb-3">
              Xin chào, {name}
            </h3>
            <p className="max-w-[250px] md:max-w-[400px]">
              Sẵn sàng thoả sức mua sắm với chúng tôi
            </p>
          </div>
          <div className="md:relative md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-full border-2 border-white overflow-hidden absolute bottom-0 right-4 translate-y-[30%] md:bottom-[unset] md:right-[unset] md:translate-y-[unset] z-[25]">
            <Image
              src={
                avatar
              }
              alt="avatar"
              width={500}
              height={500}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardHeader;
