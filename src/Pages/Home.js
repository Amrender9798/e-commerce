import React, { useEffect, useState } from "react";
import ProductList from "../Components/ProductList";
import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectFilteredData,
  selectProductError,
  selectProductLoading,
  selectProducts,
} from "../Redux/slices/productSlice";
import { CircularProgress, Pagination } from "@mui/material";
import { styled } from "@mui/system";

const CustomPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
  margin: "20px 0",
  "& .MuiPaginationItem-root": {
    fontSize: "1.5rem",
  },
});

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredData);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (loading) {
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

  if (error) {
    return <p>SERVER ERROR: {error}</p>;
  }

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar products={allProducts} />
      </div>
      <div className="flex-grow">
        <ProductList products={currentProducts} />
        <CustomPagination
          count={totalPages}
          size="large"
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
