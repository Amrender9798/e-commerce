import React, { useEffect } from "react";
import ProductList from "../Components/ProductList";
import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "../Redux/slices/productSlice";
import CircularProgress from "@mui/material/CircularProgress";
const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  useEffect(() => {
    dispatch(fetchProducts());   
  }, [dispatch]);
  if (!products) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar products={products} />
      </div>
      <div className="flex-grow">
        {products && <ProductList products={products} />}
      </div>
    </div>
  );
};

export default Home;
