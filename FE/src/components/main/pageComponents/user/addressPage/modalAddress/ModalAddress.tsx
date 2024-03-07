"use client";

import { X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SelectAddress from "../selectAddress/SelectAddress";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getDistrictsState,
  getProvincesState,
  getWardsState,
} from "@/redux/reducer/address.reducer";
import { addNewAddressState } from "@/redux/reducer/user.reducer";
import { toast } from "react-toastify";
import { TAddress } from "@/services/address.services";
import { useAddress, useUserInfo } from "@/hooks";

interface Props {
  onClose: () => void;
}

const ModalAddress = ({ onClose }: Props) => {
  const { _id } = useUserInfo();
  const dispatchThunk = useAppDispatch();

  const detailRef = useRef("")

  const {
    districts,
    provinces,
    wards,
    district,
    province,
    ward,
    setDistrict,
    setProvince,
    setWard,
  } = useAddress();

  const handleAddNewAddress = () => {
    if (province === "" && district === "" && detailRef.current === "") {
      toast.error("Bắt buộc lựa chọn các trường");
      return;
    }

    const value = {
      city: provinces.find((item) => item.province_id === province)
        ?.province_name as string,
      district: districts.find((item) => item.district_id === district)
        ?.district_name as string,
      wards: wards.find((item) => item.ward_id === ward)?.ward_name as string,
      detailAddress: detailRef.current,
    };

    dispatchThunk(addNewAddressState({ user_id: _id, data: value }));
    toast.success("Thành công");
    onClose();
  };



  return (
    <>
      <div className="bg-white relative w-[500px] px-4 py-4 md:px-7 rounded">
        <button
          onClick={() => onClose()}
          className="absolute top-3 right-3 bg-zinc-200 p-1  rounded-full hover:bg-zinc-300 transition-all"
        >
          <X className="w-4 h-4 text-gray-800 font-medium" />
        </button>
        <h3 className="text-lg md:text-xl font-medium text-gray-800">
          Địa chỉ mới
        </h3>
        <div className="py-6">
          <SelectAddress
            value={province}
            label="Tỉnh/Thành phố"
            options={provinces}
            type_address="province"
            setValue={setProvince}
          />
          <SelectAddress
            value={district}
            label="Quận/Huyện"
            options={districts}
            type_address="district"
            setValue={setDistrict}
          />
          <SelectAddress
            value={ward}
            label="Xã/Phường"
            options={wards}
            type_address="ward"
            setValue={setWard}
          />

          <div className="flex flex-col justify-center pb-4">
            <label
              htmlFor="detail-address"
              className="pb-2 text-sm md:text-base text-gray-600 font-normal"
            >
              Địa chỉ chi tiết
            </label>
            <input
              onChange={(e) => detailRef.current = e.target.value}
              type="text"
              id="detail-address"
              className="px-3 py-2 rounded text-sm md:text-base text-gray-800 border border-zinc-400 focus:border-zinc-800 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center h-[40px]">
          <button
            onClick={() => onClose()}
            className="flex-[1] h-full bg-transparent hover:bg-zinc-100 rounded transition-all"
          >
            Huỷ
          </button>
          <button
            onClick={() => handleAddNewAddress()}
            className="flex-[1] h-full hover:bg-zinc-600 bg-zinc-800 rounded text-white text-sm md:text-md transition-all"
          >
            Lưu
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalAddress;
