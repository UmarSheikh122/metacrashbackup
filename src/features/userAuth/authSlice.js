import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

//login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      return await authService.login(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
//register user

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (err) {
      console.log("err", err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (data, thunkAPI) => {
    try {
      return await authService.verifyEmail(data);
    } catch (err) {
      console.log("err", err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  user: {},
  loading: false,
  error: null,
  loginStatus: false,
  signUpMessage: "",
  verifyUserMessage: "",
  successMessage: false,
  allUsers: [],
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("state", state.loading);
    },
    logout: (state) => {
      console.log("logout");
      state.user = null;
      state.loginStatus = false;
      localStorage.removeItem("token");
      localStorage.clear();
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        console.log("state", state);
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loginStatus = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log("payload", payload);
        state.loading = false;
        state.loginStatus = true;
        state.user = payload;
        // login successful
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //varify email
      .addCase(verifyUser.pending, (state, { payload }) => {
        console.log("payload", payload);
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        console.log("payload", payload);
        state.loading = false;
        state.verifyUserMessage = payload.data.result;
      })
      .addCase(verifyUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default loginSlice.reducer;
export const userAuthSelector = (state) => state.user;
export const errorSelector = (state) => state.user.error;
export const { reset, logout } = loginSlice.actions;
