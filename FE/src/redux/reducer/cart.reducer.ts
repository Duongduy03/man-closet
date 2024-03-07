import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "@/interfaces/asyncThunk";
import { IProductInCart, ProductInCart } from "@/interfaces/product";
import {
  addProductToCartAxios,
  deleteProductInCart,
  getAllProductInCart,
  updateProductInCart,
} from "@/services/cart.services";
import { commonErrorToast } from "@/utils/notify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  products: IProductInCart[];
  currentRequestId: undefined | string;
  loading: boolean;
  message: undefined | string;
}

const initialState: CartState = {
  products: [],
  currentRequestId: undefined,
  loading: false,
  message: undefined,
};

export const getProductsInCart = createAsyncThunk(
  "cart/getProductsInCart",
  async (_, thunkAPI) => {
    const response = await getAllProductInCart(thunkAPI.signal);
    return response.result;
  }
);

interface AddProductToCartBody {
  user_id: string;
  product: IProductInCart;
}
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (
    { user_id, product }: AddProductToCartBody,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await addProductToCartAxios(user_id, product);
      return fulfillWithValue(response.result);
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

type DeleteProductInCartParams = {
  user_id: string;
  data: ProductInCart[];
};
export const deleteProductInCartAsync = createAsyncThunk(
  "cart/deleteProduct",
  async (
    { user_id, data }: DeleteProductInCartParams,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await deleteProductInCart(user_id, data);
      return fulfillWithValue(response.result);
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response.status === 404) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

type TUpdateProductInCartParams = {
  user_id: string;
  product_id: string;
  color: string;
  size: string;
  data: {
    [key: string]: string | number;
  };
};
export const updateProductInCartAsync = createAsyncThunk(
  "cart/updateProduct",
  async (
    { user_id, product_id, color, size, data }: TUpdateProductInCartParams,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await updateProductInCart(
        user_id,
        product_id,
        color,
        size,
        data
      );
      return fulfillWithValue(response.result);
    } catch (error: any) {
      if (error.name === "AxiosError" && error.status === 404) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductsInCart.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(deleteProductInCartAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProductInCartAsync.fulfilled, (state, action) => {
        state.products.map((item) => {
          if (
            item._id.toString() === action.payload?._id.toString() &&
            item.color === action.payload?.color &&
            item.size === action.payload?.size
          ) {
            return action.payload;
          }
          return item;
        });
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          if (
            state.loading &&
            action.meta.requestId === state.currentRequestId
          ) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (
            state.loading &&
            action.meta.requestId === state.currentRequestId
          ) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      );
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
