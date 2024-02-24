// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import reviewReducer from './slices/reviewSlice';
import authenticationReducer from './slices/authenticationSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    review: reviewReducer,
    authentication: authenticationReducer,
    order: orderReducer,
  },
});

export default store;
