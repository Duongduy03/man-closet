"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IputProp {
  label: string;
  id: string;
  placeholder?:string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  watch?: any
}  

const Input: React.FC<IputProp> = ({
  placeholder,
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  watch
}) => {
  const emailPattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const commonValidate = (val: string) => {
    // password

    if ( id === "confirmPassword") {
      if (watch('password') != val) {
        return "Mật khẩu không trùng khớp";
      }
    }
    // email
    if (id === "email") {
      return !emailPattern.test(val) ? "Email không đúng định dạng" : undefined;
    }
 
    if (Number(val) < 0) {
      return "Phải nhập số lớn hơn 0";
    }
    return undefined;
  };
  return (
    
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-black"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          min={0}
          placeholder={placeholder}
          type={type}
          autoComplete={id}
          {...register(id, {
            required: `${id} bắt buộc nhập`,
            minLength: id === 'password' || id === "confirmPassword" ? { value: 6, message: `${id} phải lớn hơn 6 kí tự` } : undefined,
            validate: commonValidate            
          })}
          className={clsx(
            `
            dark:bg-white
            px-4
            bg-gray-50
             py-3
            form-input
            block
            w-full
            rounded-md
            border-0
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            focus:ring-2
            focus:ring-inset
            sm:text-sm
            sm:leading-6
            p-2
          `,
            errors[id] && "focus:ring-rose-500  outline-none	 border-rose-600 ",
            disabled && ""
          )}
        />
      </div>
    </div>
  );
};

export default Input;
