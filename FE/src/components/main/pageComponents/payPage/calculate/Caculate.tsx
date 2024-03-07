"use cilent"
import { Button } from '@/components/ui/button'
import React from 'react'

const Caculate = () => {
  return (
    <div>
       <div className="flex flex-col w-full  h-fit gap-4 p-4">
        <p className="text-blue-900 text-xl font-extrabold">Caculate Shopping</p>
        <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
            <div className=" flex-row justify-between">
                <p className="text-gray-600">Bangladesh</p>              
            </div>
            <hr className="bg-gray-200 h-0.5" />
            <div className=" flex-row justify-between">
                <p className="text-gray-600">Mirpur Dhaka - 1200</p>
            </div>
            <hr className="bg-gray-200 h-0.5" />
            <div className=" flex-row justify-between">
                <p className="text-gray-600">Postal Code</p>              
            </div>
            <hr className="bg-gray-200 h-0.5" />
            <div className="flex gap-2">
                <Button variant={'primary'} className="transition-colors text-sm p-2 rounded-sm w-full text-white text-hover shadow-md">
                Calculate Shiping
                </Button>

            </div>
        </div>
    </div>
    </div>
  )
}

export default Caculate
