"use client"


import { v4 as uuidv4 } from "uuid";
// ui
import TitleDivide from "@/components/titleDivide";
import { SwiperSlide } from "swiper/react";
import { ProductCardV1 } from "@/components/card";
import { BasicCarousel } from "@/components/carousel";
import { IProduct } from "@/interfaces/product";

// css

// type
interface Data {
  productId: string;
}

interface ProductCarouselProps {
  title: string;
  data: IProduct[];
}


const Related = ({ title, data }: ProductCarouselProps) => {
  return (
    <div>
      <div className="py-2 pt-4">
        <TitleDivide title={title} align="start" />
      </div>
      <div>
        <BasicCarousel previews={4}>
          {data?.map(item => (
            <SwiperSlide key={uuidv4()}>
              <ProductCardV1 data={item} />
            </SwiperSlide>
          ))}
        </BasicCarousel>
      </div>
    </div>
  );
};

export default Related
