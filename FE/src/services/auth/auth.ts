
import instance from "../instance"

export const signUp = (user: any) => {
    const res = instance.post("/signUp", user);
    return res
}
export const signIn = (user: any) => {
    const res = instance.post("/signIn", user, { withCredentials: true });
    return res
}
export const lockUser = (userId: any) => {
    const res = instance.patch(`/user/${userId}/lock`,{})
    return res
}

export const getListWishListByUserId = (userId: any,page:number) => {
    const res = instance.get(`/user/${userId}/wishlist?_page=${page}`);
    return res
}

export const addRemoveWishList = (data:any) => {
    const res = instance.patch(`/user/wishlist`,data);
    return res
}




