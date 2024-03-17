import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getGenderSlice = createSlice({
  name: "getGender",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetGender.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetGender.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetGender.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getGenderSlice.reducer;

export const fetchgetGender = createAsyncThunk(
  "/getGenderget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `http://localhost:5000/GenderListing`,
      config
    );
    const Data = res.data.data;
    return Data;
  }
);
