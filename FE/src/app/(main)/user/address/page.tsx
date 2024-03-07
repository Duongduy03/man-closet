import { AddressList, AddressPageHeader } from '@/components/main/pageComponents/user/addressPage'
import React from 'react'

const AddressPage = () => {
  return (
    <>
      <section>
        <AddressPageHeader/>
      </section>
      <section>
        <AddressList/>
      </section>
    </>
  )
}

export default AddressPage