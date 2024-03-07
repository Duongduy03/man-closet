import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Variants from './Variants';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
interface IProperties{
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    handleChangeFile:(e:any) => void,
    reset:any
}
const Properties = ({reset,register,errors,handleChangeFile}:IProperties) => {
    
    const [indexes, setIndexes] = useState<number[]>([]);
    const [counter, setCounter] = useState(0);
    const addFriend = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(counter + 1);
    };
    const removeFriend = (index: any) => () => {
        setIndexes(indexes.filter(item => item !== index));
        setCounter(counter  - 1);
        reset({[`properties[${index}]`]: null });
    };
  
  return (
    <div className="grid gap-4 sm:col-span-2 md:gap-6  ">
            <Button className='w-[30%]' variant={'primary'} type="button" onClick={addFriend} >
                Thêm thuộc tính
        </Button>
        {indexes.map((item,index) => {
            return (
            <fieldset className='flex flex-row justify-between items-center' >
                <div className=" w-[15%] mr-4">
                    <span className="block text-sm font-medium text-gray-900 dark:text-white"> Images</span>
                    <div className="flex justify-center items-center w-full">                                                                                            
                    <input type="file"
                     className="w-full  text-black text-xs   bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800  file:hover:bg-gray-700 file:text-white rounded-lg " onChange={handleChangeFile} />
                    
                    <input type="text" hidden
                     className="w-full  text-black text-xs   bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800  file:hover:bg-gray-700 file:text-white rounded-lg " {...register(`properties[${index}].imageUrl`)} />
                </div>
                </div>
                <div className='w-[15%]'>
                    <label htmlFor="breadth" className="block  text-sm font-medium text-gray-900 dark:text-white">Color</label>
                    <input type="text" {...register(`properties[${index}].color`,{
                        required:"Màu sắc bắt buộc nhập",
                        validate : (val) => {
                            if (val.trim() === "") {
                                return "Không được để trống";
                              }
                        }
                    })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="red..."  />
                       <span className="text-red-600 text-sm">
                       
                         {(errors?.properties?.[index]?.color as any) && (errors?.properties?.[index]?.color as any).message}

</span>                  
                   
                       
                </div>
                <Variants register={register} errors={errors} i={index}/>
                <Button className='w-[15%]' variant={'primary'} type="button" onClick={removeFriend(item)} >
              Xóa thuộc tính
        </Button>
              
            </fieldset>
        
            )
        })}
        
            

   
    




</div>
  )
}

export default Properties