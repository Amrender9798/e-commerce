import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import OrderDetail from "../Components/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersForUser, selectOrder } from "../Redux/slices/orderSlice";

const dummyOrders = [
  {
    date: "2022-05-01",
    list: [
      { name: "Product A", price: 20, quantity: 2 },
      { name: "Product B", price: 30, quantity: 1 },
    ],
    amount: 70,
    status: "Pending",
  },
  {
    date: "2022-05-05",
    list: [
      { name: "Product C", price: 25, quantity: 3 },
      { name: "Product D", price: 40, quantity: 1 },
    ],
    amount: 155,
    status: "Delivered",
  },
  {
    date: "2022-05-10",
    list: [
      { name: "Product E", price: 15, quantity: 4 },
      { name: "Product F", price: 35, quantity: 2 },
    ],
    amount: 170,
    status: "Shipped",
  },
];

function Order() {
  const [myorders, setMyOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { orderData } = useSelector(selectOrder);
  useEffect(() => {
    // Simulate an API call or data fetching
    setTimeout(() => {
      setMyOrders(dummyOrders);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    dispatch(fetchOrdersForUser());
    console.log(JSON.stringify(orderData, null, 2));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto myorder-main-container p-8">
          {myorders.length === 0 ? (
            <>
              <h1 className="text-xl font-semibold mb-4 myorder-no-order-message">
                You haven't placed any order yet !!
              </h1>
              <Link
                to="/"
                className="text-blue-500 hover:underline myorder-start-shopping-link"
              >
                Start Shopping
              </Link>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 myorder-order-list-container">
              {myorders.map((order, i) => (
                <OrderDetail key={i} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Order;
