"use client"

import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks";
import { getAddressByUserIdState, updateUserAddressState } from "@/redux/reducer/user.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TAddress } from "@/services/address.services";
import { ArrowLeft, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


const ListItem = ({
  address,
  onClose,
}: {
  address: TAddress;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch()
  const {_id: user_id} = useUserInfo()
  const handleSelect = () => {
    dispatch(updateUserAddressState({
      user_id: user_id,
      address_id: address?._id as string,
      data: {
        isDefault: true
      }
    }))
    onClose()
  };

  return (
    <li
      onClick={() => handleSelect()}
      className="flex items-center gap-3 p-2 bg-transparent hover:bg-zinc-800 text-gray-800 group hover:text-white cursor-pointer transition-all rounded border-b"
    >
      <label
        className={
          "flex items-center justify-center w-[16px] h-[16px] bg-transparent rounded-full border " +
          `${
            address.isDefault === true
              ? "border-[--secondary-color]"
              : "border-zinc-300"
          }`
        }
      >
        <span
          className={
            "block w-[8px] h-[8px] rounded-full " +
            `${
              address.isDefault === true
                ? "bg-[--secondary-color]"
                : "bg-zinc-300"
            }`
          }
        ></span>
      </label>
      <p className="flex-[1] text-gray-800 group-hover:text-white transition-colors">
        {address?.detailAddress ? `${address?.detailAddress}, ` : ""}
        {address?.wards ? `${address.wards}, ` : ""}
        {address?.district ? `${address.district}, ` : ""}
        {address?.city ? `${address.city}` : ""}
      </p>
    </li>
  );
};

type Props = {
  onClose: () => void;
};

const SwitchModal = ({
  onClose,
}: Props) => {
  const { _id } = useUserInfo();
  const userAddressList = useAppSelector((state) => state.user.address);


  const dispatchThunk = useAppDispatch();

  useEffect(() => {
    dispatchThunk(getAddressByUserIdState(_id));
  }, [dispatchThunk, _id]);
  return (
    <>
      <div className="bg-white w-[500px] p-6 rounded">
        <div className="flex items-center justify-between pb-3 gap-2">
          <h4>Danh sách địa chỉ</h4>
          <Button variant={"primary"}>
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline-block">Tạo mới</span>
          </Button>
        </div>

        <div className="bg-zinc-100 rounded">
          <ul className="min-h-[300px] overflow-y-auto p-2">
            {userAddressList.map((item) => (
              <ListItem
                address={item}
                key={uuidv4()}
                onClose={onClose}
              />
            ))}
          </ul>
        </div>

        <div className="pt-6">
          <button onClick={() => onClose()} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5"/>
            <span>Quay lại</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SwitchModal;
