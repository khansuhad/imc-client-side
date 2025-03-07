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
export const fetchFeesCount = createAsyncThunk(
  "fees-count/fetch",
  async ({axiosInstance} ) => {
    const response = await axiosInstance.get(`/payment-count`);
    console.log(response);
    return response.data;
  }
);
export const fetchStudentPaymentHistory = createAsyncThunk(
  "student-payment-history/fetch",
  async ({ data , axiosInstance} ) => {
    const response = await axiosInstance.get(`/student-payment-history?id=${data?.searchTerm}`);
    console.log(response);
    return response.data;
  }
);

const feesSlice = createSlice({
  name: "fees",
  initialState: {
    transections: [],
    feesCount: 0,
    transectionDetails : {},
    status: "idle",
    studentPaymentHistory : []
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
      .addCase(fetchFeesCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeesCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feesCount = action.payload;
      })
      .addCase(fetchFeesCount.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchStudentPaymentHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentPaymentHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentPaymentHistory = action.payload;
      })
      .addCase(fetchStudentPaymentHistory.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default feesSlice.reducer;
