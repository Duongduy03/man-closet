import { IProductInCart } from "@/interfaces/product";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import MediumTableItem_SC from "./mediumTableItem/MediumTableItem_SC";

const tableHeaderData = [
  {
    label: "Sản phẩm",
    className: "product_column flex-[5] text-left",
  },
  {
    label: "Giá",
    className: "price_column flex-[2] text-center",
  },
  {
    label: "Số lượng",
    className: "quantity_column flex-[2] text-center",
  },
  {
    label: "Giá cuối",
    className: "final_price_column flex-[2] text-center",
  },
];

interface ProductInCart extends IProductInCart {
  totalPrice: number;
  selected: boolean;
}

type Props = {
  data: ProductInCart[];
  handleChangeSelect: (product_id: string, color: string, size: string, isChecked: boolean) => void;
  handleUpdateQuantity: (
    product_id: string,
    color: string,
    size: string,
    quantity: number,
    totalPrice: number
  ) => void;
};

const MediumTable_SC = ({
  data,
  handleChangeSelect,
  handleUpdateQuantity,
}: Props) => {

  return (
    <>
      <div className="w-full">
        {/* table header */}
        <ul className="flex gap-3 pb-3">
          <li className="flex-[1]"></li>
          {tableHeaderData.map(({ label, className }) => (
            <li key={uuidv4()} className={`${className}`}>
              <span className="text-gray-400 font-medium">{label}</span>
            </li>
          ))}
          <li className="flex-[1]"></li>
        </ul>

        {/* table content */}
        <div className="bg-zinc-50 h-[70vh] rounded overflow-hidden">
          <ul className="overflow-y-auto ">
            {data?.slice()?.reverse()?.map((item) => (
              <MediumTableItem_SC
                key={uuidv4()}
                data={item}
                handleChangeSelect={handleChangeSelect}
                handleUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MediumTable_SC;
