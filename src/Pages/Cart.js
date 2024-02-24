import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteCartItem,
  fetchCart,
  selectCart,
} from "../Redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const deleteCartItemHandler = async (productId) => {
    try {
      dispatch(deleteCartItem(productId));
      toast.success("Product removed from cart");
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const calculateSubtotal = (item) => {
    return item.quantity * item.productId.price;
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    // Update the local state with the new quantity
    // You may also want to send the updated quantity to the server
  };

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="h-screen bg-gray-100 pt-10">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                src={`http://localhost:8081/${item.productId.images}`}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.productId.productName}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    ₹ {item.productId.price}
                  </p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex justify-end items-center border-gray-100">
                    <select
                      className="h-8 w-16 border bg-white text-xs outline-none"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId._id, e.target.value)
                      }
                    >
                      {[...Array(item.productId.stockQuantity)].map(
                        (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div
                    className="flex items-center space-x-4"
                    onClick={() => deleteCartItem(item.productId._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          {/* ... (remaining code for sub total) */}
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹ {calculateTotal()}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">₹ 100</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">GST</p>
            <p className="text-gray-700">₹ 1000</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                ₹ {calculateTotal() + 1100}
              </p>
            </div>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handleCheckOut}
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
