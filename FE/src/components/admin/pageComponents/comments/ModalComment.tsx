import Toaster from '@/components/Toaster/Toaster';
import { IProduct } from '@/interfaces/product'
import { deleteCommentState, getAllCommentByProductId } from '@/redux/reducer/comment.reducer';
import { getAllUserByPage } from '@/redux/reducer/user.reducer';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useRef } from 'react'
interface IModalProps {
    onClose: () => void,
    product: IProduct | undefined
}
const ModalComment = ({ onClose, product }: IModalProps) => {
    const dispatchThunk = useAppDispatch();
    const comment = useAppSelector((state) => state.comment.comment);
    const users = useAppSelector((state) => state.user.users);
    const userId = comment?.map((item: any, index: any) => item.user_id);
    const toasterRef = useRef<any>();
    const user = userId
        ?.map((item: any) => {
            const userById = users.filter((items: any) => items._id == item);
            return userById;
        })
        .flat()
        .concat();
    const productId = product?._id;
    const dataProductId: any = {
        productId: productId,
    };
    useEffect(() => {
        dispatchThunk(getAllCommentByProductId(dataProductId));
        dispatchThunk(getAllUserByPage());
    }, [dispatchThunk, productId]);
    console.log("productId", product?._id)
    let isChecked = false;
    if (comment.length === 0) {
        isChecked = false
    } else {
        isChecked = true
    }
    const handleDeleteComment = (id: string) => {
        dispatchThunk(deleteCommentState(id)).then(() => {
            toasterRef.current.showToast("success", "Xóa thành công");

        })

    }
    return (
        <>
            <div
                aria-hidden="true"
                className=" fixed inset-0 transition ease-in-out delay-150 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center "
            >
                <Toaster ref={toasterRef} />
                <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-scroll">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Chi tiết bình luận

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
                        <table className="w-full h-auto text-sm text-left table-auto text-gray-500 dark:text-gray-400">
                            <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">STT</th>
                                    <th scope="col" className="p-4">Tên người dùng</th>
                                    <th scope="col" className="p-4">Số sao</th>
                                    <th scope="col" className="p-4">Tin nhắn</th>
                                    <th scope="col" className="p-4">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isChecked ? (<>
                                    {comment?.map((item: any, index: any) => {
                                        const userComment = user.find((i: any) => i._id == item.user_id);

                                        return (
                                            <>
                                                <tr
                                                    className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                                                    key={index}
                                                >
                                                    <td scope="col" className="p-4">{index + 1}</td>
                                                    <td scope="col" className="p-4">{
                                                        userComment?.name
                                                    }</td>
                                                    <td scope="col" className="p-4">
                                                        {[...Array(item?.rating)].map((star, i) => {
                                                            const ratingValue = i + 1;
                                                            return (
                                                                <label key={i} className="cursor-pointer">

                                                                    <span
                                                                        className={
                                                                            ratingValue <= item?.rating
                                                                                ? "text-orange-400 text-xl mx-2 cursor-pointer"
                                                                                : "text-xl mx-2 cursor-pointer"
                                                                        }
                                                                    >
                                                                        ★
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </td>
                                                    <td scope="col" className="p-4">{
                                                        item?.message
                                                    }</td>
                                                    <td scope="col" className="p-4">
                                                        <button className="text-red-500" onClick={() => handleDeleteComment(item._id)} >Delete </button>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })}
                                </>) : (<span className="text-center">Chưa có bình luận nào</span>)}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalComment