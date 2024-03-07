import React from 'react'

const LineSkeleton = () => {
  return (
    <>
      <article className='flex flex-col gap-2'>
        <span className='bg-zinc-50 rounded-lg block w-[40vh] h-[30px]'></span>
        <span className='bg-zinc-50 rounded-lg block w-[70vh] h-[30px]'></span>
        <span className='bg-zinc-50 rounded-lg block w-[50vh] h-[30px]'></span>
      </article>
    </>
  )
}

export default LineSkeleton