"use client";
import { Button } from "@/components/ui/button";
import { getById } from "@/services/products/products";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
// import ModalUpdate from './ModalUpdate';
import { v4 as uuidv4 } from 'uuid';
const ModalShow = ({  id, onClose }: any) => {
    const productId = id;
    const [detail, setDetail] = useState<any>({});


    useEffect(() => {
        getById(productId).then(({ data }: any) => setDetail(data))
    }, [])
    console.log(detail._id);
    const imgRef = useRef<any>()
    const setImgPreview = (imageUrl: any) => {
        imgRef.current.src = imageUrl
    }
    return (
        <div className='fixed inset-0 w-[50%] m-auto backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center p-12 bg-white'>
                <div className='flex flex-col gap-6 lg:w-2/4'>
                    <img ref={imgRef} alt="" className='w-full h-80 aspect-square object-cover rounded-xl' src={detail.properties?.[0].imageUrl} />
                    <div className='flex  justify-between h-24'>
                        {detail.properties?.map((url: any) => {
                            return (
                                <a key={uuidv4()} onClick={() => setImgPreview(url?.imageUrl)}>
                                    <img alt="" className='w-24 h-24 rounded-md cursor-pointer' src={url?.imageUrl} />
                                </a>
                            )
                        })}
                    </div>
                </div>
                {/* ABOUT */}
                <form action="" className='flex flex-col gap-4 lg:w-2/4'>
                    <button className='place-self-end' onClick={() => onClose()}>X</button>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{detail.productName}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            { }
                        </p>
                        <div className=" mb-4">
                            <div className="mr-4 pb-3">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Giá:</span>
                                <span className="text-gray-600 dark:text-gray-300">{detail.price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Màu sắc:</span>
                            <div className="flex items-center mt-2">
                                {detail.properties?.map((url: any,index:number) => {
                                    return (
                                        <p  key={index} className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2" style={
                                            {
                                                backgroundColor: url?.color
                                            }
                                        }></p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Size:</span>
                            <div className="flex items-center mt-2">
                                {detail.properties?.[0].variants?.map((url: any,index:number) => {
                                    return (
                                        <p key={index} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{url?.size}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="mr-4 pb-3">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Chi tiết:</span>
                            <span className="text-gray-600 dark:text-gray-300">{detail.description}</span>
                        </div>
                        
                    </div>
                </form>
            </div>
            {/* <ModalUpdate isvisibleUpdate={modalUpdate} id={product}  onClosePro={() => setshowModalUpdate(false)}/> */}
        </div>


    );
};

export default ModalShow;
