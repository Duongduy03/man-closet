'use client'
import { getBillByUser } from '@/services/order/order';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/pagination/Pagination';
import { IBill } from '@/interfaces/bill';
import Modal from '@/components/modal/Modal';
import ModalExport from './exportBill/ModalExport';
'@/data/category';
const Purchase = () => {
    const [bill,setBill] = useState<IBill[]>([])
    const [bills,setBills] = useState<IBill[]>([])
    const [user,setUser] = useState<any>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [totalPages,setTotalPages] = useState<number>(1)
  
    console.log(bills);
    
    const users = JSON.parse(localStorage.getItem('user') as string);
    
    useEffect(() => {
            fetchData(currentPage);
            fetchData(0);
            setUser(users)
        },[])
        const fetchData = async (page:number) => {
            if(page == 0){
                const response:any = await getBillByUser(users._id,page);
                await setBills(response.data)
                // await setCurrentPage(response.paginate.currentPage)
                // await setTotalPages(response.paginate.totalPages)
            }else{
                const response:any = await getBillByUser(users._id,page);
                await setBill(response.data)
                await setCurrentPage(response.paginate.currentPage)
                await setTotalPages(response.paginate.totalPages)
           
                 console.log(response.data);
            }
   
            
        } 
    

    const handleChangePage = (page:number) => {
        setCurrentPage(page)
        fetchData(page)
      }
     
    
    const handleClick = async () => {
       
            const data = await bills.filter((bill:any) => bill.history_order_status[0].status === "Đang xử lý")
            await setBill(data)
             await setTotalPages(1)
    }
    const handleClickSuccess = async  () => {
      
      
        const data = await bills.filter((bill:any) => bill.history_order_status[0].status === "Đã thanh toán")
        await setBill(data);
        await setTotalPages(1)
    }
    const handleClickCancel = async () => {
     
        const data = await bills.filter((bill:any) => bill.history_order_status[0].status === "Đã hủy")
        await setBill(data)
         await setTotalPages(1)
    }
    const handlePayNotSuccess = async () => {
  
        const data = await bills.filter((bill:any) => bill.history_order_status[0].status === "Chưa thanh toán")
        await setBill(data)
         await setTotalPages(1)
    }

  
   
  return (
    <div className="py-14 px-4">
    <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order history</h1>
        <p className="text-base font-medium leading-6 text-gray-600">Check the status of recent orders, manage returns, and download invoices.</p>
    </div>
    <div className="flex flex-col md:flex-row gap-2 justify-between p-4">
                <div className="flex flex-col md:flex-row gap-2">
                  <Button
                    onClick={() => handleClick()}
                    variant={"bordered"}
                  >
                    Đang xử lý
                  </Button>
                  <Button
                  onClick={() => handleClickSuccess()}
                    variant={"bordered"}
                  >
                   Đã thanh toán thành công
                  </Button>
                  <Button
                  onClick={() => handlePayNotSuccess()}
                  variant={"bordered"}
                  >
                   Chưa thanh toán
                  </Button>
                  <Button onClick={() => handleClickCancel()}     variant={"bordered"}>
                  Đã hủy
                </Button>
                </div>
             
              </div>
    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full space-y-4 md:space-y-6 xl:space-y-0">

       
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
        {bill.map((bills:any,index:number) => {
        return ( 
                    <div key={index} className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Recent orders</p>

                                    {bills.items.map((item:any,index:number) => {
                                        return (
                                            <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                        
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <img className="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
                                                <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">Premium Quaility Dress</h3>
                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Style: </span> Italic Minimal Design
                                                        </p>
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Size: </span> {item.property.size}
                                                        </p>
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Color: </span>  {item.property.color}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base xl:text-lg leading-6">
                                                        $36.00 <span className="text-red-300 line-through"> $45.00</span>
                                                    </p>
                                                    <p className="text-base xl:text-lg leading-6 text-gray-800">{item.property.quantity}</p>
                                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">{item.sub_total}</p>
                                                  <Button variant={"danger_border"}>
                                                    Xóa
                                                  </Button>
                                                
                                                 
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                        )
                                    })}
                    <div className="flex justify-between align-center ">

                                                {
                                                    bill[0].history_order_status[0].status === "Chưa thanh toán" ? <Button className='mr-2' variant={"primary"}>Tiếp tục thanh toán</Button>: ""
                                                  }
                                                    {
                                                    bill[0].history_order_status[0].status === "Chưa thanh toán" ? <Button variant={"danger_border"}>Hủy</Button>: ""
                                                  }
                                                 
                    </div>
                                             
               
                </div>
                
      
        )
       })}
    <div className="flex justify-end right-0 w-full">
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handleChangePage}/>
    </div>
       
   
     
          
      
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                        <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                        <div className=" flex justify-start items-start flex-col space-y-2">
                            <p className="text-base font-semibold leading-4 text-left text-gray-800">{user.name}</p>
                            <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p>
                        </div>
                    </div>

                    <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="cursor-pointer text-sm leading-5 text-gray-800">{user.email}</p>
                    </div>
                </div>
                <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{bill[0]?.shipping_address}</p>
                        </div>
                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    </div>
  

  
   
</div>
  )
}

export default Purchase