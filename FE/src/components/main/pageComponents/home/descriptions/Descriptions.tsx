'use client'
import { getById } from '@/services/products/products';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Descriptions = () => {
  const { productId } = useParams<any>();
  // console.log(productId);



  const [detail, setDetail] = useState<any>({});
  useEffect(() => {
      getById(productId).then(({ data }:any) => setDetail(data.data))
  }, [])
  return (
    <div className='py-8 bg-gray-100  dark:dark:bg-zinc-900  '>
      <div className='px-6'>
      <p className='text-2xl '>Varius tempor.</p>
      <p className='text-sm w-full pt-4'>Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</p>
      <p  className='text-2xl py  -4'>More details</p>
      <div>
      <p className='text-sm w-full'>{detail?.description}</p>
      </div>
      </div>
      
    </div>
  )
}

export default Descriptions
