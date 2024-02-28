// reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  reviews: [],
  status: "idle",
  error: null,
};

// Define an asynchronous thunk for fetching reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId) => {
     // Assuming you have an auth slice to manage authentication

    const response = await axios.get(`http://localhost:8081/reviews/${productId}`);

    return response.data;
  }
);

// Define an asynchronous thunk for adding a review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ productId, reviewText, rating }) => {
    const token = localStorage.getItem("token"); // Assuming you have an auth slice to manage authentication

    const response = await axios.post(
      "http://localhost:8081/reviews/add",
      { productId, reviewText, rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

// Create a slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectReview = (state) => state.review.reviews;


export default reviewSlice.reducer;
