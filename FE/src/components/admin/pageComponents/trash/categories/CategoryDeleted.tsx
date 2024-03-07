"use client";
import { ICategory } from "@/interfaces/category";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getAllDeletedCategory,
  moveToTrashCategory,
  restoreCategory,
  updateCategory,
} from "@/services/categories/category";
import React, { useEffect, useRef, useState } from "react";

import Toaster from "@/components/Toaster/Toaster";
import Pagination from "@/components/pagination/Pagination";

import ConfirmModal from "@/components/modal/confirmModal/ConfirmModal";
import Modal from "@/components/modal/Modal";
import SearchCategory from "../../categories/SearchCategory";
import ModelCategory from "../../categories/ModelCategory";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CategoryDeleted = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesAll, setCategoriesAll] = useState<ICategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [action,setAction] = useState("");
  const [limit,setLimit] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [category, setCategory] = useState<any>();
  const [key, setKey] = useState<string>('');
  const toasterRef = useRef<any>(null);
  useEffect(() => {
    fetchDataAll(0)
    fetchData(currentPage)
  
  }, []);
  const fetchDataAll = async (currentPage: number) => {
    const response = await getAllDeletedCategory(currentPage);
    if (response) {
    
      setCategoriesAll(response.data.items)
    }
  }
  const fetchData = async (currentPage: number) => {
    if (currentPage !== 0) {
      const response = await getAllDeletedCategory(currentPage);
      if (response) { 
        setCategories(response.data.items)
        setTotalPages(response.data.totalPage)
       
     
      }
    }
  };



  const handleDelete =async (id: string | undefined) => {

    setIsOpen(true);
    setAction("delete")
    if (isOpen) {
      try {
        const remove = await deleteCategory(id);
        if(remove){
          toasterRef.current.showToast("success", "Xóa vĩnh viễn thành công");
          const updateCategories = categories.filter((c) => c._id !== id)
            setCategories(
              updateCategories
            );
            const totalPage = Number((+categories.length / limit).toFixed(0))
            setTotalPages(totalPage)
            setIsOpen(false)
        }
      } catch (error:any) {
        console.log(error);
        
        toasterRef.current.showToast("error", error.response.data.message);
      }
   
    }
  };
  const handleRestore = async (id: string | undefined) => {
    setIsOpen(true);
    setAction("restore")
    if(isOpen) {
      const restore = await restoreCategory(id);
      if(restore){
        toasterRef.current.showToast("success", "Phục hổi thành công");
        const updateCategories = categories.filter((c) => c._id !== id)
        setCategories(
          updateCategories
        );
        const totalPage = Number((+categories.length / limit).toFixed(0))
        setTotalPages(totalPage)
        setIsOpen(false)
      }
    }
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
    fetchData(page)
  }



  const search = async () => {
    if (!key) {
      await fetchData(currentPage)

    } else {

      // console.log(categoriesAll);
      const regex = new RegExp(key, 'i');
      const temp = await categoriesAll
      let resultSearch = await temp.filter((c: ICategory) => {
        // Chuyển chuỗi `key` và tên danh mục thành chữ thường và tách thành mảng từ
        const keyWords = key.toLowerCase().split(' ');
        const categoryWords = c.name.toLowerCase().split(' ')
        // Kiểm tra xem có ít nhất một từ trong `keyWords` tồn tại trong `categoryWords`
        return keyWords.some((word) => categoryWords.some((categoryWord) => categoryWord.includes(word)));
        // regex.test(c.name)
      });

      setTotalPages(1)
      setCategories(resultSearch);

    }

  }

  const handleChange = (e: any) => {
    setKey(e.target.value)
  }

  return (
    <div>
      <div className="relative overflow-x-auto">

        <section>
          <div>
            <h1 className="font-bold text-xl pt-6 pb-6 dark:text-black">
             Danh mục 
            </h1>
          </div>
          <div className="font-bold text-xl pb-6">
            <SearchCategory onHandleChange={handleChange} onSearch={search} />
          </div>
        </section>
        <table className="w-full  table text-sm text-left table-auto text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                 Tên danh mục
              </th>

              <th scope="col" className="px-6 py-3 overflow-x-auto ">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>

            {categories.length !== 0 ? categories.map((cate, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{cate.name}</td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center space-x-4">
                    
                    <button
                        type="button"
                        onClick={() => { handleRestore(cate._id), setCategory(cate); }}
                        data-drawer-show="drawer-update-product"
                        aria-controls="drawer-update-product"
                        className="py-2 px-3 flex items-center text-sm font-medium text-center bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                       <svg   className="h-4 w-4 mr-2 -ml-0.5" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>
                        Khôi phục
                      </button>
                      <button
                        type="button"
                        onClick={() => { handleDelete(cate._id), setCategory(cate); }}
                        data-modal-target="delete-modal"
                        data-modal-toggle="delete-modal"
                        className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 -ml-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={3} className=" p-4  text-center bg-white  ">
                  <div className="flex align-center justify-center ">
                    Không có dữ liệu <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-5 pl-2" width="100" height="100" viewBox="0 0 48 48">
                      <path d="M 8.5 8 C 6.019 8 4 10.019 4 12.5 L 4 18 L 16.052734 18 C 16.636734 18 17.202344 17.793922 17.652344 17.419922 L 23.5 12.546875 L 19.572266 9.2734375 C 18.586266 8.4524375 17.336734 8 16.052734 8 L 8.5 8 z M 27.644531 13 L 19.572266 19.724609 C 18.585266 20.546609 17.336734 21 16.052734 21 L 4 21 L 4 35.5 C 4 37.981 6.019 40 8.5 40 L 39.5 40 C 41.981 40 44 37.981 44 35.5 L 44 17.5 C 44 15.019 41.981 13 39.5 13 L 27.644531 13 z"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage} />
      </div>
      <Toaster ref={toasterRef} />
     

      {isOpen && action == "delete" && (
        <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <ConfirmModal titleSubmit="Xóa" title="Xóa danh mục" text="Bạn có chắc muốn xóa?" onClose={() => setIsOpen(false)} onHandle={handleDelete} id={category._id} >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
          </ConfirmModal>
        </Modal>

      )}
      {isOpen && action == "restore" && (
        <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <ConfirmModal titleSubmit="Phục hổi" title="Phục hồi danh mục" text="Bạn có chắc muốn phục hổi?" onClose={() => setIsOpen(false)} onHandle={handleRestore} id={category._id} >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                <svg  className="w-12 h-16 flex items-center text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="currentColor"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>

          </ConfirmModal>
        </Modal>

      )}

    </div>
  );
};

export default CategoryDeleted;
