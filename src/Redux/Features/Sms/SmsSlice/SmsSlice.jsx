import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSmsHistory = createAsyncThunk(
  "sms-history/fetch",
  async (axiosInstance ) => {
    const response = await axiosInstance.get(`/sms`);
    console.log(response);
    return response.data;
  }
);


const smsSlice = createSlice({
  name: "sms",
  initialState: {
    smsHistory: [],

    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmsHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSmsHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.smsHistory = action.payload;
      })
      .addCase(fetchSmsHistory.rejected, (state) => {
        state.status = "failed";
      });

  },
});

export default smsSlice.reducer;
