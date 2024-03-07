"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  initialValue: string;
  onClose: () => void;
  onUpdate: (data: { [key: string]: number | string }) => void;
}

const ModalEditName = ({ initialValue, onClose, onUpdate }: Props) => {
  const [name, setName] = useState(initialValue);

  const handleUpdate = () => {
    if (name.length < 3) {
      toast.error("Tên không được dưới 3 ký tự");
      return;
    }
    onUpdate({ name: name });
    toast.success("Cập nhật tên thành công");
    onClose();
  };

  return (
    <>
      <div className="bg-white p-3 rounded overflow-hidden">
        <div className="pb-6">
          <label
            htmlFor="changeUserNameInput"
            className="text-gray-600"
          >
            Tên người dùng
          </label>
          <input
            type="text"
            value={name}
            onKeyDown={(e) => {
              e.key === "Enter" && handleUpdate();
            }}
            onChange={(e) => setName(e.target.value)}
            id="changeUserNameInput"
            className="w-full text-gray-800 pt-1 font-normal focus:outline-none border-b"
          />
        </div>

        <div className="flex items-center gap-3 pt-6">
          <Button
            onClick={() => onClose()}
            variant={"bordered"}
            className="flex-[1]"
          >
            Huỷ
          </Button>

          <Button
            onClick={() => handleUpdate()}
            variant={"primary"}
            className="flex-[1]"
          >
            Thay đổi
          </Button>
        </div>
      </div>
    </>
  );
};

export default ModalEditName;
