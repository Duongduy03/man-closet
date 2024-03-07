"use client";

import Modal from "@/components/modal/Modal";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import style from "./addressList.module.scss";

import { useUserInfo } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  deleteAddressState,
  getAddressByUserIdState,
  updateUserAddressState,
} from "@/redux/reducer/user.reducer";
import ConfirmModalV2 from "@/components/modal/confirmModal-v2/ConfirmModalV2";
import AddressListItem from "../addressListItem/addressListItem";

const AddressList = () => {
  const { _id, name } = useUserInfo();
  const dispatchThunk = useAppDispatch();
  const address = useAppSelector(state => state.user.address)

  const [openSetDefaultModal, setOpenSetDefaultModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    dispatchThunk(getAddressByUserIdState(_id))
  }, [dispatchThunk, _id])

  const handleCloseModal = () => {
    setOpenSetDefaultModal(false);
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    dispatchThunk(
      deleteAddressState({ user_id: _id, address_id: selectedAddressId })
    );
    handleCloseModal();
  };

  const handleUpdateDefault = () => {
    const data = {
      isDefault: true,
    };
    dispatchThunk(
      updateUserAddressState({
        user_id: _id,
        address_id: selectedAddressId,
        data,
      })
    );
    handleCloseModal()
  };

  return (
    <>
      <div className="pt-3 sm:pt-4">
        <ul className={style.address_list}>
          {address?.map((item) => {
            const data = {
              ...item,
              username: name,
              user_id: _id,
            };
            return (
              <AddressListItem
                key={uuidv4()}
                data={data}
                onDelete={setOpenDeleteModal}
                onSetDefault={setOpenSetDefaultModal}
                setSelectedAddressId={setSelectedAddressId}
              />
            );
          })}
        </ul>
      </div>

      <Modal isOpen={openDeleteModal} handleClose={handleCloseModal}>
        <ConfirmModalV2
          title="Xoá"
          onClose={handleCloseModal}
          onDelete={handleDelete}
          content={"Bạn có chắc muốn xoá địa chỉ này không?"}
        />
      </Modal>

      <Modal isOpen={openSetDefaultModal} handleClose={handleCloseModal}>
        <ConfirmModalV2
          title="Đặt làm mặc định"
          onClose={handleCloseModal}
          onDelete={handleUpdateDefault}
          content={"Bạn có chắc muốn đặt địa chỉ này làm địa chỉ mặc định không?"}
        />
      </Modal>
    </>
  );
};

export default AddressList;
