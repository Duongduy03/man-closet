import instance from "./instance";
import { ProductInCartResponse } from "./responses/product.responses";
import { IProductInCart, ProductInCart } from "@/interfaces/product";

export const getAllProductInCart = (signal?: AbortSignal) => {
  const res = instance.get<any, ProductInCartResponse>(`api/cart`, {
    signal: signal,
  });
  return res;
};

type TAddToCartResponse = {
  message: string;
  result: IProductInCart[];
};
export const addProductToCartAxios = (
  user_id: string,
  product_data: IProductInCart
): Promise<TAddToCartResponse> => {
  const res = instance.patch<any, TAddToCartResponse>(`api/cart/add-to-cart`, {
    user_id,
    product: product_data,
  });
  return res;
};

type TDeleteProductResponse = {
  message: string;
  result: IProductInCart[];
};
export const deleteProductInCart = (user_id: string, data: ProductInCart[]) => {
  const response = instance.put<any, TDeleteProductResponse>(
    `/api/cart/${user_id}`,
    data
  );
  return response;
};

type TUpdateProductInCartResponse = {
  message: string;
  result: IProductInCart;
};
export const updateProductInCart = (
  user_id: string,
  product_id: string,
  color: string,
  size: string,
  data: { [key: string]: string | number }
): Promise<TUpdateProductInCartResponse> => {
  const response = instance.patch<any, TUpdateProductInCartResponse>(
    `api/cart/${user_id}/product/${product_id}?color=${color}&&size=${size}`,
    data
  );

  return response;
};
