import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'


interface Pagination{
    totalPages:number,   
    currentPage:number, 
    onPageChange: (page:number) => void
}
const Pagination = ({totalPages, currentPage, onPageChange,}:Pagination) => {


    const handle = (page:number) => {
        onPageChange(page)
    }
    const renderPageNumbers = () => {
      const pageNumbers = [];
      const displayLimit = 3; // Số trang hiển thị trong nhóm trang
  
      if (totalPages <= displayLimit) {
        // Hiển thị tất cả các trang nếu tổng số trang nhỏ hơn hoặc bằng displayLimit
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(renderPageButton(i));
        }
      } else {
        if (currentPage === totalPages) {
          // Đặc biệt xử lý khi ở trang cuối
          const startWithOffset = Math.max(totalPages - displayLimit + 1, 1);
          const endWithOffset = totalPages;
          for (let i = startWithOffset; i <= endWithOffset; i++) {
            pageNumbers.push(renderPageButton(i));
          }
        } else {
          const start = Math.max(currentPage - Math.floor(displayLimit / 2), 1);
          const end = Math.min(start + displayLimit - 1, totalPages);

          for (let i = start; i <= end; i++) {
            pageNumbers.push(renderPageButton(i));
          }
        
          if (end < totalPages ) {
            pageNumbers.push(<span key="ellipsis" className='cursor-pointer border border-gray-300 relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold'>...</span>);
            pageNumbers.push(renderPageButton(totalPages));
          }
        }
      }
  
      return pageNumbers;
    };
      const renderPageButton = (pageNumber: number) => (
        <button
          aria-current="page"
          className={`cursor-pointer border border-gray-300 relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
            pageNumber === currentPage
              ? 'focus:bg-slate-200 bg-zinc-800 text-white' // Màu nền cho trang hiện tại
              : 'bg-zinc-100 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600'
          }`}
          key={pageNumber}
          onClick={() => handle(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      );
   
    
  return (
    <div className="flex items-center w-full justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-center">
      {/* <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{limit}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div> */}
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
           onClick={() => onPageChange(1)}
           disabled={currentPage === 1 ? true : false}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only" >Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" height="1em" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
     
            
          </button>
          <button
           onClick={() => onPageChange(currentPage - 1)}
           
           disabled={currentPage === 1 ? true : false}
            className="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only" >Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
      
          
       {renderPageNumbers()}
         
        
          <button
            onClick={() => onPageChange(currentPage + 1)}
           
            disabled={currentPage === totalPages ? true : false}
      
            className="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        
          </button>
         
        
          <button
            onClick={() => onPageChange(totalPages)}
           
            disabled={currentPage === totalPages ? true : false}
      
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg  className="h-5 w-5 "  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
  )
}

export default Pagination