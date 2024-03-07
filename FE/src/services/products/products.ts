import { IProduct } from "@/interfaces/product";
import instance from "../instance";
import {
  GetAllProductResponse,
  GetProductResponse,
} from "../responses/product.responses";

export const getById = (id: string) => {
  const res = instance.get<any, GetProductResponse>(`api/products/${id}`);
  return res;
};
export const getProductDeletedById = (id: string) => {
  const res = instance.get<any, GetProductResponse>(
    `api/products/moveToTrash/delete/${id}`
  );
  return res;
};

export const getProductById = (product_id: string) => {
  const response = instance.get<any, GetProductResponse>(
    `api/products/${product_id}`
  );
  return response;
};

type TGetProductByCateIdRes = {
  message: string;
  result: {
    items: IProduct[];
    totalItem: number;
    itemPerPage: number;
    totalPage: number;
    currentPage: number;
  };
};
// export const getProductByCategoryId = (
//   page: number = 1,
//   id: string,
//   sort: string,
//   order: string
// ): Promise<TGetProductByCateIdRes> => {
//   const response = instance.get<any, TGetProductByCateIdRes>(
//     `api/products/cate/filter?categoryId=${id}&&page=${page}&&sort=${sort}&&order=${order}`
//   );
//   return response;
// };
export const getProductByCategoryId = (page=1,id: string,sort:string,order:string) => {
  
  const response = instance.get(`api/products/cate/${id}?_page=${page}&_sort=${sort}&_order=${order}`);
  return response
}

export const getAll = (page = 1) => {
  const res = instance.get(`api/products?_page=${page}`);
  return res;
};

export const getAllProduct = () => {
  const response = instance.get<any, GetAllProductResponse>(`api/products`);
  return response;
};

export const filterProduct = (page = 1, sort: string, order: string) => {
  const res = instance.get<any, GetAllProductResponse>(
    `api/products?_page=${page}&_sort=${sort}&_order=${order}`
  );
  return res;
};

export const createPro = (products: any) => {
  const res = instance.post(`api/products`, products);
  return res;
};
export const updatePro = (products: any, id: string) => {
  const res = instance.patch(`api/products/${id}`, products);
  return res;
};
export const deletePro = (id: string) => {
  const res = instance.delete(`api/products/${id}`);
  return res;
};
export const moveToTrashProduct = (id: string) => {
  const res = instance.delete(`api/products/remove/${id}`);
  return res;
};
export const restoreProduct = (id: string) => {
  const res = instance.patch(`api/products/restore/${id}`);
  return res;
};
export const getAllProductDeleted = (page: number) => {
  const res = instance.get(`api/products/moveToTrash/delete?page=${page}`);
  return res;
};

// filter
export const filterProductByPrice = (
  page = 1,
  minPrice: any,
  maxPrice: any,
  sort: string,
  order: string
) => {
  const res = instance.get(
    `api/products/price/filter?_page=${page}&_sort=${sort}&_order=${order}${
      minPrice ? `&minPrice=${minPrice}` : ""
    }${maxPrice ? `&maxPrice=${maxPrice}` : ""}`
  );
  return res;
};
export const filterProductBySize = (
  page = 1,
  size: string,
  sort: string,
  order: string
) => {
  const res = instance.get(
    `api/products/size/filter?_page=${page}&_sort=${sort}&_order=${order}&_size=${size}`
  );
  return res;
};

type TGetInventoryOfProduct = {
  result: number;
};
export const getInventoryOfProduct = (
  id: string,
  color: string,
  size: string
): Promise<TGetInventoryOfProduct> => {
  const response = instance.get<any, TGetInventoryOfProduct>(
    `api/products/${id}/inventory?color=${color}&&size=${size}`
  );
  return response;
};
export const uploadFileExcel = (file: any) => {
  const res = instance.post("api/upload", file);
  return res;
};
