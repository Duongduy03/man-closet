'use client'
import Breadcrumb from '@/components/breadcrumb'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const PageContact = () => {
  return (
    <div>
    <section>
        <Breadcrumb />
      </section>
      <div className="section_container my-5 mx-auto md:px-6">
  <section className="mb-6">
    <div className="hidden md:block relative rounded h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://file.hstatic.net/200000321971/article/banner-thoi-trang-nam_67798f164e8a4369b257a4013808ff34_1024x1024.jpg')]"></div>
    <div className="container px-6 md:px-12">
      <div
        className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
        <div className="">
          <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
           
          </div>
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
            <div className="md:flex ">
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                <div className="flex items-start">
                  <div className="shrink-0">
                  <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                      stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                  </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold dark:text-white">
                      Địa chỉ Email
                    </p>
                   
                    <p className="text-neutral-500 dark:text-neutral-200">
                     ductaph28316@fpt.edu.vn
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-12 ml-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                <div className="flex items-start">
                  <div className="shrink-0">
                  <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
              stroke="currentColor" className="mx-auto mb-6 h-8 w-8 text-primary dark:text-primary-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
                  </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold dark:text-white">
                      Trụ Sở Chính
                    </p>
                    <p className="text-neutral-500  dark:text-neutral-200">
                    Phố Trịnh Văn Bô , Phường Phương Canh , quận Từ Liêm
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                <div className="align-start flex">
                <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                      stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                    </svg>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold dark:text-white">Số điện thoại</p>
                    <p className="text-neutral-500 dark:text-neutral-200">
                      0325587305
                    </p>
                    
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

<div className='mb-5 font-bold flex '>
  <h3>Địa chỉ cửa hàng</h3>
  <hr  className='w-200px h-10' />
</div>
<div id="map" className= "rounded relative h-[400px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
    <iframe
    className='rounded'
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8353521255826!2d105.72923707433914!3d21.03927298741918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345550b525aa03%3A0x3fdefc40f69a023a!2zQ2FvIMSR4bqzbmcgRlBUIFBo4buRIFRy4buLbmggVsSDbiBCw7QgLCBQaMaw4budbmcgUGjGsMahbmcgQ2FuaCAsIHF14bqtbiBU4burIExpw6pt!5e0!3m2!1svi!2s!4v1703000867309!5m2!1svi!2s" 
      width="100%" height="650" style={{border: 0}} allowFullScreen loading="lazy"></iframe>
  </div>

</div>
</div>
  )
}

export default PageContact
