"use client"

import React, { useMemo } from 'react'
import OrderManagerListItem from './OrderManagerListItem'
import { IBill } from '@/interfaces/bill'
import { cloneDeep } from 'lodash'
import {v4 as uuidv4} from "uuid"

type Props = {
  data: IBill[]
}
const OrderManagerList = ({data} : Props) => {
  const tableHeaderData = useMemo(() => [
    "Khách hàng",
    "TT thanh toán",
    "TT đơn hàng",
    "Ngày tạo đơn",
    "Chức năng"
  ], [])

  const orders = useMemo(() => {
    return cloneDeep(data)
  }, [data])

  return (
    <>
      <div className='bg-white rounded  p-3'>
        <ul className='flex items-centre py-2 border-b'>
          {
            tableHeaderData.map((item, index) => {
              return <li key={index} className='flex-[1]'>{item}</li>
            })
          }
        </ul>
        <ul className='min-h-[40vh] pt-2 flex flex-col gap-2'>
          {
            orders?.reverse()?.map(item => (
              <OrderManagerListItem key={uuidv4()} data={item}/>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default OrderManagerList