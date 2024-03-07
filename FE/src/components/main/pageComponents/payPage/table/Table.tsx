"use client";
import React from 'react'
import Image from 'next/image'
import { ProductCarousel } from '../../home';
import { Button } from '@/components/ui/button';
interface Data {
    href: string;
    imageUrl: string;
    name: string;
    price: number;
}

interface ProductCarouselProps {
    title: string;
    data: Data[];
}

const Table = ({ data }: any) => {
    console.log(data);

    return (

        <section className="flex flex-col md:flex-row w-full h-full px-14 py-7">

            {/* My Cart */}
            <div className="w-full flex flex-col h-fit gap-4 p-2 ">
                <p className="text-gray-600 text-xl font-extrabold">My cart</p>
                {/*  Product */}
                {data.map((item: any) => (
                    <div className="md:flex md:flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
                        <div className="flex flex-col md:flex-row gap-2 justify-between">
                            {/*  Product Information  */}
                            <div className="flex flex-row gap-6 items-center">
                                <div className="w-[130px] h-[90px] ">
                                    <img className="w-full h-full " src={item.imageUrl} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm md:mr-[100px] text-gray-600 font-semibold">{item.name}</p>
                                    <p className="text-xs text-gray-600 font-semibold">Color: <span className="font-normal">Black + Zinc</span></p>
                                    <p className="text-xs text-gray-600 font-semibold">Size: <span className="font-normal">42</span></p>
                                    <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 ">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Price Information --> */}
                            <div className="self-center text-center md:mr-[50px]">

                                <p className="text-gray-600 font-normal text-xl ">$49.99</p>
                            </div>



                            {/* <!-- Product Quantity --> */}
                            <div className="flex flex-row self-center gap-1 md:mr-[20px]">
                                <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                                <input type="text" value="1" className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm" />
                                <button className="w-5 h-5 self-center rounded-full border border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className="self-center text-center">

                                <p className="text-gray-600 font-normal text-xl ">$49.99</p>
                            </div>
                        </div>

                    </div>
                ))}
                <div className='md:flex  gap-[400px]'>
                    <Button variant={'primary'} className='w-full mb-2'>Update Curt</Button>
                    <Button variant={'primary'} className='w-full' >Clear Curt</Button>
                </div>

            </div>
        </section>
    )
}

export default Table
