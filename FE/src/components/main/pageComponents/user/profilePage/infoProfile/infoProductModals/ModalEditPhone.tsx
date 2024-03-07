"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  initialValue: string;
  onClose: () => void;
  onUpdate: (data: { [key: string]: number | string }) => void;
};

const ModalEditPhone = ({ onUpdate, initialValue, onClose }: Props) => {
  const [phone, setPhone] = useState(initialValue || "");

  const handleEditPhone = () => {
    if(phone === ""){
      toast.error("Không được để trống!")
      return
    }

    if(phone.length < 10 ||phone.length > 11){
      toast.error("Số điện thoại chỉ được phép từ 10 tới 11 ký tự")
      return
    }

    const data = {
      phone: phone,
    };
    onUpdate(data)
    onClose()
    toast.success("Lưu số điện thoại thành công")
  };

  const handleChangeInput = (value: string) => {
    const incomeValue = value;
    if (incomeValue.match(/^[0-9]*$/)) {
      setPhone(incomeValue);
    }
  };

  return (
    <>
      <div className="w-[400px] bg-white rounded p-3 flex flex-col">
        <label htmlFor="phoneNumber" className="text-gray-500 pb-2">Số điện thoại:</label>
        <input
        id="phoneNumber"
          type="text"
          inputMode="tel"
          value={phone}
          onChange={(e) => handleChangeInput(e.target.value)}
          className="focus:outline-none border px-3 py-2 text-gray-800"
        />
       <div className="flex items-centre pt-4">
        <button className="flex-[1] h-full py-2 text-gray-800 hover:text-gray-500 transition-all">Huỷ</button>
        <button 
        className="flex-[1] h-full py-2 bg-zinc-800 rounded hover:bg-zinc-600 transition-all text-white"
          onClick={() => handleEditPhone()}
        >Lưu</button>
       </div>
      </div>
    </>
  );
};

export default ModalEditPhone;
