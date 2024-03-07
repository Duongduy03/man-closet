"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";

// css
import "swiper/css";
import "swiper/css/pagination";
import "./customSwiper.scss";
import style from "./BasicCarousel.module.scss";

// type
interface BasicCarousel {
  previews: number;
  children: React.ReactNode
}

const BasicCarousel = ({previews, children}: BasicCarousel) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          520: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: previews - 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: previews - 1,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: previews,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className={cn("my-product-carousel", style.product_carousel)}
      >
        {children}
      </Swiper>
    </>
  )
}

export default BasicCarousel