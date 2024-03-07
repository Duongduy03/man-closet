"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onUpdate: (data: { [key: string]: string | number }) => void;
  initialValue: string;
}

const ModalEditEmail = ({ onClose, onUpdate, initialValue }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    const isMatch = bcrypt.compareSync(password, initialValue);
    let invalidToSubmit = false;

    if (!email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/)) {
      invalidToSubmit = true;
    }
    if (email.length === 0) {
      invalidToSubmit = true;
    }

    if (!isMatch) {
      invalidToSubmit = true;
    }

    if (invalidToSubmit) {
      toast.error("Xem lại email hoặc mật khẩu");
      return;
    }

    const data = { email: email };
    onUpdate(data);
    toast.success("Đổi email thành công");
    onClose();
  };

  return (
    <>
      <div className="bg-white p-3 rounded overflow-hidden">
        <div className="pb-6">
          <label htmlFor="newEmail" className=" text-gray-600">
            Email mới
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="newEmail"
            className="w-full text-gray-800 pt-1  font-normal focus:outline-none border-b"
          />
        </div>
        <div className="pb-6">
          <label htmlFor="passwordToChangeEmail" className="text-gray-600">
            Mật khẩu
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="passwordToChangeEmail"
              className="w-full text-gray-800 flex-[1] pt-1 font-normal focus:outline-none border-b"
            />
            <button>
              {showPassword ? (
                <Eye
                  className="w-5 h-5"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOff
                  className="w-5 h-5"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </button>
          </div>
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

export default ModalEditEmail;
