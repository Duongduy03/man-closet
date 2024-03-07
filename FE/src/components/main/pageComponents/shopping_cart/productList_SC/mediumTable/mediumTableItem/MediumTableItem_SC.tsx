"use client";

import Modal from "@/components/modal/Modal";
import {
  useCurrency,
  useProductQuantity,
  useUserInfo,
} from "@/hooks";
import { IProductInCart } from "@/interfaces/product";
import {
  deleteProductInCartAsync,
  updateProductInCartAsync,
} from "@/redux/reducer/cart.reducer";
import { useAppDispatch } from "@/redux/store";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";

interface ProductInCart extends IProductInCart {
  totalPrice: number;
  selected: boolean;
}

type Props = {
  data: ProductInCart;
  handleChangeSelect: (
    product_id: string,
    color: string,
    size: string,
    isChecked: boolean
  ) => void;
  handleUpdateQuantity: (
    product_id: string,
    color: string,
    size: string,
    quantity: number,
    totalPrice: number
  ) => void;
};

const MediumTableItem_SC = ({
  data,
  handleChangeSelect,
  handleUpdateQuantity,
}: Props) => {
  const {
    _id,
    color,
    imageUrl,
    name,
    price,
    quantity,
    size,
    selected,
  } = data;

  const {
    amount,
    decrementAmount,
    incrementAmount,
    inventory,
  } = useProductQuantity({ _id, color, size, iniTialQuantity: quantity });

  const { _id: user_id } = useUserInfo();
  const dispatch = useAppDispatch();

  const [amount2, setAmount2] = useState(quantity.toString());
  const [isOpenModalDelete, setIsOpenDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };
  const handleDelete = () => {
    const product = data;
    try {
      dispatch(deleteProductInCartAsync({ user_id: user_id, data: [product] }));
      handleCloseDeleteModal();
    } catch (error: any) {
      throw error;
    }
  };

  const handleChangeQuantity = (calculation: string) => {
    if (calculation === "plus") {
      if (+amount >= inventory) {
        toast.info(
          `Rất tiếc, bạn chỉ có thể mua tối đa ${inventory} với sản phẩm này!`
        );
        return;
      } else {
        incrementAmount();
        const newQuantity = +amount + 1;
        const newTotalPrice = price * newQuantity;
        handleUpdateQuantity(_id, color, size, newQuantity, newTotalPrice);
        dispatch(
          updateProductInCartAsync({
            user_id: user_id,
            product_id: _id,
            color: color,
            size: size,
            data: {
              quantity: +newQuantity,
            },
          })
        );
      }
    }

    if (calculation === "minus") {
      decrementAmount();
      if (quantity === 0) {
        const newQuantity = 0;
        const newTotalPrice = 0;
        handleUpdateQuantity(_id, color, size, newQuantity, newTotalPrice);
      } else {
        const newQuantity = +amount - 1;
        const newTotalPrice = price * newQuantity;
        handleUpdateQuantity(_id, color, size, newQuantity, newTotalPrice);
        dispatch(
          updateProductInCartAsync({
            user_id: user_id,
            product_id: _id,
            color: color,
            size: size,
            data: {
              quantity: +newQuantity,
            },
          })
        );
      }
    }
  };

  const handleCheckBlurAmount = (value: string) => {
    let finalValue = +value === 0 ? 1 : +value
    handleUpdateQuantity(_id, color, size, finalValue, finalValue * price);
    dispatch(
      updateProductInCartAsync({
        user_id: user_id,
        product_id: _id,
        color: color,
        size: size,
        data: {
          quantity:finalValue,
        },
      })
    );
  };

  const handleChangeChecked = (id: string, checked: boolean) => {
    handleChangeSelect(id, color, size, !checked);
  };

  const handleChangeInputValue = (value: string) => {
    const incomeValue = value;
    if (incomeValue.match(/^[0-9]*$/)) {
      if (+incomeValue > inventory) {
        setAmount2(inventory.toString());
      } else {
        setAmount2(incomeValue);
      }
    }
  };

  return (
    <>
      <li className="flex items-center py-3 border-b gap-3 cursor-pointer">
        <div className="flex-[1] grid place-items-center">
          <input
            type="checkbox"
            checked={selected}
            disabled={quantity > 0 ? false : true}
            onChange={() => handleChangeChecked(_id, selected)}
          />
        </div>

        <article className="flex-[5] flex items-center gap-3">
          <figure className="relative w-[60px] h-[60px] rounded overflow-hidden">
            <Image
              alt={name}
              src={imageUrl}
              fill
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
              }}
            />
          </figure>
          <div>
            <h5 className="flex-[1] font-medium text-gray-800">{name}</h5>
            <p>
              {color ? `${color}, ` : ""}
              {size ?? `${size}`}
            </p>
          </div>
        </article>
        <p className="flex-[2] text-center font-medium text-gray-800">
          {useCurrency(price)}
        </p>

        <div className="flex-[2] flex items-center justify-center">
          <div className="h-[60px] flex items-center gap-1">
            <input
              type="text"
              className="w-[60px] text-center h-full rounded focus:outline-none"
              inputMode="numeric"
              value={amount2}
              onBlur={(e) => handleCheckBlurAmount(e.target.value)}
              onChange={(e) => handleChangeInputValue(e.target.value)}
            />

            <div className="flex flex-col">
              <button
                onClick={() => handleChangeQuantity("plus")}
                className="p-1 grid place-items-center"
              >
                <Plus className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleChangeQuantity("minus")}
                className="p-1 grid place-items-center"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <p className="flex-[2] text-center font-medium text-[--secondary-color]">
          {useCurrency(price * +amount)}
        </p>
        <button
          className="flex-[1] text-center"
          onClick={() => setIsOpenDeleteModal(true)}
        >
          <X className="w-5 h-5" />
        </button>
      </li>

      {/* modal */}
      <Modal isOpen={isOpenModalDelete} handleClose={handleCloseDeleteModal}>
        <ModalDelete onClose={handleCloseDeleteModal} onDelete={handleDelete} />
      </Modal>
    </>
  );
};

export default MediumTableItem_SC;
