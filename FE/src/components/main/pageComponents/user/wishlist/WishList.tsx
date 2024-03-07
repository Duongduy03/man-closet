'use client'
import Modal from '@/components/modal/Modal';
import ConfirmModal from '@/components/modal/confirmModal/ConfirmModal';
import Pagination from '@/components/pagination/Pagination';
import { useUserInfo } from '@/hooks';
import { addRemoveWishList, getListWishListByUserId } from '@/services/auth/auth';
import { commonErrorToast, commonSuccessToast } from '@/utils/notify';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


interface IWL{
  _id:string,
  name:string,
  imageUrl:string,
  price:number
}
const WishList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [wishlists,setWishlists] = useState<IWL[]>([]);
  const [isOpen,setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string)
  const [id,setId] = useState("")
  
  useEffect(() => {
    fetchData()
  },[])
  const fetchData = async () => {
    try {
      const getAllWishlists:any = await getListWishListByUserId(user._id,currentPage)
    console.log(getAllWishlists);
    if(getAllWishlists){
      setWishlists(getAllWishlists.wishList)
    }    
    } catch (error) {
      
    }
    
  }
  const handleChangePage = (page: number) => {
    setCurrentPage(page)
    
  }
  const handleDelete = async (id:string) => {
    try {
      setIsOpen(true)
      if(isOpen){
        const data = {
          _id : id
        }
        const rm = await addRemoveWishList(data);
        if(rm){
          const updateWishlist = wishlists.filter((wl) => wl._id !== id)
          setWishlists(updateWishlist)
          commonSuccessToast("Xóa thành công")
          setIsOpen(false)
        }
      }
    } catch (error:any) {
      commonErrorToast(`${error.response.data.message}`)
    }
   
    
  }

  return (
    <div className="relative overflow-x-auto">

        <section>
          <div>
            <h1 className="font-bold text-xl pt-6 pb-6 dark:text-black">
              Danh sách yêu thích
            </h1>
          </div>
         
        </section>
        <table className="w-full  table text-sm text-left table-auto text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                 Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                 Ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                 Giá
              </th>

              <th scope="col" className="px-6 py-3 overflow-x-auto ">
                
              </th>
            </tr>
          </thead>
          <tbody>

            {wishlists.length !== 0 ? wishlists.map((wl:IWL, index) => {
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
                  <td className="px-6 py-4">{wl.name}</td>
                  <td className="px-6 py-4">
                    <Image src={wl.imageUrl} alt='ảnh' width={50} height={50}/>
                    
                    </td>
                  <td className="px-6 py-4">{wl.price}</td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center space-x-4">
                     

                      <button
                        type="button"
                      onClick={() => {handleDelete(wl._id) , setId(wl._id)}}
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
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={5} className=" p-4  text-center bg-white  ">
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
        {isOpen && (
        <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <ConfirmModal onClose={() => setIsOpen(false)} onHandle={handleDelete} id={id} titleSubmit="Xóa" text="Bạn có chắc muốn xóa?" title="Xóa yêu thích">
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
  )
}

export default WishList