"use client";
import { ImgProductBanner } from "@/components/banner";
import {
  GridCategory,
  GridProduct,
  OfferList,
  ProductCarousel,
  ProductList,
  Welcome,
} from "@/components/main/pageComponents/home";
import React from "react";

// demo data
import { BannerCarousel } from "@/components/carousel";
import Image from "next/image";
import { homeBanner1 } from "@/assets/media/images/bannerImg";

const Home = () => {
  return (
    <div>
      <section className="pb-4 md:pb-8 section_container">
        <BannerCarousel />
      </section>

      <section className="py-4 md:py-8 section_container">
        <Welcome />
      </section>

      <section className="py-4 md:py-8 section_container">
        <GridCategory />
      </section>

      <section className="py-4 md:py-8 section_container">
        <ProductCarousel />
      </section>

      <section className="py-4 md:py-8 section_container">
        <div className="relative w-full min-h-[200px] max-h-[400px] rounded overflow-hidden">
          <Image src={homeBanner1} alt="banner" width={500} height={400} style={{objectFit: "contain", width: "100%", height:"100%"}}/>
        </div>
      </section>

      <section className="py-4 md:py-8 section_container">
        <ProductList/>
      </section>
      <section className="py-4 md:py-8 section_container">
        <OfferList />
      </section>

      <section className="py-4 md:py-8 section_container">
        <GridProduct />
      </section>
    </div>
  );
};

export default Home;
