import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGallery = createAsyncThunk(
  "gallery-details/fetch",
  async ({axiosInstance} ) => {
    const response = await axiosInstance.get(`/gallery`);
    return response.data;
  }
);



const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    gallery: [],


  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gallery = action.payload;
      })
      .addCase(fetchGallery.rejected, (state) => {
        state.status = "failed";
      });
   
  },
});

export default gallerySlice.reducer;
