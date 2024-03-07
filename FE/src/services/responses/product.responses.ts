import { IProduct, IProductInCart } from "@/interfaces/product";
import { AxiosResponse } from "axios";

export interface ProductInCartResponse extends AxiosResponse {
  result: IProductInCart[];
}

export interface GetProductResponse extends AxiosResponse {
  data: IProduct
}

export interface GetAllProductResponse extends AxiosResponse{
  data: IProduct[]
}