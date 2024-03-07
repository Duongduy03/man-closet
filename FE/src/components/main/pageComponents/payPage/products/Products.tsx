import React from 'react'

const Products = ({ data }: any) => {
    return (
        <div className="flex flex-col gap-2 items-center  pt-24">
            {data.map((item: any) => (
                <div className='flex border-b-2 '>
                    <div className="w-[140px] h-[90px] ">
                        <img className="w-full h-full " src={item.imageUrl} />
                    </div>
                    <div className="  gap-1 ml-4">
                        <p className="text-xs md:mr-[100px] text-gray-600 font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-600 font-semibold">Color: <span className="font-normal">Black + Zinc</span></p>
                        <p className="text-xs text-gray-600 font-semibold">Size: <span className="font-normal">42</span></p>
                    </div>
                    <div>
                    <p className="text-gray-600 font-normal text-sm ">$49.99</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Products
