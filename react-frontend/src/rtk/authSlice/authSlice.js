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
    role: null,
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
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.role = state.role;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred during login";
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.role = null;
      });
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${bascURL}/login`, userData);
      const token = response.data.token;
      const role = response.data.user?.role || null;

      cookie.set("token", token, { path: "/" });

      return {
        token,
        user: response.data.user || null,
        role: role,
      };
    } catch (error) {
      let errorMessage = "An error occurred during login";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Invalid email or password";
      } else if (error.request) {
        errorMessage = "Unable to connect to the server";
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
