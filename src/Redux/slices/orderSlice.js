// slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ products, amount }) => {
    try {
      console.log(products, amount);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/orders/create",
        {
          products,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchOrdersForUser = createAsyncThunk(
  "orders/fetchOrdersForUser",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8081/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(JSON.stringify(response.data, null, 2));
      return response.data.userOrders;
    } catch (error) {
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrdersForUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrdersForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectOrder = (state) => state.order;
export default orderSlice.reducer;
