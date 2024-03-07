import { ICategory } from "@/interfaces/category";
import instance from "../instance";
import { commonErrorToast } from "@/utils/notify";


const getAllCategory = (page:number,limit:number) => {
    try {
        const res = instance.get(`api/category?_page=${page}&_limit=${limit}`)
        return res
    } catch (error) {
        console.log(error);
    }

}

const getCategoryById = async (id: string) => {
    try {
        const res = await instance.get(`api/category/${id}`)
        return res
    } catch (error) {
        console.log(error);

    }
}
const addCategory = async (category: any) => {

        const res = await instance.post(`api/category`, category)
        return res
 
}
const updateCategory = async (category: ICategory) => {
 
        const res = await instance.patch(`api/category/${category._id}`, category)
        return res
   
}
// Xoas hẳn trong db
const deleteCategory = async (id: string | undefined) => {
  
        const res = await instance.delete(`api/category/${id}`)
        return res
   
}
// Chuyển vào trong thùng rác
const moveToTrashCategory = async (id: string | undefined) => {
 
        const res = await instance.delete(`api/category/remove/${id}`)
        return res
  
}
const getAllDeletedCategory = async (page:number) => {

        const res = await instance.get(`api/category/moveToTrash/delete?page=${page}`)
        return res
  
}
const restoreCategory = async (id:string | undefined) => {
 
        const res = await instance.patch(`api/category/restore/${id}`)
        return res

}

export { getAllCategory, getCategoryById, addCategory, updateCategory, deleteCategory, moveToTrashCategory,getAllDeletedCategory,restoreCategory}


