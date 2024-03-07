import React, { ReactNode, useState } from 'react'
import "./confirm.scss"
import * as Constants from "@/common/Constants"
interface IConfirm{
  id:string,
  onClose:() => void,
  onHandle: (id:string) => void;
  title?:string,
  titleSubmit?:string,
  text?:string,
  children?:ReactNode

}
const ConfirmModal = ({onHandle,onClose,id,titleSubmit,text,title,children}:IConfirm) => {
 
  return (
    <div >
        
<div className="min-w-screen  p-6 h-screen animated fadeIn faster fixed left-0 top-0 pt-5 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
   	<div className="absolute inset-0 z-0"></div>
    <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
     
      <div className="">
        <div className="text-center p-5 flex-auto justify-center">
                {children}
                        <h2 className="text-xl font-bold py-4 ">{title}</h2>
                        <p className="text-sm text-gray-500 px-8">{text}</p>    
        </div>

        <div className="p-3  mt-2 text-center md:block">
            <button onClick={() => onClose()} className="mb-2 md:mb-0 m-2 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancel
            </button>
            <button onClick={() => onHandle(id)} className="mb-2 md:mb-0 bg-red-500 m-2 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">{titleSubmit}</button>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default ConfirmModal