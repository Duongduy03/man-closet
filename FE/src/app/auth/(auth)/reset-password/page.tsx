'use client'

import { Input } from '@/components/form';
import React, { useState, useCallback, useRef } from 'react'
import { useForm, FieldValues, SubmitHandler, FieldErrors } from "react-hook-form";
import { Button } from '@/components/ui/button';
import Toaster from '@/components/Toaster/Toaster';
import { useParams, useRouter } from 'next/navigation';
import { resetPassword } from '@/services/user/user';
import { commonErrorToast, commonSuccessToast } from '@/utils/notify';



const ResetForm = () => {
 
    const [isLoading, setIsLoading] = useState(false);
 
    const router = useRouter();
    const resetToken = localStorage.getItem('resetToken');



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm < FieldValues > ({
        defaultValues: {
       
            password: "",
            confirmPassword: ''
        },
    });

    const displayError = (field: string) => {
        if (errors[field]) {
            return (
                <span className="text-red-600 text-sm">
                    {(errors[field] as any) && errors[field]?.message}
                </span>
            );
        }
        return null;
    };
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            const dataReset = {
                password:data.password,
                token:resetToken
            }
            const reset = await resetPassword(dataReset)   
            if(reset){
                commonSuccessToast("Đặt lại mật khẩu thành công")
                localStorage.removeItem("resetToken")
                router.push("/auth")
            }
        } catch (error:any) {
            commonErrorToast(`${error.response.data.message}`)
        }
    };

    return (
        <section>
            <section className="flex flex-col md:flex-row h-screen items-center">
                <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                    <img src="https://bcp.cdnchinhphu.vn/334894974524682240/2022/4/29/sontungmtp-1651230206152921306282.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">
                    <div className="w-full h-100">
                        <h1 className="text-xl flex items-center  md:text-2xl font-bold leading-tight mt-12 dark:text-gray-700">
                                Đặt lại mật khẩu
                        </h1>
                        <form className="mt-6" onSubmit={handleSubmit(onSubmit)} >                   
                            <div className="mt-4">
                                    <Input
                                        id="password"
                                        type='password'
                                        register={register}
                                        label="Mật khẩu"
                                        errors={errors}
                                        disabled={isLoading}
                                        watch={watch}
                                        placeholder='Nhập mật khẩu ...'
                                 />                        
                                {displayError("password")}
                            </div>
                            <div className="mt-4">                  
                                    <Input
                                        type='password'
                                        id="confirmPassword"
                                        register={register}
                                        label="Nhập lại mật khẩu"
                                        errors={errors}
                                        disabled={isLoading}
                                        watch={watch}
                                        placeholder='Nhập lại mật khẩu ...'

                                    />
                                
                                {displayError("confirmPassword")}
                            </div>
                            <Button variant="primary" className='w-full font-semibold rounded-lg px-4 py-6 flex mt-6 align-center dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white'>
                               Đặt lại mật khẩu
                            </Button>
                        </form>
                    </div>
                </div>

            </section>
            
        </section>

    )
}

export default ResetForm