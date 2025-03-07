import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotices = createAsyncThunk(
  "notices-details/fetch",
  async ({axiosInstance} ) => {
    const response = await axiosInstance.get(`/notices`);
    return response.data;
  }
);



const noticeSlice = createSlice({
  name: "notices",
  initialState: {
    notices: [],


  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notices = action.payload;
      })
      .addCase(fetchNotices.rejected, (state) => {
        state.status = "failed";
      });
   
  },
});

export default noticeSlice.reducer;
