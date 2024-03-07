import { Package, TruckIcon } from "lucide-react";
import React from "react";
import UserAddressInfo from "./userAddressComponents/userAddressInfo/UserAddressInfo";

const UserAddress = () => {
  return (
    <>
      <h5 className="text-gray-800 font-semibold pb-2">Địa chỉ nhận hàng</h5>
      <div>
        <div className="flex gap-2 flex-col">
          <div className="flex item-center gap-2">
            <TruckIcon className="w-6 h-6" />
            <Package className="w-6 h-6" />
          </div>
          <div >
            <UserAddressInfo/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAddress;
