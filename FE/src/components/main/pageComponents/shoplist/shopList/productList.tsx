'use client'
import { ProductCardV1, ProductCardV2 } from '@/components/card';
import { BasicCarousel } from '@/components/carousel';
import { GridView } from '@/components/dataViews';
import TitleDivide from '@/components/titleDivide';
import { v4 as uuidv4 } from "uuid";
import React, { useContext } from 'react'
import { SwiperSlide } from 'swiper/react';
import { IProduct, IProductResponse } from '@/interfaces/product';
import { useState, useEffect } from 'react'
import Pagination from '@/components/pagination/Pagination';
import TitleGap from '@/components/titleGap';
import { filterProduct } from '@/services/products/products';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getsProduct, setPage } from '@/redux/reducer/product.reducer';
import { useDispatch } from 'react-redux';
interface ShopListProp {
  sort:string,
  sortOrder:string

}

const ShopList = ({sort, sortOrder}:ShopListProp) => {


  const filteredProduct:any = useAppSelector((state) => state.product.productList);

  const dispatch = useAppDispatch();
  const [product,setProduct] = useState<IProduct[]>([])
  const [productAll,setProductAll] = useState<IProduct[]>([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)

  
  useEffect(()=>{
    if(filteredProduct.data){
      setProduct(filteredProduct.data)
      setCurrentPage(filteredProduct.pagination?.currentPage)
      setTotalPages(filteredProduct.pagination?.totalPages)
    }else{
      fetchData(currentPage)
    }
  },[filteredProduct,currentPage,sort,sortOrder])

  // useEffect(() => {
  //   setData() 
  // },[sort,sortOrder]);
  // const setData = () => {
  //   setProduct(filteredProduct.data); 
  //   setCurrentPage(filteredProduct.pagination?.currentPage)
  //   setTotalItems(filteredProduct.pagination?.totalItem)
  //   setTotalPages(filteredProduct.pagination?.totalsPages)
  // }
 
  const fetchData = async (page:number) => {
    const response:any = await filterProduct(page,sort,sortOrder)
    setProduct(response.data)
    setCurrentPage(response.pagination.currentPage)
    setTotalPages(response.pagination.totalPages)
  }
  const handleChangePage = (page:number) => {
    setCurrentPage(page)
    dispatch(setPage(page))

  }

  return (
    <div>
      <div>
      <TitleGap title="Tất cả sản phẩm" />
      <div className="py-2">
        <GridView
          marginLeft="40px"
          previews={4}
          wrap
          className="gap-y-4 hidden sm:flex"
        >
          {product?.map((item:IProduct) => {
            const data = {
              _id: item._id,
              name: item.productName,
              price: item.price,
              imageUrl: item.properties[0]?.imageUrl,
            };
            return (
              <ProductCardV2 key={uuidv4()} data={data} marginLeft="40px" />
            );
          })}
        </GridView>
        
        <div className="block sm:hidden">
          <BasicCarousel previews={1}>
            {product?.map((item:IProduct) => {
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage}/>
    </div>
  );
}

export default ShopList