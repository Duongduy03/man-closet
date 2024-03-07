"use client";
import { Button } from "@/components/ui/button";
import { createPro, deletePro, getAll, getAllProductDeleted, moveToTrashProduct, restoreProduct, updatePro } from "@/services/products/products";
import React, { useEffect, useRef, useState } from "react";
import { Fragment_Mono } from "next/font/google";
import Link from "next/link";
// import ModalUpdate from './ModalUpdate'
import { IProduct } from '@/interfaces/product'
import { v4 as uuidv4 } from 'uuid'
import Toaster from "@/components/Toaster/Toaster";
import Pagination from "@/components/pagination/Pagination";
import Modal from "@/components/modal/Modal";
import ModalDetail from "./ModalDetail";
import ConfirmModal from "@/components/modal/confirmModal/ConfirmModal";
const ProductDeleted = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [productsAll, setProductsAll] = useState<IProduct[]>([])
    const [showModal, setshowModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState<any>({})
    const toasterRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [key, setKey] = useState<string>('');
    const [action,setAction] = useState("");
    const [limit,setLimit] = useState<number>(10);
    // useEffect(() => {
    //     getAll().then(({ data }: any) => setProducts(data))
    // }, [])
    useEffect(() => {
        fetchData(currentPage)
        fetchData(0)
    }, []);
    const fetchData = async (currentPage: number) => {
        if (currentPage !== 0) {
            const response:any = await getAllProductDeleted(currentPage);
            if (response) {              
                setProducts(response.data.items)
                setTotalPages(response.data.totalPage)
                // console.log('page', data);
            } else {
            }
        } else {
            const response :any= await getAllProductDeleted(currentPage);
            if (response) {
               
              setProductsAll(response.data.items)
           
            } else {

            }
        }


    };
    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        fetchData(page)
    }
    const search = async () => {
        if (!key) {
            await fetchData(currentPage)

        } else {
            await fetchData(0)
            // console.log(categoriesAll);
            const regex = new RegExp(key, 'i');
            const temp = await productsAll
            let resultSearch = await temp.filter((c: IProduct) => {
                // Chuyển chuỗi `key` và tên danh mục thành chữ thường và tách thành mảng từ
                const keyWords = key.toLowerCase().split(' ');
                const productsWords = c.productName.toLowerCase().split(' ')
                // Kiểm tra xem có ít nhất một từ trong `keyWords` tồn tại trong `productsWords`
                return keyWords.some((word) => productsWords.some((productsWord) => productsWord.includes(word)));
                // regex.test(c.name)
            }

            );
            // console.log(resultSearch);

            setProducts(resultSearch);
            // fetchData(currentPage)
        }
    }

    const handleChange = (e: any) => {
        setKey(e.target.value)
    }
    const onhandleRemove = async (id: string) => {
      setIsOpen(true);
      setAction("delete")
      if (isOpen) {
        const remove = await deletePro(id);
        if(remove){
          toasterRef.current.showToast("success", "Xóa vĩnh viễn thành công");
          const updateProducts = products.filter((c) => c._id !== id)
            setProducts(
              updateProducts
            );
            const totalPage = Number((+products.length / limit).toFixed(0))
            setTotalPages(totalPage)
            setIsOpen(false)
        }
      }

        // await deletePro(id)

    }
    const handleRestore = async (id:string) => {
      setIsOpen(true);
      setAction("restore")
      if(isOpen) {
        const restore = await restoreProduct(id);
        if(restore){
          toasterRef.current.showToast("success", "Phục hổi thành công");
          const updateCategories = products.filter((c) => c._id !== id)
          console.log(updateCategories);
          
          setProducts(
            updateCategories
          );
          const totalPage = Number((+products.length / limit).toFixed(0))
          setTotalPages(totalPage)
          setIsOpen(false)
        }
      }
    } 


   
    return (
        <div>
            <div className="overflow-x-auto">
            <h1 className="font-bold text-xl pt-6 pb-6 dark:text-black">
             Sản phẩm  
            </h1>
                <div className="font-bold text-xl pb-6">
                    <div className="w-full md:w-1/2">

                        <div className="flex items-center">
                            <label htmlFor="voice-search" className="sr-only">Tìm kiếm</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                                    </svg>
                                </div>
                                <input  onChange={handleChange}  type="search" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm..."  />
                                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                                    </svg>
                                </button>
                            </div>
                            <button onClick={() => search()} type="button" className="inline-flex w-[20%] items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>Tìm kiếm
                            </button>
                        </div>

                    </div>
                   
                </div>
                <table className="w-full text-sm text-left table-auto text-gray-500 dark:text-gray-400">
                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">STT</th>
                            <th scope="col" className="p-4">Tên sản phẩm</th>
                            <th scope="col" className="p-4">Giá</th>
                            <th scope="col" className="p-4">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length !== 0 ? products.map((data: IProduct, index: number) => {
                            return (
                                <tr key={index} className="border-b bg-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-4 w-4">

                                        <div className="flex items-center">
                                            {index + 1}
                                        </div>
                                    </td>

                                    <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                        <div className="flex items-center mr-3">
                                            {data?.productName}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{data?.price}</span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center space-x-4">
                                        <button
                                          type="button"
                                          onClick={() => { handleRestore(data._id), setProduct(data._id); }}
                                          data-drawer-show="drawer-update-product"
                                          aria-controls="drawer-update-product"
                                          className="py-2 px-3 flex items-center text-sm font-medium text-center bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                        <svg   className="h-4 w-4 mr-2 -ml-0.5" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>
                                          Khôi phục
                                       </button>
                                            <button onClick={() => { setshowModal(true); setProduct(data._id) }} type="button" data-drawer-target="drawer-read-product-advanced" data-drawer-show="drawer-read-product-advanced" aria-controls="drawer-read-product-advanced" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
                                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
                                                </svg>
                                                Chi tiết
                                            </button>
                                            <button onClick={() => {onhandleRemove(data._id), setProduct(data._id)}} type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Xóa 
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            )
                        }):(<tr>
                          <td colSpan={4} className=" p-4  text-center bg-white  ">
                            <div className="flex align-center justify-center ">
                              Không có dữ liệu <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-5 pl-2" width="100" height="100" viewBox="0 0 48 48">
                                <path d="M 8.5 8 C 6.019 8 4 10.019 4 12.5 L 4 18 L 16.052734 18 C 16.636734 18 17.202344 17.793922 17.652344 17.419922 L 23.5 12.546875 L 19.572266 9.2734375 C 18.586266 8.4524375 17.336734 8 16.052734 8 L 8.5 8 z M 27.644531 13 L 19.572266 19.724609 C 18.585266 20.546609 17.336734 21 16.052734 21 L 4 21 L 4 35.5 C 4 37.981 6.019 40 8.5 40 L 39.5 40 C 41.981 40 44 37.981 44 35.5 L 44 17.5 C 44 15.019 41.981 13 39.5 13 L 27.644531 13 z"></path>
                              </svg>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>

                </table>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage} />
            </div>
            <Toaster ref={toasterRef} />
            {showModal &&  (
              <Modal isOpen={showModal} handleClose={() => setshowModal(false)}>
              <ModalDetail id={product} onClose={() => setshowModal(false)} />
              </Modal>
            )}
             {isOpen && action == "delete" && (
        <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <ConfirmModal titleSubmit="Xóa" title="Xóa sản phẩm" text="Bạn có chắc muốn xóa?" onClose={() => setIsOpen(false)} onHandle={onhandleRemove} id={product} >
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
          <ConfirmModal titleSubmit="Phục hổi" title="Phục hồi sản phẩm" text="Bạn có chắc muốn phục hổi?" onClose={() => setIsOpen(false)} onHandle={handleRestore} id={product} >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                <svg  className="w-12 h-16 flex items-center text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="currentColor"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>

          </ConfirmModal>
        </Modal>

      )}
           

           
          
           

        </div>
    )
}

export default ProductDeleted;