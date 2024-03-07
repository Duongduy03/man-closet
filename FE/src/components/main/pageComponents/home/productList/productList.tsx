"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// ui
import { ProductCardV1, ProductCardV2 } from "@/components/card";
import { SwiperSlide } from "swiper/react";
import { BasicCarousel } from "@/components/carousel";
import { GridView } from "@/components/dataViews";

// css
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllProductState } from "@/redux/reducer/product.reducer";
import TitleGap from "@/components/titleGap";

const ProductList = () => {
  const products = useAppSelector((state) => state.product.products);

  const dispatchThunk = useAppDispatch();

  useEffect(() => {
    dispatchThunk(getAllProductState());
  }, [dispatchThunk]);

  return (
    <div>
      <TitleGap title="Sản phẩm phổ biến" />
      <div className="py-2">
        <GridView
          marginLeft="40px"
          previews={4}
          wrap
          className="gap-y-4 hidden sm:flex"
        >
          {products?.map((item) => {
            const data = {
              _id: item._id,
              name: item.productName,
              price: item.price,
              imageUrl: item.properties[0].imageUrl,
            };
            return (
              <ProductCardV2 key={uuidv4()} data={data} marginLeft="40px" />
            );
          })}
        </GridView>

        <div className="block sm:hidden">
          <BasicCarousel previews={1}>
            {products?.map((item) => {
              const data = {
                _id: item._id,
                name: item.productName,
                price: item.price,
                imageUrl: item.properties[0].imageUrl,
              };
              return (
                <SwiperSlide key={uuidv4()}>
                  <ProductCardV2 key={uuidv4()} data={data} />
                </SwiperSlide>
              );
            })}
          </BasicCarousel>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
