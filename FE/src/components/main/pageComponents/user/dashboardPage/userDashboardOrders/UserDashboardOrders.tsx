import { GridView } from '@/components/dataViews'
import { FileBox, Package2, Star, Truck } from 'lucide-react'
import React from 'react'
import UserDashboardOrderItem from './UserDashboardOrderItem'
import {v4 as uuidv4} from "uuid"

const dataNav = [
  {
    icon : <FileBox className='md:w-6 md:h-6 w-5 h-5' />,
    title: "Chờ xác nhận",
    popup: 0
  },
  {
    icon : <Package2 className='md:w-6 md:h-6 w-5 h-5' />,
    title: "Chờ lấy hàng",
    popup: 0
  },
  {
    icon : <Truck className='md:w-6 md:h-6 w-5 h-5' />,
    title: "Chờ giao hàng",
    popup: 0
  },
  {
    icon : <Star className='md:w-6 md:h-6 w-5 h-5' />,
    title: "Đánh giá",
    popup: 0
  },
]

const UserDashboardOrders = () => {
  return (
    <>
      <div className='-ml-[30px] flex items-center' >
        {dataNav.map(item => (
          <UserDashboardOrderItem key={uuidv4()} icon={item.icon} title={item.title} popup={item.popup}/>
        ))}
      </div>
    </>
  )
}

export default UserDashboardOrders