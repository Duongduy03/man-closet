import React, { forwardRef, useImperativeHandle } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toaster = forwardRef((props, ref) => {
    const showToast = (type: string, message: string) => {
        const option: any = {
            
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        };
        if (type === 'info') {
            toast.info(message, option)
        } else if (type === 'error') {
            toast.error(message, option);
        } else if (type === 'warning') {
            toast.warning(message, option);
        }
        else if (type === 'success') {
            toast.success(message, option);
        }
        else {
            toast.dark(message, option);
        }
    }
    // Sử dụng useImperativeHandle để "chuyển" hàm showToast qua ref
    useImperativeHandle(ref, () => ({
        showToast
    }));
    return (
        <ToastContainer />
    )
}
)
export default Toaster