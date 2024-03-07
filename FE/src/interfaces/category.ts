import { IProduct } from "./product";


export interface ICategory{
    _id?:string,
    name:string,
    deleted:boolean,
    deletedAt?:Date,
    products?:IProduct[]
}