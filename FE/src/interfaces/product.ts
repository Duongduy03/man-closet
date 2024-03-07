export interface Variant {
    quantity: number;
    size: string;
    _id:string
}

export interface Property {
    imageUrl: string;
    color: string;
    variants: Variant[]
}
export interface IProduct {
    _id: string,
    productName: string;
    price: number;
    description?: string;
    properties: Property[];
    categoryId: string;
    couponId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    deleted?: boolean;
}

export interface IProductResponse {
  data: IProduct[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface IProductInCart {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  imageUrl: string;
  addedAt?: Date;
  updatedAt?: Date;
}

export interface ICheckoutProduct {
  product_id: string;
  product_name: string;
  property: {
    quantity: number;
    color: string;
    size: string;
    imageUrl: string
  };
  price: number;
  sub_total: number;
}

export interface ProductSold {
  totalQuantitySold: number;
  totalAmountSold: number;
  product_id: string;
  productImage: string,
  productName: string
}


export interface ProductInCart extends IProductInCart {
  totalPrice: number;
  selected: boolean
}