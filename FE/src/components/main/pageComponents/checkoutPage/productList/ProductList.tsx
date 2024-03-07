import React from 'react'
import ProductListContent from './ProductListContent'

const ProductList = () => {

  return (
    <>
      <h5 className="text-gray-800 font-semibold pb-2">Đơn hàng</h5>
      <div className='py-1'>
        <ProductListContent/>
      </div>
    </>
  )
}

export default ProductList