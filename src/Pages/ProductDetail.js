import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Review from "../Components/Review";
import CircularProgress from "@mui/material/CircularProgress";
import {
  fetchProductById,
  selectProductById,
  selectProducts,
} from "../Redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/slices/cartSlice"; // Import your cart action

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && product.stockQuantity) {
      const options = Array.from(
        { length: product.stockQuantity },
        (_, index) => index + 1
      );
      setQuantityOptions(options);
    }
  }, [product]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    dispatch(addToCart({ productId, quantity: selectedQuantity }));
    toast.success("Product added to cart");
  };

  if (!product) {
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
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-md shadow-md">
      <div className="flex justify-center">
        <img
          src={`http://localhost:8081/${product.images}`}
          alt={product.productName}
          className="w-96 h-96 object-center rounded-md"
        />
        <div className="ml-8 w-96 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">{product.productName}</h2>

          <p className="text-blue-600 text-lg font-semibold mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Quantity Dropdown */}
          <div className="flex items-center mb-4">
            <label className="text-gray-700 mr-2">Quantity</label>
            <select
              className="border p-2 w-20"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
            >
              {quantityOptions.map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md mb-4 hover:bg-blue-700"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Review productId={productId} />
    </div>
  );
};

export default ProductDetail;
