// productSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:8081/products");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/products/${productId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
    filters: {
      category: [],
      price: null,
      search: "",
      rating: null,
    },
  },
  reducers: {
    categoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    priceFilter: (state, action) => {
      state.filters.price = action.payload;
    },
    searchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    ratingFilter: (state, action) => {
      console.log("ratingFilter", action.payload);
      state.filters.rating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const selectFilteredData = (state) => {
  const { data, filters } = state.product;
  const { category, price, rating, search } = filters;
  let filteredData = data;
  if (price) {
    const { min, max } = price;
    filteredData = filteredData.filter(
      (product) => product.price > min && product.price < max
    );
  }
  if (category.length > 0) {
    filteredData = filteredData.filter((product) =>
      category.includes(product.category)
    );
  }
  if (rating) {
    filteredData = filteredData.filter((product) => 
       product.rating.stars / product.rating.users > rating
    );
  }
  if (search.trim() !== "") {
    filteredData = filteredData.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
  }
  return filteredData;

  // Apply filters to data
};
export const selectProducts = (state) => state.product.data;
export const { categoryFilter, priceFilter, ratingFilter, searchFilter } =
  productSlice.actions;
export default productSlice.reducer;
