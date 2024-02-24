// Your component file
import { useDispatch } from "react-redux";
import { createOrder } from "../Redux/slices/orderSlice";

const YourComponent = () => {
  const dispatch = useDispatch();

  // Your logic to get order data (user, products, amount, status)
  const orderData = {
    user: "user_id",
    products: [
      { productId: "product_id_1", quantity: 2 },
      { productId: "product_id_2", quantity: 1 },
      // Add more products as needed
    ],
    amount: 500, // Replace with the actual amount
    status: "Pending", // Replace with the actual status
  };

  const handleCreateOrder = async () => {
    try {
      // Dispatch the async thunk
      console.log(orderData);
      dispatch(createOrder(orderData));

      // Optionally, you can handle success or navigate to a different page
      console.log("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error
    }
  };

  return (
    <div>
      {/* Your component JSX */}
      <button
        onClick={handleCreateOrder}
        className="flex items-center justify-center"
      >
        Create Order
      </button>
    </div>
  );
};

export default YourComponent;
