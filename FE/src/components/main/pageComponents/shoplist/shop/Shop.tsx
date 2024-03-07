'use client'

import React, { useState, useEffect } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { Filter } from 'lucide-react'
import { categoryCarouselData } from '@/app/(main)/(home)/demo.data'
import {  ShopList } from '..'
import ModalFilter from './ModalFilter'
import CategoryContainer from '../category/Category'






const Shop = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [sort,setSort] = useState("createdAt");
    const [sortOrder,setSortOrder] = useState("desc");
    const handleCloseModal = () => {
        setIsOpen(false);
      };
      const handleChanSelect = async (e:any) => {
        const selectedValue = e.target.value;
        const [selectedSort, selectedOrder] = selectedValue.split('_');
        let newSortOrder = selectedOrder === "desc" ? "asc" : "desc";
        setSort(selectedSort);
        setSortOrder(newSortOrder);      
      }

      

      
  return (
    <div>
      <section>
        <Breadcrumb />
      </section>
      <section className="pt-10 md:py-16 section_container ">
        <div className="">
          <div className="flex flex-row justify-between">
            <div className="hidden md:block md:w-2/6">
              <div className="font-bold text-xl">
                Các mặt hàng thời trang ManCloset
              </div>
              <p className="text-xs text-gray-400">
                
              </p>
            </div>
            <div className="flex w-full md:w-1/2 flex-row justify-center align-center ">
            <div className="pr-2 mt-2 w-1/2">
              <button onClick={() => setIsOpen(true)} className="w-full flex flex-row md:hidden border-gray-200 border-2 p-2 align-center justify-center hover:border-gray-800 transition ease-in-out rounded-sm ">
              <Filter />  
              <span className="pl-2" >Bộ lọc </span>
              </button>
              </div>
            
              <div className="md:flex   md:align-center md:items-center pr-2 mt-2 w-1/2">
                
                
            
              <select onChange={handleChanSelect} className="p-2 text-gray-700
              w-full ml-2 border-gray-300 cursor-pointer focus:outline-none pr-2 pl-2 border-2  hover:border-gray-400 transition ease-in-out rounded-sm" name='sort' >
           
                  <option value="createdAt_asc">Mới nhất</option>
                  <option value="createdAt_desc">Cũ nhất</option>
                  <option value="price_asc">Giá: Giảm dần</option>
                  <option value="price_desc">Giá: Tăng dần </option>
                </select>
  
              
              </div>
           
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start	md:flex-row">

            <div className="flex-auto hidden w-full md:w-1/6  md:block mr-2">
              <div className="flex flex-row align-center justify-between md:flex-col  ">
                <CategoryContainer sort={sort} sortOrder={sortOrder}/>
              </div>
            </div>
          
            <div className='flex-auto w-full md:w-3/6 ml-2'>
              <ShopList sort={sort} sortOrder={sortOrder}/>
            </div>
          </div>


      </section>
      <ModalFilter  sort={sort} sortOrder={sortOrder} isOpen={isOpen} onClose={handleCloseModal}/>
    </div>
  )
}

export default Shop
