import { TDistrict, TProvince, TWard, addNewAddress, getDistrictByProvinceId, getProvinces, getWardByDistrictId } from "@/services/address.services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  provinces: TProvince[],
  districts: TDistrict[],
  wards: TWard[]
}

const initialState: TInitialState = {
  provinces: [],
  districts: [],
  wards: []
}

// asyncThunk
export const getProvincesState = createAsyncThunk(
  "address/getProvinces",
  async (_, thunkAPI) => {
    const response = await getProvinces()
    return response.results
  }
)
export const getDistrictsState = createAsyncThunk(
  "address/getDistricts",
  async (id: string, thunkAPI) => {
    const response = await getDistrictByProvinceId(id)
    return response.results
  }
)
export const getWardsState = createAsyncThunk(
  "address/getWards",
  async (id: string, thunkAPI) => {
    const response = await getWardByDistrictId(id)
    return response.results
  }
)



const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProvincesState.fulfilled, (state, action) => {
      state.provinces = action.payload
    }),
      builder.addCase(getDistrictsState.fulfilled, (state, action) => {
        state.districts = action.payload
      }),
      builder.addCase(getWardsState.fulfilled, (state, action) => {
        state.wards = action.payload
      })
  }
})

export const { } = addressSlice.actions
export default addressSlice.reducer;