import React from "react";
import { ORDER_STATUS } from "@/interfaces/bill";
import { Filter } from "lucide-react";

type Props = {
  changeCase: (typecase: string) => void;
};

const Tabline = ({ changeCase }: Props) => {
  const orderStatusData = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRM,
    ORDER_STATUS.DELIVERY,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.RECEIVER,
    ORDER_STATUS.CANCEL,
    ORDER_STATUS.EXCHANGE,
  ];

  return (
    <div>
      <div className="flex items-center cursor-pointer bg-zinc-100 px-3 rounded md:w-[240px] md:ml-auto">
        <div>
          <Filter />
        </div>
        <select
          onChange={(e) => changeCase(e.target.value)}
          className="focus:outline-none flex w-full py-2 pl-2 bg-transparent cursor-pointer"
        >
          {orderStatusData.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Tabline;
