'use client'
import { BannerV2 } from '@/components/banner';
import { Input } from '@/components/form';
import React, { useState, useCallback, useRef } from 'react'
import { useForm, FieldValues, SubmitHandler,FieldErrors } from "react-hook-form";
import Image from 'next/image';
import style from './authform.module.scss'
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signIn, signUp } from '@/services/auth/auth';
import Toaster from '@/components/Toaster/Toaster';
import { useParams, useRouter } from 'next/navigation';
import { forgotPassword } from '@/services/user/user';

type Variant = "LOGIN" | "REGISTER" | "FORGOT_PASSWORD" ;
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const toasterRef = useRef<any>(null);
  const router = useRouter();
  const toggleForgotPassword = useCallback(() => {
    setVariant("FORGOT_PASSWORD");
  }, [variant]);
  const toggleVariant = useCallback(() => {

    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }

  }, [variant]);

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
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
    if (variant === "REGISTER") {
      //  Register
      try {
        // const emailValidationResult = validateInput('require', data.name, 'Invalid email address');
        // console.log(emailValidationResult);
      const register = await signUp(data)
      if(register) {
        toasterRef.current.showToast('success', 'Register successfully!');
        setVariant("LOGIN")
      }
   

      } catch (error: any) {
        toasterRef.current.showToast('error', `${error.response.data.message!}`);


      }
    }
    if (variant === "LOGIN") {
      try {
        const login:any = await signIn(data)
        console.log(login);
        if(login){
          const user = login.data;
            localStorage.setItem("accessToken", login.accessToken);
            localStorage.setItem("refresh", login.refreshToken);
            localStorage.setItem("user", JSON.stringify(user));
            if (user.role === "admin") {
              router.push('/admin')
            } else {
              router.push('/')
            }
  
            toasterRef.current.showToast('success', 'Login successfully!');
        }
       
      } catch (error: any) {
        toasterRef.current?.showToast('error', `${error.response.data.message!}`);
      }
      //  Login
    }
    if(variant === "FORGOT_PASSWORD"){
      try {
        const forgot:any = await forgotPassword(data)
        console.log(forgot);
        
        if(forgot) {
             toasterRef.current?.showToast('success', "Bạn vui lòng vào gmail của mình để lấy lại mật khẩu!");
             localStorage.setItem("resetToken",forgot.resetToken)
        }
      } catch (error:any) {
           toasterRef.current?.showToast('error', `${error.response.data.message!}`);
      }
    }

  };
  const socialAction = async (action: string) => {
    setIsLoading(true);
    if(action === "google"){
      
       window.location.href = "http://localhost:8088/api/auth/google";  
     
    }
  };
  return (
    <section>


<section className="flex flex-col md:flex-row h-screen items-center">

<div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
  <img src="https://bcp.cdnchinhphu.vn/334894974524682240/2022/4/29/sontungmtp-1651230206152921306282.jpeg" alt="" className="w-full h-full object-cover"/>
</div>

<div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">

  <div className="w-full h-100">

   
    <h1 className="text-xl flex items-center  md:text-2xl font-bold leading-tight mt-12 dark:text-gray-700">   {variant === 'LOGIN' ? 'Đăng nhập vào tài khoản của bạn' : (variant === 'REGISTER' ? 'Đăng ký tài khoản' : 'Quên mật khẩu')}</h1>

    <form className="mt-6" onSubmit={handleSubmit(onSubmit)} >
    <div className="mt-4">
       
                  {variant === "REGISTER" && (
                    <Input
                      id="name"
                      register={register}
                      label="Tên người dùng"
                      errors={errors}
                      disabled={isLoading}
                      watch={watch}
                      placeholder='Nhập tên ...'


                    />

                  )}
                  {displayError("name")}
             
      </div>

      <div className="mt-4">
      
              

              <Input
                id="email"
                register={register}
                label="Email"
                type="email"
                disabled={isLoading}
                errors={errors}
                placeholder="Nhập email ..."
                watch={watch}
              />
              {displayError("email")}

      
      </div>

      <div className="mt-4">
       
                  {variant !== "FORGOT_PASSWORD" && (
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
                  )}
                  {displayError("password")}

               
      </div>
      <div className="mt-4">
       
                  {variant !== "FORGOT_PASSWORD" && variant !== "LOGIN" && (
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
                  )}
                  {displayError("confirmPassword")}

                
      </div>
                    
      <div className="text-right mt-2">
   
        <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700 " onClick={toggleForgotPassword}>Quên mật khẩu?</a>
      </div>


             <Button variant="primary" className='w-full font-semibold rounded-lg px-4 py-6 flex mt-6 align-center dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white'>
                  {variant === 'LOGIN' ? 'Đăng nhập' : (variant === 'REGISTER' ? 'Đăng ký' : 'Quên mật khẩu')}
                </Button>
    </form>

    <hr className="my-6 border-gray-300 w-full"/>

    <button type="button" onClick={() => socialAction("google")} className="w-full block bg-white  hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
          <div className="flex items-center justify-center">
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6"  width="100" height="100" viewBox="0 0 48 48">
<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
          <span className="ml-4">
          Log in
          with
          Google</span>
          </div>
        </button>

    <p className="mt-8 dark:text-gray-700"> {variant === "LOGIN" ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản trước đây?"}   <a href="#" className="font-medium text-primary-600 hover:underline hover:text-blue-700 dark:text-primary-500" onClick={toggleVariant}> {variant === "LOGIN" ? "Đăng ký" : "Đăng nhập"}</a></p>


  </div>
</div>

</section>
<Toaster ref={toasterRef} /> 
    </section>

  )
}

export default AuthForm