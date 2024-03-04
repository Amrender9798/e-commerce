// OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-green-500">
          Order Successful!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for your order. Your payment has been processed
          successfully.
        </p>
        <div className="mb-4">
          <strong className="text-gray-800">Order ID:</strong> #123456
        </div>
        <div className="mb-4">
          <strong className="text-gray-800">Estimated Delivery:</strong> March
          10, 2024
        </div>
        <p className="text-gray-700">
          You will receive an email with detailed information shortly.
        </p>
        <div className="mt-8">
          <Link to="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
