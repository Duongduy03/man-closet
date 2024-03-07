import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Information = () => {
    return (
        <div>
            <form className="justify-cente md:w-[800px] mx-auto py-24" method="post" >
                <div className='pb-12'>
                    <div className='md:flex flex-row pb-8'>
                        <p className='text-start text-2xl'>Contact Information</p>
                        <a href="" className='md:ml-[350px] text-xs'>Already have an account?Log in</a>
                    </div>
                    <div className='pb-6'>
                        <input
                            placeholder="Email or mobile phone number"
                            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 dark:border-b dark:border-white"
                        />
                    </div>
                    <div className='flex items-center mb-4'>
                        <input type="checkbox" />
                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Shipping & taxes calculated at checkout</label>
                    </div>
                </div>


                <div className='pb-2'>
                    <p className='text-2xl'>Shipping Address</p>
                </div>
                <div className="">
                    <div className="space-x-0 lg:flex lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                            <label form="firstName" className="block mb-3 text-sm font-semibold text-gray-500">First
                                Name</label>
                            <input name="firstName" type="text" placeholder="First Name"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="w-full lg:w-1/2 ">
                            <label form="firstName" className="block mb-3 text-sm font-semibold text-gray-500">Last
                                Name</label>
                            <input name="Last Name" type="text" placeholder="Last Name"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full">
                            <label form="Email"
                                className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                            <input name="Last Name" type="text" placeholder="Email"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full">
                            <label form="Address"
                                className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                            <textarea
                                className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="Address" cols={20} rows={4} placeholder="Address"></textarea>
                        </div>
                    </div>
                    <div className="space-x-0 lg:flex lg:space-x-4">
                        <div className="w-full lg:w-1/2">
                            <label form="city"
                                className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                            <input name="city" type="text" placeholder="City"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="w-full lg:w-1/2 ">
                            <label form="postcode" className="block mb-3 text-sm font-semibold text-gray-500">
                                Postcode</label>
                            <input name="postcode" type="text" placeholder="Post Code"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <label className="flex items-center text-sm group text-heading">
                            <input type="checkbox"
                                className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1" />
                            <span className="ml-2">Save this information form next time</span></label>
                    </div>
                    <div className="relative pt-3 xl:pt-6"><label form="note"
                        className="block mb-3 text-sm font-semibold text-gray-500"> Notes
                        (Optional)</label><textarea name="note"
                            className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                            rows={4} placeholder="Notes form delivery"></textarea>
                    </div>
                    <div className="mt-4">
                        <Button variant={'primary'}
                            className="justify-start  px-6 py-2  ">Continue Shipping</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Information
