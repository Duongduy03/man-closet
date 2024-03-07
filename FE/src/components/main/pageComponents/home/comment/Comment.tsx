"use client";
import { useChangeDate } from "@/hooks";
import Toaster from '@/components/Toaster/Toaster';
import {
  getAllCommentByProductId,
  postComment,
} from "@/redux/reducer/comment.reducer";
import { useUserInfo } from "@/hooks";
import { getAllUserByPage } from "@/redux/reducer/user.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createComment } from "@/services/comment/comment";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type props = {
  productId: string | string[];
};
const Comment = ({ productId }: props) => {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const dispatchThunk = useAppDispatch();
  const toasterRef = useRef<any>(null);
  const comment = useAppSelector((state: any) => state.comment.comment);
  const statusMessage = useAppSelector((state: any) => state.comment.message);
  const users = useAppSelector((state: any) => state.user.users);
  const dataProductId = {
    productId: productId,
  };
  useEffect(() => {
    dispatchThunk(getAllCommentByProductId(dataProductId));
    dispatchThunk(getAllUserByPage());
  }, [dispatchThunk, productId]);
  useEffect(() => {
    if (statusMessage) {
      toasterRef.current.showToast("Success", `${statusMessage}`)
    }
  }, [statusMessage]);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const isChecked = useUserInfo();
  const handleMessageChange = (e: any) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const data = {
    product_id: productId,
    message: message,
    rating: rating,
  };

  const userId = comment?.map((item: any, index: any) => item.user_id);
  const user = userId
    ?.map((item: any) => {
      const userById = users.filter((items: any) => items._id == item);
      return userById;
    })
    .flat()
    .concat();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatchThunk(postComment(data));
 

    if (statusMessage) {
      toasterRef.current.showToast("Success", `${statusMessage}`)
    }
  };
 
  return <>
    <Toaster ref={toasterRef} />
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Bình luận ({comment.length})
          </h2>
        </div>
        {isChecked ? <div className="flex w-[100%]">
          <div className="flex-shrink-0 block">
            <Image
              src={
                isChecked.avatar
              }
              alt="banner"
              width={36}
              height={36}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                borderRadius: 9999,
                marginRight: "0.75rem",
              }}
            ></Image>
          </div>

          <form className="mb-6 w-full" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <span>Đánh giá:</span>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i} className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRatingChange(ratingValue)}
                      className="hidden "
                      required
                    />
                    <span
                      onClick={() => handleRatingChange(ratingValue)}
                      className={
                        ratingValue <= rating
                          ? "text-orange-400 text-xl mx-2 cursor-pointer"
                          : "text-xl mx-2 cursor-pointer"
                      }
                    >
                      ★
                    </span>
                  </label>
                );
              })}
              <label htmlFor="comment" className="sr-only">
                Bình luận của bạn
              </label>
              <textarea
                id="comment"
                rows={6}
                onChange={(e) => handleMessageChange(e)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 mt-3 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Bình luận
            </button>
          </form>
        </div> : <div>Vui lòng đăng nhập để bình luận</div>
        }

        {comment?.map((item: any, index: any) => {
          const userComment = user.find((i: any) => i._id == item.user_id);

          return (
            <>
              <article
                className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                key={index}
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <Image
                        src={
                          userComment?.avatar
                        }
                        alt="banner"
                        width={36}
                        height={36}
                        style={{
                          objectFit: "contain",
                          maxWidth: "100%",
                          borderRadius: 9999,
                          marginRight: "0.5rem",
                        }}
                      ></Image>
                      {userComment?.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {[...Array(item?.rating)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label key={i} className="cursor-pointer">

                            <span
                              className={
                                ratingValue <= item?.rating
                                  ? "text-orange-400 text-xl mx-1 cursor-pointer"
                                  : "text-xl mx-2 cursor-pointer"
                              }
                            >
                              ★
                            </span>
                          </label>
                        );
                      })}
                      <time dateTime="2022-02-08" title="February 8th, 2022" className="ml-2">
                        {useChangeDate(item?.createdAt)}
                      </time>
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {item.message}
                </p>
              </article>
            </>
          );
        })}
      </div>
    </section></>
};

export default Comment;
