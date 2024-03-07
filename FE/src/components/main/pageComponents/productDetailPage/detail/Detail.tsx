"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IProduct } from "@/interfaces/product";
import { getProductState } from "@/redux/reducer/product.reducer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useCurrency, useUserInfo } from "@/hooks";

import "swiper/css";
import "swiper/css/pagination";
import "./detailCustomSwiper.scss";
import AddToCardModal from "../addToCartModal/AddToCartModal";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { commonErrorToast, commonInfoToast, commonSuccessToast } from "@/utils/notify";
import { addRemoveWishList } from "@/services/auth/auth";
import { Comment } from "../../home";

const ImageItem = ({ src }: { src: string }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        alt="product-detail-image"
        src={src}
        width={1000}
        height={1000}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
    </div>
  );
};

const Detail = () => {
  const { productId } = useParams();
  // state
  const [isOpenModal, setIsOpenModal] = useState(false);
  const product = useAppSelector((state) => state.product.product);
  const user = useUserInfo()

  const dispatchThunk = useAppDispatch();
  useEffect(() => {
    dispatchThunk(getProductState(productId.toString()));
  }, [dispatchThunk, productId]);


  const imageArr = product.properties?.map((item) => item?.imageUrl);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleWishlist = async () => {
    try {
      if (!user) {
        commonErrorToast("Bạn cần đăng nhập để thực hiện chức năng")
      } else {
        const data = {
          name: product.productName,
          imageUrl: product.properties[0].imageUrl,
          price: product.price,
        }
        const addWishList = await addRemoveWishList(data)
        if (addWishList) {
          commonSuccessToast("Thêm sản phẩm yêu thích thành công")
        }

      }
    } catch (error: any) {
      // console.log(error);

      commonErrorToast(`${error.response.data.message}`)

    }


  }

  return (
    <>
      <div className="flex flex-col md:items-start md:flex-row gap-6 md:gap-16">
        <div className="rounded overflow-hidden flex-[1]">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwiperProductDetailImage"
          >
            {imageArr?.map((item) => (
              <SwiperSlide key={uuidv4()}>
                <ImageItem src={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex-[1]">
          <h3 className="font-medium text-gray-800 pb-2">
            {product.productName}
          </h3>
          <h4 className="py-1 md:py-3 font-semibold text-[--secondary-color]">
            {useCurrency(product.price)}
          </h4>



          <div className="hidden md:flex flex-col gap-2 pt-6 pb-3 md:pt-10">
            <button
              onClick={() => setIsOpenModal(true)}
              className="flex-[1] py-3 px-2 w-[300px] rounded bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all"
            >
              Thêm vào giỏ hàng
            </button>
            <button onClick={() => handleWishlist()} className="flex-[1] py-2 w-[300px] px-2 rounded border-2 border-zinc-800 text-gray-800  hover:text-gray-700 hover:border-zinc-600 transition-all">
              Thêm vào yêu thích
            </button>
          </div>

          <div className="pt-6 pb-3 md:pt-10">
            <h4 className=" text-gray-800 font-semibold pb-2">
              Mô tả:
            </h4>
            <p className="pl-3 md:pl-4 font-normal text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="pt-6 pb-3 md:pt-10">
            <h4 className="pb-2  text-gray-800 font-semibold">
              Chia sẻ:
            </h4>
            <ul className="pl-3 md:pl-4  font-normal text-gray-600 flex items-center gap-3">
              <li className=" w-[30px] h-[30px] rounded-full border border-zinc-800">
                <Link
                  href=""
                  className="flex items-center justify-center w-full h-full"
                >
                  <Facebook className="w-5 h-5  text-gray-800" />
                </Link>
              </li>
              <li className=" w-[30px] h-[30px] rounded-full border border-zinc-800">
                <Link
                  href=""
                  className="flex items-center justify-center w-full h-full"
                >
                  <Twitter className="w-5 h-5  text-gray-800" />
                </Link>
              </li>
              <li className=" w-[30px] h-[30px] rounded-full border border-zinc-800">
                <Link
                  href=""
                  className="flex items-center justify-center w-full h-full"
                >
                  <Instagram className="w-5 h-5  text-gray-800" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{ boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.08)" }}
        className="block md:hidden fixed z-20 bottom-0 left-0 rounded-t-xl right-0 bg-white px-3 py-5"
      >
        <div className="flex flex-row gap-2 w-full">
          <button
            onClick={() => setIsOpenModal(true)}
            className="flex-[1] py-3 px-2 rounded bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all"
          >
            Thêm vào giỏ hàng
          </button>
          <button onClick={() => handleWishlist()} className="flex-[1] py-2 md:py-3 px-2 rounded border-2 border-zinc-800 text-gray-800  hover:text-gray-700 hover:border-zinc-600 transition-all">
            Thêm vào yêu thích
          </button>
        </div>
      </div>
      <Comment productId={productId} />

      {/* modal */}
      <AddToCardModal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        product={product}
      />

    </>
  );
};

export default Detail;
