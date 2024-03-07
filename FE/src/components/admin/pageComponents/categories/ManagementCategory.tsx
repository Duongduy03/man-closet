"use client";
import { ICategory } from "@/interfaces/category";
import {
  addCategory,
  getAllCategory,
  moveToTrashCategory,
  updateCategory,
} from "@/services/categories/category";
import React, { useEffect, useRef, useState } from "react";
import ModelCategory from "./ModelCategory";
import Toaster from "@/components/Toaster/Toaster";
import Pagination from "@/components/pagination/Pagination";
import SearchCategory from "./SearchCategory";
import ConfirmModal from "@/components/modal/confirmModal/ConfirmModal";
import Modal from "@/components/modal/Modal";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const ManagementCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoriesAll, setCategoriesAll] = useState<ICategory[]>([]);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [category, setCategory] = useState<any>();
  const [key, setKey] = useState<string>('');
  const toasterRef = useRef<any>(null);
  useEffect(() => {
    fetchDataAll(0, Number.MAX_SAFE_INTEGER)
    fetchData(currentPage, limit)
  
  }, []);
  const fetchDataAll = async (currentPage: number, limit: number) => {
    const response = await getAllCategory(currentPage, limit);
    if (response) {
      const data: any = response;
      setCategoriesAll(data.data)
    } else {

    }
  }
  const fetchData = async (currentPage: number, limit: number) => {
    if (currentPage !== 0) {
      const response:any = await getAllCategory(currentPage, limit);
      if (response) {
       
        
        setCategories(response.data)
        setTotalPages(response.paginate.totalPages)
        setTotalItems(response.paginate.totalItems)

      } else {

      }
    }
  };



  const handleDelete =async (id: string | undefined) => {
    setIsOpen(true);
    if (isOpen) {
      try {
        const moveToTrash = await moveToTrashCategory(id);
        if(moveToTrash){
          toasterRef.current.showToast("success", "Chuyển danh mục vào thùng rác thành công");
          const updateCategories = categories.filter((c) => c._id !== id)
            setCategories(
              updateCategories
            );
            setTotalItems(categories.length)
            // setTotalPages(categories.length)
            setIsOpen(false)
        }
      } catch (error:any) {
        toasterRef.current.showToast("error", error.response.data.message);
      }
    
    }

  };
  const handleUpdate = async (category: ICategory) => {
    try {
      const updateCate = await updateCategory(category)
      // console.log(updateCate);
      
      if(updateCate){
        toasterRef.current.showToast("success", "Cập nhật danh mục thành công");
        setCategories(
          categories.map((item) =>
            item._id === category._id ? category : item
          )
        );
        setModal(false);
      }
    } catch (error : any) {
      toasterRef.current.showToast("error", `${error.response.data.message}`);      
    }
   
  };
  const handleAdd = async (category: ICategory) => {
    try {
      const addCate = await addCategory(category)
      // console.log(addCate);
      if(addCate){
        const newCategories = [...categories];
        // Thêm sản phẩm mới vào danh sách
        newCategories.push(addCate.data);
        // Cập nhật state `categories` với danh sách mới
        setCategories(newCategories);
        toasterRef.current.showToast("success", "Thêm sản phẩm thành công!");
        setModal(false);
        fetchData(currentPage, limit)
      }
    } catch (error : any) {
      toasterRef.current.showToast("error", `${error.response.data.message}`);
    }
   
  };
  const handleChangePage = (page: number) => {
    setCurrentPage(page)
    fetchData(page, limit)
  }



  const search = async () => {
    if (!key) {
      await fetchData(currentPage, limit)

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
              Quản lý danh mục sản phẩm
            </h1>
          </div>
          <div className="font-bold text-xl pb-6">
            <SearchCategory onHandleChange={handleChange} onSearch={search} />
            <button
              type="submit"
              onClick={() => {
                setModal(true);
                setCategory(false);
              }}
              className="text-white inline-flex items-center bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Thêm mới
            </button>
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
                        onClick={() => {
                          setModal(true);
                          setCategory(cate);
                        }}
                        data-drawer-show="drawer-update-product"
                        aria-controls="drawer-update-product"
                        className="py-2 px-3 flex items-center text-sm font-medium text-center bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 -ml-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Sửa
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
                        Xóa mềm
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
        <Pagination currentPage={currentPage}  totalPages={totalPages} onPageChange={handleChangePage} />
      </div>
      <Toaster ref={toasterRef} />
      <Modal isOpen={modal} handleClose={() => setModal(false)}>
        <ModelCategory

          add={handleAdd}
          update={handleUpdate}
          category={category}
          onClose={() => setModal(false)}
        />
      </Modal>

      {isOpen && (
        <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <ConfirmModal onClose={() => setIsOpen(false)} onHandle={handleDelete} id={category._id} titleSubmit="Xóa" text="Bạn có chắc muốn xóa?" title="Xóa danh mục">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
          </ConfirmModal>
        </Modal>

      )}

    </div>
  );
};

export default ManagementCategory;
