export interface IBill {
  _id: string;
  user_id: string;
  items: IOrderItem[];
  shipping_address: string;
  payment_method: string;
  total_price: number;
  history_order_status: IOrderStatus[];
  id_transaction: String;
  createdAt: Date;
  updatedAt: Date;
  userName?: string;
  payment_status: IPaymentStatus;
  current_order_status: IOrderStatus;
}

export enum OrderStatus {
  PENDING = "Chờ xác nhận",
  CONFIRM = "Đã xác nhận",
  DELIVERY = "Đang giao",
  DELIVERED= "Đã giao",
  RECEIVER = "Đã nhận",
  CANCEL = "Đã huỷ",
  EXCHANGE = "Đổi hàng",
}
export interface IOrderStatus {
  _id?: string;
  status: OrderStatus;
  updatedAt: Date;
}
export enum PaymentStatus {
  UNPAID = "Chưa thanh toán",
  PAID = "Đã thanh toán",
}

export interface IPaymentStatus {
  _id?: string;
  status: PaymentStatus;
  updatedAt: Date;
}

export interface IOrderItem {
  product_id: string;
  product_name: string;
  property: {
    quantity: number;
    color: string;
    size: string;
    imageUrl: string;
  };
  price: number;
  sub_total: number;
}

export type GetOrderHistoryResponse = {
  data: {
    message: string;
    result: {
      items: IBill[];
      totalItem: number;
      itemPerPage: number;
      totalPage: number;
      currentPage: number;
    };
  };
};
export const ORDER_STATUS = {
  PENDING: "Chờ xác nhận",
  CONFIRM: "Đã xác nhận",
  DELIVERY: "Đang giao",
  DELIVERED: "Đã giao",
  RECEIVER: "Đã nhận",
  CANCEL: "Đã huỷ",
  EXCHANGE: "Đổi hàng",
};

export const PAYMENT_STATUS = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
};