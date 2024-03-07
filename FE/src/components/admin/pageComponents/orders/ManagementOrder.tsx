"use client";
import React, { useEffect, useRef, useState } from "react";

import SearchOrder from "./SearchOrder";
import { IBill, ORDER_STATUS } from "@/interfaces/bill";
import {
  exportBillById,
  getAllOrderBill,
  updateBill,
} from "@/services/order/order";
import Toaster from "@/components/Toaster/Toaster";
import { getAllUser } from "@/services/user/user";
import { IUser } from "@/interfaces/user";
import Image from "next/image";
import Pagination from "@/components/pagination/Pagination";
import { Button } from "@/components/form";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { changeStatusBillState } from "@/redux/reducer/order.reducer";
import { parseNumberToCurrency } from "@/helper/convertCurrency";
import { customDate } from "@/helper/convertDate";

const ManagementOrder = () => {
  const [valueStatus, setValueStatus] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<IBill[]>([]);
  const [billAll, setBillAll] = useState<IBill[]>([]);
  const [bill, setBill] = useState<IBill[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [key, setKey] = useState<string>("");
  const [user, setUser] = useState<IUser[]>([]);
  const toasterRef = useRef<any>();

  const order = useAppSelector((state) => state.order.updateBill);
  const dispatchThunk = useAppDispatch();

  useEffect(() => {
    // fetchData(currentPage, limit)
    Promise.all([
      getAllOrderBill(0, Number.MAX_SAFE_INTEGER),
      getAllUser(0, Number.MAX_SAFE_INTEGER),
      getAllOrderBill(currentPage, limit),
    ])
      .then(([orderData, userData, billData]: any) => {
        const userMap = new Map(
          userData?.data?.map((user: any) => [user._id, user.name])
        );
        setUser(userData?.data);
        setBillAll(
          orderData?.data?.map((item: any) => {
            return {
              ...item,
              userName: userMap.get(item.user_id),
            };
          })
        );
        setBill(
          billData?.data?.map((item: any) => {
            return {
              ...item,
              userName: userMap.get(item.user_id),
            };
          })
        );
        setTotalPages(billData.paginate.totalPages);
        setTotalItems(billData.paginate.totalItems);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data: ", error);
      });
  }, [currentPage]);
  const fetchData = async (currentPage: number, limit: number) => {
    if (currentPage !== 0) {
      const response = await getAllOrderBill(currentPage, limit);
      if (response) {
        const data: any = response;

        setBill(data.data);
        setTotalPages(data.paginate.totalPages);
        setTotalItems(data.paginate.totalItems);
      } else {
      }
    }
  };
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    fetchData(page, limit);
  };



  const URL = "http://localhost:8088/order/export";
  const exportBill = (id: any) => {
    // window.location("http")
    exportBillById(id);
    window.open(`${URL}/${id}`);
    // window.location.reload()
  };

  // handle submit search
  const handleChangeSearch = (e: any) => {
    setKey(e.target.value);
  };
  const search = async () => {
    if (!key) {
      await fetchData(currentPage, limit);
    } else {
      await fetchData(0, limit);
      let resultSearch = billAll.filter((bill: IBill) => {
        const keyWords = key.toLocaleLowerCase().split(" ");
        const billName = bill._id?.toLocaleLowerCase().split(" ");
        return keyWords.some(
          (word) => billName?.some((bill) => bill.includes(word))
        );
      });
      setTotalPages(1);
      setBill(resultSearch);
    }
  };
  // console.log("bill", bill)
  const handleChangeRowData = (e: any, data: IBill) => {
    console.log("data", e.target.checked);
    const isChecked = e.target.checked;
    if (isChecked) {
      setRowSelected((prev) => [...prev, data]);
    } else {
      setRowSelected(rowSelected.filter((row) => row._id !== data._id));
    }
  };
  // console.log("rowSelected", rowSelected)
  const status = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRM,
    ORDER_STATUS.DELIVERY,
    ORDER_STATUS.RECEIVER,
    ORDER_STATUS.CANCEL,
    ORDER_STATUS.EXCHANGE,
  ];
  console.log("value change", valueStatus);
  const onHandleChange = () => {
    rowSelected?.map((item, index) => {
      const data: any = {
        billId: item._id,
        orderStatus: valueStatus,
        paymentStatus: item.payment_status.status,
      };
      return dispatchThunk(changeStatusBillState(data));
      // updateBill(item._id, valueStatus)
    });
  };
  useEffect(() => {
    Promise.all([
      getAllOrderBill(0, Number.MAX_SAFE_INTEGER),
      getAllUser(0, Number.MAX_SAFE_INTEGER),
      getAllOrderBill(currentPage, limit),
    ])
      .then(([orderData, userData, billData]: any) => {
        const userMap = new Map(
          userData?.data?.map((user: any) => [user._id, user.name])
        );
        setUser(userData?.data);
        setBillAll(
          orderData?.data?.map((item: any) => {
            return {
              ...item,
              userName: userMap.get(item.user_id),
            };
          })
        );
        setBill(
          billData?.data?.map((item: any) => {
            return {
              ...item,
              userName: userMap.get(item.user_id),
            };
          })
        );
        setTotalPages(billData.paginate.totalPages);
        setTotalItems(billData.paginate.totalItems);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data: ", error);
      });
  }, [order]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <section>
          <div>
            <h1 className="font-bold text-xl pt-6 pb-6 dark:text-black">
              Management Order
            </h1>
          </div>
          <div className="font-bold text-xl pb-6">
            <SearchOrder
              onHandleChange={handleChangeSearch}
              onSearch={search}
            />
          </div>
        </section>
        <div className="relative">
          <div className="z-10 flex bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ">
            <select
              id="countries"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 inline-flex dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onChange={(e: any) => setValueStatus(e.target.value)}
            >
              <option>Chọn trạng thái đơn hàng</option>
              {status.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>

            {valueStatus && rowSelected.length !== 0 && (
              <Button onClick={onHandleChange}>Submit</Button>
            )}
          </div>
        </div>
        <table className="w-full table text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                STT
              </th>

              <th scope="col" className="px-6 py-3">
                User Name
              </th>

              <th scope="col" className="px-6 py-3">
                Item
              </th>

              <th scope="col" className="px-6 py-3">
                Total Price
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                CreatedAt
              </th>

              <th scope="col" className=" px-6 py-3 overflow-x-auto ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bill?.length !== 0 ? (
              bill?.map((bill, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeRowData(e, bill)}
                      />
                    </th>
                    <td className="px-6 py-4">{bill.userName}</td>
                    <td className="px-6 py-4 flex justify-between w-[200px]">
                      {bill.items.map((item) => {
                        return (
                          <>
                            <figure className="w-[80px] h-[80px] relative rounded overflow-hidden">
                              <Image
                                src={item.property.imageUrl}
                                fill
                                objectFit="contain"
                                className="absolute"
                                alt=""
                              />
                            </figure>
                          </>
                        );
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {parseNumberToCurrency(bill.total_price)}
                    </td>
                    <td className="px-6 py-4">
                      {
                        bill.history_order_status[
                          bill.history_order_status.length - 1
                        ].status
                      }
                    </td>
                    <td className="px-6 py-4">
                      {customDate(bill.createdAt.toString())}
                    </td>

                    <td className="px-6 py-4 position-relative">
                      {bill.history_order_status[
                        bill.history_order_status.length - 1
                      ].status === "Đã giao" ||
                      bill.history_order_status[
                        bill.history_order_status.length - 1
                      ].status === "Đã xác nhận" ? (
                        <button
                          type="button"
                          onClick={() => exportBill(bill._id)}
                          className="flex items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="18"
                            viewBox="0 0 576 512"
                            className="mr-2 ml-0.5"
                          >
                            <path
                              fill="#ffffff"
                              d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z"
                            />
                          </svg>
                          Export
                        </button>
                      ) : (
                        " "
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className=" p-4  text-center bg-white  ">
                  <div className="flex align-center justify-center ">
                    Không có dữ liệu{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      className="w-6 h-5 pl-2"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                    >
                      <path d="M 8.5 8 C 6.019 8 4 10.019 4 12.5 L 4 18 L 16.052734 18 C 16.636734 18 17.202344 17.793922 17.652344 17.419922 L 23.5 12.546875 L 19.572266 9.2734375 C 18.586266 8.4524375 17.336734 8 16.052734 8 L 8.5 8 z M 27.644531 13 L 19.572266 19.724609 C 18.585266 20.546609 17.336734 21 16.052734 21 L 4 21 L 4 35.5 C 4 37.981 6.019 40 8.5 40 L 39.5 40 C 41.981 40 44 37.981 44 35.5 L 44 17.5 C 44 15.019 41.981 13 39.5 13 L 27.644531 13 z"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          limit={limit}
          totalItems={totalItems}
          totalPages={totalPages}
          onPageChange={handleChangePage}
        />
      </div>
      <Toaster ref={toasterRef} />
    </div>
  );
};

export default ManagementOrder;
