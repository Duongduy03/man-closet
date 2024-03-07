export interface OrderItem {
  _id: string;
  user_id: string;
  payment_method: string;
  shipping_address: string;
  items: {
    imageUrl: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
  total_price: number;
  id_transaction: string;
  history_order_status: [
    {
      status: string;
      updatedAt: Date;
      _id: string;
    },
  ];
  payment_status: {
    status: string,
    updatedAt: Date
  },
  current_order_status: {
    status: string,
    updatedAt: Date
  },
  createdAt: Date;
  updatedAt: Date;
}
