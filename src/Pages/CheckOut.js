import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckOut = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }
    console.log(totalAmount);
    // Create PaymentMethod
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Send paymentMethod.id to your server for further processing
      console.log("PaymentMethod:", paymentMethod);
      // Make an API call to complete the checkout on your server
      await handlePaymentOnServer(paymentMethod.id);
    }
  };

  const handlePaymentOnServer = async (paymentMethodId) => {
    try {
      const response = await fetch("YOUR_SERVER_PAYMENT_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary authentication headers
        },
        body: JSON.stringify({
          paymentMethodId,
          amount: totalAmount * 100, // Convert amount to cents (Stripe uses smallest currency unit)
        }),
      });

      const result = await response.json();

      // Handle the result from your server
      console.log("Server Response:", result);

      // Display a success or error message to the user
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
