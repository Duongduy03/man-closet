
import { ICategory } from "@/interfaces/category";
import { getAllCategory, getCategoryById } from "@/services/categories/category";
import { log } from "console";
import { useEffect, useState } from "react"



export const fetchData = async (currentPage: number) => {
  const response = await getAllCategory(currentPage);
    if (response) {
      const { data } = response;
      console.log(data);
      
     
    }
 
    return response?.data
};
export const getAllCate = async () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  useEffect(() => {
    getAllCategory(0,Number.MAX_SAFE_INTEGER)?.then((data) => setCategory(data.data))
    
  },[])
  return category


}
export const listCategory = () => {
    const [category, setCategory] = useState<any>();

  useEffect(() => {
    getAllCategory(0,Number.MAX_SAFE_INTEGER)?.then(({data}:any) => setCategory(data.data))
  }, [])
  return category
//   console.log(category);
}

export const getProductsByCategory = (id: string) => {
    const [products, setProducts] = useState([])
    console.log('id' ,id);
    
      useEffect(() => {
        getCategoryById(id).then(({data}:any) => setProducts(data))
        // console.log('ducdeptrai',products);
      })
    
}
 
