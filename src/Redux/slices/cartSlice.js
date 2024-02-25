import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/cart/add",
        {
          productId,
          quantity,
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
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const response = await axios.get("http://localhost:8081/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to delete an item from the cart
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (productId) => {
    try {
      await axios.delete("http://localhost:8081/cart/remove", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          productId: productId,
        },
      });
      return productId;
    } catch (error) {
      throw error;
    }
  }
);

export const emptyCart = createAsyncThunk("cart/emptyCart", async () => {
  try {
    await axios.delete("http://localhost:8081/cart/empty", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    throw error;
  }
});
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.cart;
        state.id = action.payload.cartId;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (item) => item.productId._id !== action.payload
        );
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(emptyCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [];
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
