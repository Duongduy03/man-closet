import { parseNumberToCurrency } from "@/helper/convertCurrency";
import { IBill, OrderStatus } from "@/interfaces/bill";
import {
  Hash,
  Package,
  Receipt,
  ScatterChart,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import ButtonsFunc from "./sub_components/ButtonsFunc";

type Props = {
  data: IBill;
};

const ProductListItem = ({ data }: Props) => {
  const { _id, current_order_status, total_price, payment_status, items, payment_method } =
    data;
  const router = useRouter();
  const itemsName = items.map((item) => item.product_name).join(", ");
  return (
    <>
      <li
        className="flex flex-col gap-3 cursor-pointer bg-white p-3 rounded"
        onClick={() => router.push(`/user/orders/${_id}`)}
      >
        <>
          <SubItem
            label="Mã đơn hàng"
            icon={<Hash className="w-5 h-5 text-zinc-500" />}
            data={_id}
          />
          <SubItem
            label="Sản phẩm đã mua"
            icon={<ShoppingBag className="w-5 h-5 text-zinc-500" />}
            data={itemsName}
          />
          <SubItem
            label="Trạng thái đơn hàng"
            icon={<Package className="w-5 h-5 text-zinc-500" />}
            data={current_order_status.status}
          />
          <SubItem
            label="Trạng thái thanh toán"
            icon={<ScatterChart className="w-5 h-5 text-zinc-500" />}
            data={payment_status.status}
          />
          <SubItem
            label="Tổng thanh toán"
            icon={<Receipt className="w-5 h-5 text-zinc-500" />}
            data={parseNumberToCurrency(total_price)}
          />
        </>

        <ButtonsFunc
          orderStatus={current_order_status.status}
          data={{ billId: _id, payment_status: payment_status.status, payment_method: payment_method }}
        />
      </li>
    </>
  );
};

export default ProductListItem;

type SubProps = {
  data: number | string;
  label: string;
  icon?: React.ReactNode;
};
const SubItem = ({ data, label, icon }: SubProps) => {
  return (
    <>
      <div className="flex-col m:flex-row flex items-start m:items-center justify-center m:justify-between gap-1">
        <p className="flex items-center gap-1 flex-[1]">
          <span>{icon}</span>
          <span className="text-gray-500">{label}: </span>
        </p>
        <p className="flex-[2] m:text-right ">{data}</p>
      </div>
    </>
  );
};
