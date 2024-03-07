import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "@/interfaces/asyncThunk";
import { GetOrderHistoryResponse, IBill } from "@/interfaces/bill";
import { IUser } from "@/interfaces/user";
import { User } from "@/interfaces/user.interface";
import { TAddress, addNewAddress } from "@/services/address.services";
import { Thongketaikhoanmoi } from "@/services/analyst/analyst";
import {
  deleteUserAddress,
  getAllUser,
  getUserAddress,
  getUserById,
  getUserOrderHistory,
  updateUserAddress,
  updateUserInfo,
} from "@/services/user/user";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type OrderHistoryResult = {
  items: IBill[];
  totalItem: number;
  itemPerPage: number;
  totalPage: number;
  currentPage: number;
};

interface UserState {
  user: IUser;
  users: User[];
  address: TAddress[];
  countUser: 0;
  userOrdersHistory: OrderHistoryResult;
  errorsMessage: string | undefined;
  isLoading: boolean;
  currentRequestId: undefined | string;
}

const initialState: UserState = {
  user: {} as IUser,
  users: [],
  address: [],
  countUser: 0,
  userOrdersHistory: {} as OrderHistoryResult,
  errorsMessage: undefined,
  isLoading: false,
  currentRequestId: undefined,
};

// asyncThunk
export const getAllUserState = createAsyncThunk(
  "user/getAllUser",
  async (_, thunkAPI) => {
    const response = await getAllUser(0, 5);
    return response.data;
  }
);
export const getAllUserByPage = createAsyncThunk("user/getAll", async (_, thunkAPI) => {
  const response = await getAllUser(0, 999);
  return response.data;
})
export const getCountUserState = createAsyncThunk(
  "user/getCountUser",
  async (data: any) => {
    const response = await Thongketaikhoanmoi(data);
    return response.data;
  }
);

export const getUserByIdState = createAsyncThunk(
  "user/getUserById",
  async (id: string, thunkAPI) => {
    const response = await getUserById(id);
    return response.data;
  }
);

interface UpdateUserInfoParams {
  id: string;
  data: {
    [key: string]: number | string | boolean;
  };
}
export const updateUserInfoState = createAsyncThunk(
  "user/updateUserInfo",
  async (value: UpdateUserInfoParams, thunkAPI) => {
    const { id, data } = value;
    const response = await updateUserInfo(id, data);
    return response.data;
  }
);

// address
type AddNewAddressStateParams = {
  user_id: string;
  data: {
    city: string;
    district: string;
    wards: string;
    detailAddress: string;
  };
};
export const addNewAddressState = createAsyncThunk(
  "user/addNewAddress",
  async ({ user_id, data }: AddNewAddressStateParams, thunkAPI) => {
    const response = await addNewAddress(user_id, data);
    return response.data;
  }
);

export const getAddressByUserIdState = createAsyncThunk(
  "user/getAddressByUserId",
  async (id: string, thunkAPI) => {
    const response = await getUserAddress(id);
    return response.results;
  }
);

type TDeleteAddress = {
  user_id: string;
  address_id: string;
};
export const deleteAddressState = createAsyncThunk(
  "user/deleteAddress",
  async ({ user_id, address_id }: TDeleteAddress, thunkAPI) => {
    const response = await deleteUserAddress(user_id, address_id);
    return response.data;
  }
);

type TUpdateAddress = {
  user_id: string;
  address_id: string;
  data: {
    [key: string]: string | boolean;
  };
};
export const updateUserAddressState = createAsyncThunk(
  "user/updateAddress",
  async ({ user_id, address_id, data }: TUpdateAddress, thunkAPI) => {
    const response = await updateUserAddress(user_id, address_id, data);
    return response.data;
  }
);

type GetUserOrdersHistory = {
  user_id: string;
  page: number;
  limit: number;
  caseStatus: string;
};

export const getUserOrdersHistory = createAsyncThunk(
  "user/ordersHistory",
  async (
    { user_id, page, limit, caseStatus }: GetUserOrdersHistory,
    { fulfillWithValue, rejectWithValue, signal }
  ) => {
    try {
      const response = await getUserOrderHistory(
        user_id,
        page,
        limit,
        caseStatus,
        signal
      );

      return fulfillWithValue(response.data.result);
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response.status === 404) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUserState.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUserByPage.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUserByIdState.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserInfoState.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addNewAddressState.fulfilled, (state, action) => {
        state.address.push(action.payload);
      })
      .addCase(getAddressByUserIdState.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      .addCase(deleteAddressState.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      .addCase(updateUserAddressState.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      .addCase(
        getUserOrdersHistory.fulfilled,
        (state, action: PayloadAction<OrderHistoryResult>) => {
          state.userOrdersHistory = action.payload;
        }
      ),
      builder
        .addCase(getCountUserState.fulfilled, (state, action) => {
          if (!action.payload[0]) {
            state.countUser = 0;
          } else {
            state.countUser = action.payload[0]?.totalNewUsers;
          }
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
          }
        );
  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
