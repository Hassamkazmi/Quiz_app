import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


export const postSubmitQuestion = createAsyncThunk(
  "postSubmitQuestion/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    try {
      const response = await axios.post(
        `http://localhost:5000/SubmitQuestion`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSubmitQuestionSlice = createSlice({
  name: "postSubmitQuestion",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.error = null;
      state.success= null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSubmitQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSubmitQuestion.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Answer Submitted Successfully";
      })
      .addCase(postSubmitQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
  },
});
export const { clearData } = postSubmitQuestionSlice.actions;
export default postSubmitQuestionSlice.reducer;
