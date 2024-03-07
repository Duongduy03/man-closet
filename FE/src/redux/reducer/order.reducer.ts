import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "@/interfaces/asyncThunk";
import { IBill } from "@/interfaces/bill";
import { ProductSold } from "@/interfaces/product";
import {
  Thongkedoanhthu,
  Thongkedonhang,
  Top5UserMuaHang,
  getProductSold,
} from "@/services/analyst/analyst";
import {
  getAllOrderBill,
  getBillById,
  getOrders,
  updateBill,
} from "@/services/order/order";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrderState {
  productSold: ProductSold[];
  orders: IBill[];
  order: IBill;
  paginate: {
    totalItem: number | undefined;
    itemPerPage: number | undefined;
    totalPage: number | undefined;
    currentPage: number | undefined;
  };
  countBill: number;
  doanhthu: number;
  isLoading: boolean;
  currentRequestId: string | undefined;
  errorMessage: string | undefined;
  users: any; //mảng chứa các user đã chi tiêu trong tháng
}
interface IUpdateProps {
  billId: string;
  status: string;
}
const initialState: OrderState = {
  productSold: [],
  orders: [],
  paginate: {
    totalItem: undefined,
    itemPerPage: undefined,
    totalPage: undefined,
    currentPage: undefined,
  },
  order: {} as IBill,
  countBill: 0,
  doanhthu: 0,
  users: [],
  isLoading: false,
  currentRequestId: undefined,
  errorMessage: undefined,
};
//THống kê
export const getProductSoldState = createAsyncThunk(
  "order/getProductSold",
  async (data: any) => {
    const response = await getProductSold(data);
    return response.data;
  }
);

export const getAllOrderBillState = createAsyncThunk(
  "order/getAllOrderBill",
  async (_, thunkAPI) => {
    const response = await getAllOrderBill(0, Number.MAX_SAFE_INTEGER);
    return response.data;
  }
);
export const getCountBillState = createAsyncThunk(
  "order/getCountBill",
  async (data: any) => {
    const response = await Thongkedonhang(data);
    return response.data;
  }
);
export const getDoanhThuState = createAsyncThunk(
  "order/getDoanhThu",
  async (data: any) => {
    const response = await Thongkedoanhthu(data);
    return response.data;
  }
);
export const topUserChiTieu = createAsyncThunk(
  "order/getUserChiTieu",
  async (data: any) => {
    const response = await Top5UserMuaHang(data);
    return response.data;
  }
);
type TUpdateParams = {
  billId: string;
  orderStatus: string;
  paymentStatus: string;
};
export const changeStatusBillState = createAsyncThunk(
  "order/updateStatusBillState",
  async (data: TUpdateParams) => {
    const { billId, orderStatus, paymentStatus } = data;
    const response = await updateBill(billId, orderStatus, paymentStatus);
    return response.data;
  }
);

export const getBillByIdAsync = createAsyncThunk(
  "order/getUserById",
  async (bill_id: string, { signal, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await getBillById(bill_id, signal);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response.status === 404) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

type TGetOrderParams = {
  page?: number;
  limit?: number;
  orderStatus?: string;
  paymentStatus?: string;
};
export const getOrdersAsync = createAsyncThunk(
  "order/getOrders",
  async (
    { limit, page, orderStatus, paymentStatus }: TGetOrderParams,
    { rejectWithValue, fulfillWithValue, signal }
  ) => {
    try {
      const response = await getOrders(
        page,
        limit,
        orderStatus,
        paymentStatus,
        signal
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProductSoldState.fulfilled, (state, action) => {
      state.productSold = action.payload;
    }),
      builder.addCase(getAllOrderBillState.fulfilled, (state, action) => {
        state.orders = action.payload;
      }),
      builder.addCase(getCountBillState.fulfilled, (state, action) => {
        state.countBill = action.payload?.[0]?.totalOrders;
      });
    builder.addCase(getDoanhThuState.fulfilled, (state, action) => {
      state.doanhthu = action.payload?.[0]?.totalAmountSold;
    });
    builder.addCase(topUserChiTieu.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder
      .addCase(changeStatusBillState.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orders.find((item, index) => {
          if (item._id === action.payload._id) {
            state.orders[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(getBillByIdAsync.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload.items;
        state.paginate = {
          totalItem: action.payload.totalItem,
          itemPerPage: action.payload.itemPerPage,
          currentPage: action.payload.currentPage,
          totalPage: action.payload.totalPage,
        };
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.isLoading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (
            state.isLoading &&
            action.meta.requestId === state.currentRequestId
          ) {
            state.isLoading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          if (
            state.isLoading &&
            action.meta.requestId === state.currentRequestId
          ) {
            state.isLoading = false;
            state.currentRequestId = undefined;
          }
          state.errorMessage = action.payload as string;
        }
      );
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
