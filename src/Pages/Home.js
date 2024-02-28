// Home.js
import React, { useEffect } from "react";
import ProductList from "../Components/ProductList";
import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectFilteredData,
  selectProducts,
} from "../Redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredData);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar products={allProducts} />
      </div>
      <div className="flex-grow">
        <ProductList products={filteredProducts} />
        {/* Use filteredProducts, not selectFilteredData */}
      </div>
    </div>
  );
};

export default Home;
