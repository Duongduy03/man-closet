"use client";

import { Input } from "@/components/form";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces/category";
import { addCategory, updateCategory } from "@/services/categories/category";

import { useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface ModelProp {

  category: ICategory,
  update: (data: ICategory) => void,
  add: (data: ICategory) => void,
  onClose: () => void,
}
const ModelCategory = ({

  category,
  update,
  add,
  onClose,
}: ModelProp) => {
  const { register, handleSubmit, formState : { errors }, reset } = useForm<FieldValues>({
    defaultValues :{
      name:""
    }
  });
  //   const router = useRouter();

  if (category) {
    useEffect(() => {
      reset(category);
    }, [category]);
  }
  const restore = () => {
    if (category) {
      reset(category);
    }
  };
  const onHandleSubmit = async (data: any) => {
    try {
      console.log(data);
      if (!category) {
        add(data);
      } else {
        update(data);
      }
    } catch (error: any) {
      console.log(error.response.message);
    }
  };

  return (
    <div
      aria-hidden="true"
      className=" fixed inset-0 transition ease-in-out delay-150 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {category ? "Sửa danh mục" : "Thêm danh mục"}
            
            </h3>
            <button
              type="button"
              onClick={() => onClose()}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-target="createProductModal"
              data-modal-toggle="createProductModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Đóng</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <form action="#" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <Input label="Tên danh mục" id="name" placeholder="Tên danh mục" register={register} errors={errors}/>
                <div>
                <span className="text-red-600 text-sm">
                 {(errors.name as any) && (errors.name as any).message}

        </span>
                </div>
                
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2"
            >
              Lưu
            </button>
            <button
              type="reset"
              className="text-white inline-flex items-center bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mr-2"
            >
              Đặt lại
            </button>
            <button
              type="button"
              onClick={() => restore()}
              className="text-white inline-flex items-center bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 mr-2"
            >
              Khôi phục
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModelCategory;
