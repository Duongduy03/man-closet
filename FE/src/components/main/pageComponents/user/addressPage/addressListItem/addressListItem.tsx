import { deleteAddressState } from "@/redux/reducer/user.reducer";
import { useAppDispatch } from "@/redux/store";
import { TAddress } from "@/services/address.services";
import React from "react";

type Data = TAddress & {
  username: string;
  user_id: string;
};

type Props = {
  data: Data;
  onDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onSetDefault: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAddressId: React.Dispatch<React.SetStateAction<string>>;
};

const AddressListItem = ({
  data,
  onDelete,
  onSetDefault,
  setSelectedAddressId
}: Props) => {
  const {
    _id,
    isDefault,
    city,
    district,
    wards,
    detailAddress,
    username,
    user_id,
  } = data;
  const item = {
    _id,
    isDefault,
    city,
    district,
    wards,
    detailAddress,
  };

  return (
    <>
      <li>
        <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
          <div className="flex flex-col gap-1 flex-[1] sm:flex-[3] w-full">
            <div className="flex items-center gap-2">
              <h4 className="text-gray-800 font-medium text-md sm:text-lg">
                {username}
              </h4>
              <div className="w-[1px] h-[24px] bg-gray-400"></div>
              <h5 className="text-sm sm:text-base text-gray-600">
                (+84) 123456789
              </h5>
            </div>
            <div>
              <h5 className="text-sm sm:text-base text-gray-600">
                {detailAddress}
              </h5>
            </div>
            <div>
              <h5 className="text-sm sm:text-base text-gray-600">
                {wards ? `${wards},` : ""}
                {district ? `${district},` : ""}
                {city ? `${city}` : ""}
              </h5>
            </div>
            {isDefault && <div className="pt-1">
              <span className="text-sm md:text-md border border-[--secondary-color] rounded text-[--secondary-color] py-1 px-2">
                Mặc định
              </span>
            </div>}
          </div>

          <div className="flex flex-row sm:flex-col pt-4 sm:pt-0 flex-[1] w-full items-center justify-center sm:justify-start sm:items-end gap-4 sm:gap-2">
            <button
              onClick={() => {
                onDelete(true);
                setSelectedAddressId(_id as string)
              }}
              className="w-full flex-[1] text-rose-500 hover:text-rose-300 focus:outline-none text-sm sm:text-base transition-all"
            >
              Xoá
            </button>
            <button
              onClick={() => {
                onSetDefault(true);
                setSelectedAddressId(_id as string)
              }}
              className="border w-full flex-[3] sm:flex-[1] rounded disable:text-gray-500 disable:border-gray-500 px-2 py-1 text-gray-800 border-gray-800 text-sm md:text-base  transition-all"
            >
              Thiết lập mặc định
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default AddressListItem;
