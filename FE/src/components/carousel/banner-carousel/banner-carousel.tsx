"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { v4 as uuidv4 } from "uuid";

import { Pagination, Autoplay } from "swiper/modules";
import { BannerV1 } from "@/components/banner";

import "./banner-carousel.scss";
import { gc_1, gc_4, gc_5 } from "@/assets/media/images/home_grid_category_banner";

const data = {
  color: "#ffffff",
  href: "/",
  src: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
  subTitle: "Best Furniture For Castle...",
  title: "New Furniture Collection Trends in 2020",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing edit. Manga in est adipiscing in phasullus non in justo",
};

const carouselData = [
  {
    color: "#ffffff",
    href: "/",
    src: gc_1,
    subTitle: "Phong cách trẻ trung",
    title: "Bộ sưu tập thu đông 2023",
    description:
      "Với bộ sưu tập thu đông 2023 được tuyển chọn, tha hồ đam mê phối đồ cho chàng trai của chúng ta",
  },
  {
    color: "#ffffff",
    href: "/",
    src: gc_4,
    subTitle: "Áo khoác Hàn Quốc",
    title: "Bộ sưu tập Áo Khoác trending",
    description:
      "Với bộ sưu tập Áo khoác Hàn Quốc trending được tuyển chọn, tha hồ đam mê phối đồ cho chàng trai của chúng ta",
  },
  {
    color: "#ffffff",
    href: "/",
    src: gc_5,
    subTitle: "Quần thu đông",
    title: "Bộ sưu tập quần thu đông hot 2023",
    description:
      "Với bộ sưu tập quần thu đông hot được tuyển chọn, tha hồ đam mê phối đồ cho chàng trai của chúng ta",
  },
];

const BannerCarousel = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiperBannerCarousel"
      >
        {carouselData.map((item) => (
          <SwiperSlide key={uuidv4()}>
            <BannerV1 {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BannerCarousel;
