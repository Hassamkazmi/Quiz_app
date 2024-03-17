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
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuizResult.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchAllQuizResult.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchAllQuizResult.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
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
    const res = await axios.get(
      `http://localhost:5000/Result`,
      config
    );
    const Data = res.data.data;
    return Data;
  }
);
