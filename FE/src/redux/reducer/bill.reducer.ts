import { TAddress } from "@/services/address.services";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type BillState = {
  address: TAddress;
};

const initialState: BillState = {
  address: {} as TAddress,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setBillAddress.fulfilled,
      (state, action: PayloadAction<TAddress>) => {
        state.address = action.payload;
      }
    );
  },
});

export const setBillAddress = createAsyncThunk(
  "bill/setAddress",
  async (address: TAddress) => {
    const response : TAddress = await new Promise((resolve) => resolve(address))
    return response;
  }
);

export const {} = billSlice.actions;
export default billSlice.reducer;
