import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const postUserCreation = createAsyncThunk(
  "postUserCreation/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/CreateUser`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const postUserCreationSlice = createSlice({
  name: "postUserCreation",
  initialState: {
    userdata: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearData: (state) => {
      state.userdata = null; // Reset the data to null or initial state
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserCreation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserCreation.fulfilled, (state, action) => {
        state.userdata = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "User Created Successfully";
      })
      .addCase(postUserCreation.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { clearData } = postUserCreationSlice.actions;
export default postUserCreationSlice.reducer;
