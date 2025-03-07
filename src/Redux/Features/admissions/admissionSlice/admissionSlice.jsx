import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdmissions = createAsyncThunk(
  "admissions/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/filter-admissions?name=${data?.searchTerm}`);
    return response.data;

  }
);
export const fetchPendingAdmissions = createAsyncThunk(
  "pending-admissions/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/filter-pending-admissions?name=${data?.searchTerm}`);
    return response.data;

  }
);
export const fetchPendingAdmissionInfo = createAsyncThunk(
  "pending-admissions-info/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/pending-admissions/${data?.searchTerm}`);
    return response.data;

  }
);
export const fetchStudentDetails = createAsyncThunk(
  "student-info/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/admissions/${data?.searchTerm}`);
    return response.data;

  }
);
export const fetchRegistrationNo = createAsyncThunk(
  "registration-No/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/admissions/registration-number-check/${data?.searchTerm}`);
    return response.data;

  }
);
export const fetchRollNo = createAsyncThunk(
  "roll-No/fetch",
  async ({data ,axiosInstance} ) => {
    const response = await axiosInstance.get(`/admissions-roll-number-check?rollNo=${data?.searchTerm}&batch=${data?.batch}`);
    return response.data;

  }
);

const admissionSlice = createSlice({
  name: "admissions",
  initialState: {
    currentStudents: [],
    studentInfo : {},
    checkRegistrationNo: false ,
    checkRollNo: false ,
    status: "idle",
    pendingAdmissions: [],
    pendingAdmissionInfo : {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentStudents = action.payload;
      })
      .addCase(fetchAdmissions.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchStudentDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentInfo = action.payload;
      })
      .addCase(fetchStudentDetails.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchRegistrationNo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegistrationNo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkRegistrationNo = action.payload?.result;
      })
      .addCase(fetchRegistrationNo.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchRollNo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRollNo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkRollNo = action.payload?.result;
      })
      .addCase(fetchRollNo.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchPendingAdmissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPendingAdmissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pendingAdmissions = action.payload;
      })
      .addCase(fetchPendingAdmissions.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchPendingAdmissionInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPendingAdmissionInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pendingAdmissionInfo = action.payload;
      })
      .addCase(fetchPendingAdmissionInfo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default admissionSlice.reducer;
