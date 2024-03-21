import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const AllQuizQuestionsSlice = createSlice({
  name: "AllQuizQuestions",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuizQuestions.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchAllQuizQuestions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchAllQuizQuestions.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchAllQuizQuestionsreset.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchAllQuizQuestionsreset.fulfilled, (state, action) => {
        state.data = null;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchAllQuizQuestionsreset.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default AllQuizQuestionsSlice.reducer;

export const fetchAllQuizQuestions = createAsyncThunk(
  "/AllQuizQuestionsget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `http://localhost:5000/AllQuizQuestions`,
      config
    );
    const Data = res.data;
    return Data;
  }
);


export const fetchAllQuizQuestionsreset = createAsyncThunk(
  "/AllQuizQuestionsgetreset/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `http://localhost:5000/AllQuizQuestions`,
      config
    );
    const Data = res.data;
    return Data;
  }
);