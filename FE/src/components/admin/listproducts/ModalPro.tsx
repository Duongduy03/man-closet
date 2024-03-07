'use client'
import { Input } from '@/components/form'
import { Button } from '@/components/ui/button'
import { getAllCategory } from '@/services/categories/category'
import { createPro } from '@/services/products/products'
import { commonErrorToast } from '@/utils/notify'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import Properties from './Properties'
const ModalPro = ({  add, product, onClosePro }: any) => {
    const [cate, setCate] = useState([]);
    const [selectImage,setSelectImage] = useState<FileList | any>([]);
    useEffect(() => {
        getAllCategory(0,Number.MAX_SAFE_INTEGER)?.then(({ data }) => setCate(data))
    }, [])


    const {
        register,
        handleSubmit,
        formState: { errors  },
        setError,
        reset,
    } = useForm<FieldValues>()


 

 
    
    
  
    const handleChangeFile = (e:ChangeEvent<HTMLInputElement>) => {
        setSelectImage([...selectImage,e.target.files])     
  
      };
     
      
    const onHandleSubmit = async (data: any) => {
        try {
                const formData = new FormData();
                formData.append('productName', data.productName);
                formData.append('price', data.price);
                formData.append('description', data.description);   
                formData.append('categoryId', data.categoryId);
               // Append properties array to the form data
               console.log(data);
               if(data.properties.length > 0) {
                for (let i = 0; i < data.properties.length; i++) {
                    const property = data.properties[i];
                    formData.append(`properties[${i}][color]`, property.color);     
                    if(property.variants) {
                        for (let j = 0; j < property.variants.length; j++) {
                            const variant = property.variants[j];
                              
                            formData.append(`properties[${i}][variants][${j}][size]`, variant.size);
                            formData.append(`properties[${i}][variants][${j}][quantity]`, variant.quantity);
                          }
                    }  
                  }
         
                  
               }else{
                commonErrorToast("Bạn cần thêm đầy đủ các thuộc tính bên trong")
               }
             
              if(selectImage !== null){
                for (let i = 0; i < selectImage.length; i++) {                  
                    for(let j = 0; j < selectImage[i].length; j++){
                        formData.append('images', selectImage[i][j]);
                    }                  
                 
                  }
            }
          
            
                await add(formData)
        } catch (error:any) {
            console.log(error);
            
            // console.error('Error creating product:', error.response.data);
        }
    }


    return (
        <div className="overflow-y-auto  pt-[40px] fixed inset-0 backdrop-blur-sm flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full ">
            <div className=" overflow-y-auto relative p-4 w-full max-w-[70%] h-full ">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm sản phẩm</h3>
                        <button type="button" onClick={() => onClosePro()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="createProductModal" data-modal-toggle="createProductModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Đóng</span>
                        </button>
                    </div>
                    <form action='' onSubmit={handleSubmit(onHandleSubmit)} encType="multipart/form-data">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>                            
                                <Input id="productName" register={register} errors={errors} label="Tên sản phẩm" placeholder="tên sản phẩm" />
                                <span className="text-red-600 text-sm">
                                {( errors.productName as any) && (errors.productName as any).message}
        </span>
                            </div>
                            <div>
                                <label htmlFor="category" className="mb-2 block text-sm font-medium leading-6 text-gray-900 dark:text-black">Danh mục</label>
                                <select  {...register('categoryId',{
                                    required: `categoryId bắt buộc nhập`
                                })} className=" dark:bg-white px-4 bg-gray-50  form-input block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 py-3.5">
                                    <option hidden value="">Chọn danh mục</option>
                                    {cate?.map((item: any) => {
                                        return (
                                            <option  value={item._id}>{item.name}</option>
                                        )
                                    })}

                                </select>
                                <span className="text-red-600 text-sm">
                                {( errors.categoryId as any) && (errors.categoryId as any).message}

        </span>
                            </div>

                            <div>
                                <Input id="price" type="number"  placeholder="123" label='Giá' register={register} errors={errors}/>   
                                <span className="text-red-600 text-sm">
                                 {(errors.price as any) && (errors.price as any).message}

        </span>                       
                            </div>
                        
                         
                            <div className="grid gap-4 sm:col-span-2 md:gap-6  ">
                            <Properties reset={reset} errors={errors} register={register} handleChangeFile={handleChangeFile}/>
                                




                            </div>
                       
                         
                            <div className="sm:col-span-2"><label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chi tiết</label><textarea  {...register('description')} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Chi tiết sản phẩm..."></textarea></div>
                        </div>

                        <button type="submit" className="text-white inline-flex items-center bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2">

                            Lưu
                        </button>
                        <button type="reset" className="text-white inline-flex items-center bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">

                            Đặt lại
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalPro