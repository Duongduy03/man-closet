// import React from "react";
import clsx from "clsx";

interface ButtonProp {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProp> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
        
      className={clsx(
        `flex
           justify-center 
           rounded-md 
           px-3 
           py-2 
           text-sm 
           font-semibold 
           focus-visible:outline 
           focus-visible:outline-2 
           focus-visible:outline-offset-2`,
        disabled && "",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 border-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-gray-600	 hover:bg-gray-700	 focus-visible:bg-gray-600	"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
