"use client"

import {
  getDistrictsState,
  getProvincesState,
  getWardsState,
} from "@/redux/reducer/address.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";

type Params = {
  province: string;
  district: string;
  ward: string;
};

const useAddress = () => {
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [ward, setWard] = useState("")

  const { provinces, districts, wards } = useAppSelector(
    (state) => state.address
  );

  const dispatch = useAppDispatch();

  const getProvinces = useCallback(() => {
    dispatch(getProvincesState())
  }, [dispatch])

  const getDistricts = useCallback(() => {
    if(province) dispatch(getDistrictsState(province))
  }, [dispatch,province])

  const getWards = useCallback(() => {
    if(district) dispatch(getWardsState(district))
  }, [dispatch, district])

  useEffect(() => {
    getProvinces()
    getDistricts()
    getWards()
  }, [getProvinces, getDistricts, getWards])

  return {
    provinces,
    districts,
    wards,
    setDistrict,
    setProvince,
    setWard,
    province,
    ward,
    district
  };
};

export default useAddress;
