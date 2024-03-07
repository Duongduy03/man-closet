"use client"
import Toaster from '@/components/Toaster/Toaster';
import Modal from '@/components/modal/Modal';
import React, { useEffect, useRef, useState } from 'react'
import ModalComment from './ModalComment';
import { IProduct } from '@/interfaces/product';
import { getAll } from '@/services/products/products';
import Pagination from '@/components/pagination/Pagination';
import SearchComment from './SearchComment';

const ManagementComment = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct>();
    const [productsAll, setProductsAll] = useState<IProduct[]>([])
    const [modal, setModal] = useState(false);

    const toasterRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [key, setKey] = useState<string>('');

    // useEffect(() => {
    //     getAll().then(({ data }: any) => setProducts(data))
    // }, [])
    useEffect(() => {
        fetchData(currentPage)
    }, []);
    const fetchData = async (currentPage: number) => {
        if (currentPage !== 0) {
            const response = await getAll(currentPage);
            if (response) {
                const data: any = response;
                setProducts(data.data)
                setTotalPages(data.pagination.totalPages)
                // console.log('page', data);
            } else {
            }
        } else {
            const response = await getAll(currentPage);
            if (response) {
                const data: any = response;
                setProductsAll(data.data)
                setTotalPages(data.pagination.totalPages)
            } else {

            }
        }


    };
    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        fetchData(page)
    }
    const search = async () => {
        if (!key) {
            await fetchData(currentPage)

        } else {
            await fetchData(0)
            // console.log(categoriesAll);
            const regex = new RegExp(key, 'i');
            const temp = await productsAll
            let resultSearch = await temp.filter((c: IProduct) => {
                // Chuyển chuỗi `key` và tên danh mục thành chữ thường và tách thành mảng từ
                const keyWords = key.toLowerCase().split(' ');
                const productsWords = c.productName.toLowerCase().split(' ')
                // Kiểm tra xem có ít nhất một từ trong `keyWords` tồn tại trong `productsWords`
                return keyWords.some((word) => productsWords.some((productsWord) => productsWord.includes(word)));
                // regex.test(c.name)
            }

            );
            // console.log(resultSearch);

            setProducts(resultSearch);
            // fetchData(currentPage)
        }
    }

    const handleChange = (e: any) => {
        setKey(e.target.value)
    }

    return (
        <>
            <div>
                <div className="relative overflow-x-auto">

                    <section>
                        <div>
                            <h1 className="font-bold text-xl pt-6 pb-6 dark:text-black">
                                Quản lý bình luận sản phẩm
                            </h1>
                        </div>
                        <div className="font-bold text-xl pb-6">
                            <SearchComment onHandleChange={handleChange} onSearch={search} />
                        </div>

                    </section>
                    <table className="w-full text-sm text-left table-auto text-gray-500 dark:text-gray-400">
                        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">STT</th>
                                <th scope="col" className="p-4">Tên sản phẩm</th>
                                <th scope="col" className="p-4">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((data: IProduct, index: number) => {
                                return (
                                    <tr key={index} className="border-b bg-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="p-4 w-4">

                                            <div className="flex items-center">
                                                {index + 1}
                                            </div>
                                        </td>

                                        <td scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                            <div className="flex items-center mr-3">
                                                {data?.productName}
                                            </div>
                                        </td>

                                        <td className="p-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                            <button
                                                className="text-blue-500 hover:text-blue-300 transition-all"
                                                onClick={() => {
                                                    setModal(true);
                                                    setProduct(data)
                                                }}
                                            >
                                                Chi tiết
                                            </button>

                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage} />
                </div>
                <Toaster ref={toasterRef} />
                <Modal isOpen={modal} handleClose={() => setModal(false)}>
                    <ModalComment onClose={() => setModal(false)} product={product} />
                </Modal>


            </div>
        </>
    )
}

export default ManagementComment