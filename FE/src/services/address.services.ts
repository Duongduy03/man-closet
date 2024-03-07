import axios, { AxiosResponse } from "axios";
import instance from "./instance";

// province ===================================
export type TProvince = {
  province_id: string;
  province_name: string;
  province_type: string;
};

interface GetProvincesRes extends AxiosResponse {
  results: TProvince[];
}

export const getProvinces = async () => {
  const response = await axios.get<any, GetProvincesRes>(
    "https://vapi.vnappmob.com/api/province"
  );
  return response.data;
};

// district ===================================
export type TDistrict = {
  district_id: string;
  district_name: string;
  district_type: string;
  lat?: null;
  lng?: null;
  province_id?: string;
};

interface GetDistrictByProvinceIdRes extends AxiosResponse {
  results: TDistrict[];
}

export const getDistrictByProvinceId = async(id:string) => {
  const response = await axios.get<any, GetDistrictByProvinceIdRes>(
    `https://vapi.vnappmob.com/api/province/district/${id}`
  );
  return response.data;
}

// ward ===================================
export type TWard = {
  ward_id: string;
  ward_name: string;
  ward_type: string;
  district_id?: string;
};

interface GetWardByDistrictIdRes extends AxiosResponse {
  results: TWard[];
}

export const getWardByDistrictId = async(id:string) => {
  const response = await axios.get<any, GetWardByDistrictIdRes>(
    `https://vapi.vnappmob.com/api/province/ward/${id}`
  );
  return response.data;
}

// add new ======================
type DataAddNewAddress = {
  city : string,
  district: string,
  wards: string,
  detailAddress: string,
}

export type TAddress = {
  _id?: string,
  isDefault?: boolean,
  city: string,
  district: string,
  wards: string,
  detailAddress: string
}

type AddNewAddressRes = {
  message: string,
  data: {
    city: string, 
    district: string,
    wards: string,
    detailAddress:string
  }
}

export const addNewAddress = async(user_id:string, data:DataAddNewAddress) => {
  const response = await instance.put<any, AddNewAddressRes>(`/addNewAddress/${user_id}`, data)
  return response
}