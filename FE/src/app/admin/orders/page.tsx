import { ManagementOrder } from '@/components/admin/pageComponents/orders'
import OrderManager from '@/components/admin/pageComponents/orders/OrderManager'
import React from 'react'

const Orders = () => {
    return (
        <div className="pb-6 section_container">
            <OrderManager/>
        </div>
    )
}

export default Orders