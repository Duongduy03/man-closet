'use client'
import { Button } from '@/components/ui/button';
import React, { ChangeEvent, useState } from 'react'
import ProductDeleted from './products/ProductDeleted';
import CategoryDeleted from './categories/CategoryDeleted';
import UserDeleted from './user/UserDeleted';

const ManagementTrash = () => {
    const [key,setKey] = useState<string>('')
    const handleChangeSelect = (e: any) => {
        setKey(e.target.value)
     
    }
    
    
  return (
    <div>
      <div className="relative overflow-x-auto">
        <section>
          <div>
            <h1 className="font-bold text-xl pt-6 pb-6 dark:text-black">
              Quản lý thùng rác
            </h1>
          </div>
          <div className="font-bold text-xl pb-6">
          <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChangeSelect}
        >
          <option value="">Chọn</option>
          <option value="product">Sản phẩm</option>
          <option value="category">Danh mục</option>
          <option value="user">Người dùng</option>
        
        </select>
          </div>
          {
            key === "product" ? (<ProductDeleted/>) : key === "category" ? (<CategoryDeleted/>) : key === "user" ? (<UserDeleted/>) : (<div className="flex h-[500px] align-center justify-center items-center bg-white">
            Không có dữ liệu <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-5 pl-2" width="100" height="100" viewBox="0 0 48 48">
              <path d="M 8.5 8 C 6.019 8 4 10.019 4 12.5 L 4 18 L 16.052734 18 C 16.636734 18 17.202344 17.793922 17.652344 17.419922 L 23.5 12.546875 L 19.572266 9.2734375 C 18.586266 8.4524375 17.336734 8 16.052734 8 L 8.5 8 z M 27.644531 13 L 19.572266 19.724609 C 18.585266 20.546609 17.336734 21 16.052734 21 L 4 21 L 4 35.5 C 4 37.981 6.019 40 8.5 40 L 39.5 40 C 41.981 40 44 37.981 44 35.5 L 44 17.5 C 44 15.019 41.981 13 39.5 13 L 27.644531 13 z"></path>
            </svg>
          </div>)
          }
         
        </section>
        
   
      </div>
    

   

    </div>
  );
}

export default ManagementTrash