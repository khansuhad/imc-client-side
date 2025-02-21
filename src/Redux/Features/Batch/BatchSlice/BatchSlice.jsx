import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBatches = createAsyncThunk(
  "batches/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/filter-batches?name=${data?.searchTerm}`);
    return response.data;
  }
);
export const fetchBatchDetails = createAsyncThunk(
  "batch-details/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/batches?id=${data?.searchTerm}`);
    return response.data;
  }
);
export const fetchBatchesStudents = createAsyncThunk(
  "batch-students/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/batch-students?batch=${data?.searchTerm}`);
    console.log(response);
    return response.data;
  }
);
export const fetchClassBatches = createAsyncThunk(
  "class-batches/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/class-batches?studentClass=${data?.searchTerm}`);
    console.log(response);
    return response.data;
  }
);
export const fetchDuesAlert = createAsyncThunk(
  "dues-alert/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/filter-due-alert?batch=${data?.batch}&studentClass=${data?.studentClass}`);
    console.log(response);
    return response.data;
  }
);


const batchesSlice = createSlice({
  name: "batches",
  initialState: {
    batches: [],
    batchDetails: {},
    batchesStudents: [],
    status: "idle",
    classBatches : [],
    duesAlert : [],

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBatches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.batches = action.payload;
      })
      .addCase(fetchBatches.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchBatchesStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBatchesStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.batchesStudents = action.payload;
      })
      .addCase(fetchBatchesStudents.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchBatchDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBatchDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.batchDetails = action.payload;
      })
      .addCase(fetchBatchDetails.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchClassBatches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClassBatches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classBatches = action.payload;
      })
      .addCase(fetchClassBatches.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchDuesAlert.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDuesAlert.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.duesAlert = action.payload;
      })
      .addCase(fetchDuesAlert.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default batchesSlice.reducer;
