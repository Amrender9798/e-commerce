import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: null,
  exp: null,
};
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ username, email, password }) => {
    try {
      const response = await axios.post("http://localhost:8081/auth/register", {
        username,
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }
);
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:8081/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        console.log("HI I AM HERE SIGIN");
        const { token, name, email, expiresIn } = action.payload;
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("email",email);
        state.exp = expiresIn;
        state.success = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.success = false;
        state.exp = null;
      });
  },
});

export const selectAuth = (state) => state.authentication;
export const { logoutUser } = authSlice.actions;
// Export the reducer
export default authSlice.reducer;
