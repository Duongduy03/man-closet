
import { UserDashboardHeader, UserDashboardOrders } from '@/components/main/pageComponents/user'
import React from 'react'

const UserDashBoardPage = () => {
  
  return (
    <>
      <section className='pb-5'>
        <UserDashboardHeader/>
      </section>

      <section className='py-5'>
        {/* <UserDashboardOrders/> */}
      </section>
    </>
  )
}

export default UserDashBoardPage