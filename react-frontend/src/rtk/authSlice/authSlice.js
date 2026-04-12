import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "cookie-universal";
import axios from "axios";
import { bascURL, REGISTER } from "../../Api/Api";

const cookie = new Cookie();

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${bascURL}/${REGISTER}`, userData);
      const token = response.data.token;

      cookie.set("token", token, {
        path: "/",
      });

      return {
        token,
        user: response.data.user || null,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred during registration",
      );
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: cookie.get("token") || null,
    isLoading: false,
    error: null,
    isAuthenticated: !!cookie.get("token"),
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred during registration";
      });
  },
});
export const { clearError } = authSlice.actions;

export default authSlice.reducer;
