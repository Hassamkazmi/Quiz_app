import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getRoomAccessSlice = createSlice({
  name: "getRoomAccess",
  initialState: {
    data: [],
    status: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetRoomAccess.pending, (state, action) => {
        state.status = false;
      })
      .addCase(fetchgetRoomAccess.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = true;
      })
      .addCase(fetchgetRoomAccess.rejected, (state, action) => {
        state.status = false;
      });
  },
});

export default getRoomAccessSlice.reducer;

export const fetchgetRoomAccess = createAsyncThunk(
  "/getRoomAccessget/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `http://localhost:5000/AccessRoom/${id}`,
      config
    );
    const Data = res.data;
    return Data;
  }
);
