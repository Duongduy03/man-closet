"use client";
import Modal from "@/components/modal/Modal";
import { IBill } from "@/interfaces/bill";
import { IUser } from "@/interfaces/user";
import instance from "@/services/instance";
import React, { useEffect, useState } from "react";
import OrderPreviewModal from "./OrderPreviewModal";
import { exportBillById } from "@/services/order/order";
import { customDate } from "@/helper/convertDate";

type Props = {
  data: IBill;
};
const OrderManagerListItem = ({ data }: Props) => {
  const { _id, user_id, payment_status, current_order_status, createdAt } = data;

  const [user, setUser] = useState({} as IUser);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("/user/" + user_id);
      setUser(response.data);
    };
    fetchData();
  }, [user_id]);

  const handleClosePreview = () => {
    setIsPreview(false);
  };

  const URL = "http://localhost:8088/order/export";
  const exportBill = (id: any) => {
    // window.location("http")
    exportBillById(id);
    window.open(`${URL}/${id}`);
    // window.location.reload()
  };

  return (
    <>
      <li className="flex items-center bg-zinc-50 rounded px-1 py-2">
        <div className="flex-[1]">
          <p>{user?.name}</p>
        </div>
        <div className="flex-[1]">
          <p>{payment_status?.status}</p>
        </div>
        <div className="flex-[1]">
          <p>{current_order_status?.status}</p>
        </div>
        <div className="flex-[1]">
          <p>{customDate(createdAt.toString())}</p>
        </div>
        <div className="flex-[1] flex flex-col gap-2">
          <button
            className="text-blue-500 hover:text-blue-300 transition-all"
            onClick={() => setIsPreview(true)}
          >
            Chi tiết
          </button>
          <button
            className="text-green-500 hover:text-green-300 transition-all"
            onClick={() => exportBill(_id)}
          >
            Xuất PDF
          </button>
        </div>
      </li>

      <Modal isOpen={isPreview} handleClose={handleClosePreview}>
        <OrderPreviewModal order={data} onClose={handleClosePreview} />
      </Modal>
    </>
  );
};

export default OrderManagerListItem;
