"use client"

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";

interface Props {
  initialValue: string;
  onClose: () => void;
  onUpdate: (data: { [key: string]: number | string }) => void;
}

const ModalEditPassword = ({ initialValue, onClose, onUpdate }: Props) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    let invalidToSubmit = false;
    let errorMessage = "";
    const isMatch = bcrypt.compareSync(password, initialValue);

    if (password.length === 0) {
      invalidToSubmit = true;
      errorMessage = "Các trường không được để rỗng";
    }

    if (newPassword.length === 0) {
      invalidToSubmit = true;
      errorMessage = "Các trường không được để rỗng";
    }
    if (newPassword.length < 6) {
      invalidToSubmit = true;
      errorMessage = "Ít nhất 6 kí tự";
    }

    if (confirmPassword.length === 0) {
      invalidToSubmit = true;
      errorMessage = "Các trường không được để rỗng";
    }
    if (confirmPassword.length <  6) {
      invalidToSubmit = true;
      errorMessage = "Ít nhất 6 kí tự";
    }

    if (!isMatch) {
      invalidToSubmit = true;
      errorMessage = "Xem lại các trường mật khẩu";
    }

    if (confirmPassword !== newPassword) {
      invalidToSubmit = true;
      errorMessage = "Xem lại các trường mật khẩu";
    }

    if (invalidToSubmit) {
      toast.error(errorMessage);
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const data = {
      password: hashedPassword,
    };
    onUpdate(data);
    onClose();
  };

  return (
    <>
      <div className="bg-white p-3 rounded overflow-hidden">
        <div className="pb-6">
          <label htmlFor="oldPassword" className=" text-gray-600">
            Mật khẩu đang sử dụng
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="oldPassword"
            className="w-full text-gray-800 pt-1 font-normal focus:outline-none border-b"
          />
        </div>
        <div className="pb-6">
          <label htmlFor="newPassword" className=" text-gray-600">
            Mật khẩu mới
          </label>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="newPassword"
            className="w-full text-gray-800 pt-1 font-normal focus:outline-none border-b"
          />
        </div>

        <div className="pb-6">
          <label htmlFor="confirmNewPassword" className=" text-gray-600">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmNewPassword"
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
            onKeyDown={(e) => {
              e.key === "Enter" && handleUpdate();
            }}
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

export default ModalEditPassword;
