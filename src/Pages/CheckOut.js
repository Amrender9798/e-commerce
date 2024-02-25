import React, { useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../Redux/slices/orderSlice";
import { emptyCart, fetchCart, selectCart } from "../Redux/slices/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckOut = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { id, data } = useSelector(selectCart);
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    console.log(totalAmount);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      await handlePaymentOnServer(paymentMethod.id);
    }
  };

  const handlePaymentOnServer = async (paymentMethodId) => {
    try {
      const response = await fetch("YOUR_SERVER_PAYMENT_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId,
          amount: totalAmount * 100,
        }),
      });

      const result = await response.json();

      console.log("Server Response:", result);

      if (result.success) {
        alert("Payment successful!");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment on server:", error);
      alert("Payment failed. Please try again.");
    }
  };
  const calculateSubtotal = (item) => {
    return item.quantity * item.productId.price;
  };
  const calculateTotal = () => {
    return data.reduce((total, item) => total + calculateSubtotal(item), 0);
  };
  const handlePayClick = () => {
    try {
      console.log(121);
      console.log(JSON.stringify(data, null, 2));
      const products = data.map((item) => ({
        productName: item.productId.productName,
        price: item.productId.price,
        quantity: item.quantity,
      }));
      const amount = data.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      );
      console.log(products, amount);
      dispatch(createOrder({products, amount}));
      dispatch(emptyCart());
      toast.success("Order successfully placed!");
    } catch (error) {
      console.error(error);
    }
  };
  if (true) {
    return (
      <button
        className="bg-blue-500 text-white py-20 px-40 rounded-md cursor-pointer hover:bg-blue-700"
        onClick={handlePayClick}
      >
        Pay Now
      </button>
    );
  }

  return (
    <form
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Card Number
        </label>
        <CardNumberElement className="p-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="flex mb-6">
        <div className="w-1/2 mr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Expiration Date
          </label>
          <CardExpiryElement className="p-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CVC
          </label>
          <CardCvcElement className="p-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-700"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckOut;
