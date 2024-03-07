import React from 'react'
import {v4 as uuidv4} from "uuid"

interface Props {
  value: string,
  label: string,
  type_address:string,
  options: {
    [key:string]: number | string | null,
  }[],
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const SelectAddress = ({value,label,options,type_address,setValue} : Props) => {

  return (
    <>
      <div className='flex flex-col justify-center pb-4'>
        <label htmlFor="select-address" className='pb-2 text-sm md:text-base text-gray-600 font-normal'>{label}</label>
        <select id="select-address" className='px-3 py-2 rounded text-sm md:text-base text-gray-800 border border-zinc-400 focus:border-zinc-800 focus:outline-none' value={value} onChange={(e) => setValue(e.target.value)}>
          <option>{`--Chọn ${label}--`}</option>
          {options?.length > 0 && options?.map(item => {
            const addressId = item[`${type_address}_id`]
            const addressName = item[`${type_address}_name`]
            return (
              <option key={uuidv4()} value={addressId as string}>{addressName}</option>
            )
          })}
        </select>
      </div>
    </>
  )
}

export default SelectAddress