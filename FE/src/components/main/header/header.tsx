"use client";

import { AlignLeft, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import Modal from "@/components/modal/Modal";
import SearchModal from "./SearchModal";
import MenuModal from "../navigation/MenuModal";
import {  useUserInfo } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProductsInCart } from "@/redux/reducer/cart.reducer";
import Cookies from "js-cookie";
const Header = () => {
  const accessToken = Cookies.get("accessToken")
  const userInfo = Cookies.get("user") 
  const rfToken = Cookies.get("refreshToken") 
 
  if(accessToken){
  localStorage.setItem("accessToken", accessToken)
  Cookies.remove("accessToken")
  }
  if(userInfo){
    localStorage.setItem("user", userInfo)
    Cookies.remove("user")
  }
  if(rfToken){
    localStorage.setItem("refreshToken", rfToken)
    Cookies.remove("user")
  }
    const [isSearch, setIsSearch] = useState(false);
  const cart = useAppSelector(state =>state.cart.products)
  const dispatchThunk = useAppDispatch()
  const user = useUserInfo()

  useEffect(() => {
    dispatchThunk(getProductsInCart())
  }, [dispatchThunk])

  const closeSearchModal = () => {
    setIsSearch(false);
  };

  // menu mobile
  // const [isOpenMenuMb, setIsOpenMenuMb] = useState(false)
  // const handleOpenMenuMobile = (value: boolean) => {
  //   setIsOpenMenuMb(value)
  // }
 
   let user_id = '';
   if(user){
    user_id = user._id
   }
  
  // console.log(isOpenMenuMb)
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleOpenMenu = (value: boolean) => {
    setIsOpenMenu(value);
  };

  return (
    <>
      <header className="divide-y divide-zinc-800 dark:divide-slate-50/10">
        <div className="bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white py-4 md:py-6">
          <div className="section_container flex gap-y-4 md:gap-y-0 flex-row md:items-center justify-between">
            <div className="flex flex-[1] justify-between items-center">
              <div className="flex items-center mr-4">
                <button onClick={() => handleOpenMenu(true)}>
                  <AlignLeft className="w-5 h-5 cursor-pointer" />
                </button>
              </div>
            </div>

            <div className="flex-[2] flex items-center justify-center">
              <Link href={"/"}>
                <Logo />
              </Link>
            </div>
            <div className="flex justify-end flex-[1] items-center gap-x-4">
              <div
                onClick={() => setIsSearch(true)}
                className="group w-8 h-8 flex items-center justify-center overflow-hidden transition cursor-pointer p-1"
              >
                <Search className="w-5 h-5 transition group-hover:text-gray-600" />
              </div>
              <div className="block">
                <Link
                  href={"/shopping_cart"}
                  className="relative group w-8 h-8 flex items-center justify-center overflow-hidden transition cursor-pointer p-1"
                >
                  {cart.length > 0 && (
                    <div
                      className="absolute w-[8px] h-[8px] rounded-full bg-red-500 top-1 right-1"
                      style={{
                        boxShadow: "0px 0px 1px 3px rgba(255, 0, 0, 0.2)",
                      }}
                    ></div>
                  )}
                  <ShoppingBag className="w-5 h-5 group-hover:text-gray-600 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* menu */}
      <MenuModal isOpen={isOpenMenu} onClose={handleOpenMenu} />

      {/* modal */}
      <Modal isOpen={isSearch} handleClose={closeSearchModal}>
        <SearchModal onClose={closeSearchModal} />
      </Modal>
    </>
  );
};

export default Header;
