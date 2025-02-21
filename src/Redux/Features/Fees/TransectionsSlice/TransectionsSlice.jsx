import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransections = createAsyncThunk(
  "fees-lists/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/filter-payments?name=${data?.searchTerm}`);
    console.log(response);
    return response.data;
  }
);
export const fetchTransectionDetails = createAsyncThunk(
  "fees-details/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/payment/${data?.searchTerm}`);
    console.log(response);
    return response.data;
  }
);
export const fetchTransectionsCount = createAsyncThunk(
  "fees-count/fetch",
  async ({axiosInstance} ) => {
    const response = await axiosInstance.get(`/payment-count`);
    console.log(response);
    return response.data;
  }
);

const transectionsSlice = createSlice({
  name: "transections",
  initialState: {
    transections: [],
    transectionCount: 0,
    transectionDetails : {},
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transections = action.payload;
      })
      .addCase(fetchTransections.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchTransectionDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransectionDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transectionDetails = action.payload;
      })
      .addCase(fetchTransectionDetails.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchTransectionsCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransectionsCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transectionCount = action.payload;
      })
      .addCase(fetchTransectionsCount.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default transectionsSlice.reducer;
