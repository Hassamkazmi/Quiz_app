import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const AllQuizResultSlice = createSlice({
  name: "AllQuizResult",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    error: null, // Add error field to store error information
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuizResult.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.error = null; // Reset error on pending
      })
      .addCase(fetchAllQuizResult.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.error = null; // Reset error on success
      })
      .addCase(fetchAllQuizResult.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message; // Store the error message
      });
  },
});

export default AllQuizResultSlice.reducer;

export const fetchAllQuizResult = createAsyncThunk(
  "/AllQuizResultget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/Result`,
        config
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized here
        // For example, redirect to login page or display a message
        throw new Error("Unauthorized");
      } else {
        // For other errors, let the rejection handler in extraReducers handle them
        throw error;
      }
    }
  }
);
