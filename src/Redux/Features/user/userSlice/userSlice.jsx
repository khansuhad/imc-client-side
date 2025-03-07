
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetUserInfo = createAsyncThunk(
  "user-info/fetch",
  async (email) => {
    const response = await axios.get(`/api/users?email=${email}`);
    return response.data;
  }
);


const userSlice = createSlice({
  name: "admissions",
  initialState: {
  userInfo : {},
  status : "false"
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;

      })
      .addCase(fetchGetUserInfo.rejected, (state) => {
        state.status = "failed";
      });
   
  },
});

export default userSlice.reducer;