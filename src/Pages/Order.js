import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import OrderDetail from "../Components/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersForUser, selectOrder } from "../Redux/slices/orderSlice";

function Order() {
  const dispatch = useDispatch();
  const { orderData, loading } = useSelector(selectOrder);

  useEffect(() => {
    dispatch(fetchOrdersForUser());
  }, []);

  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto myorder-main-container p-8">
          {orderData.length === 0 ? (
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
              {orderData.map((order, i) => (
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
