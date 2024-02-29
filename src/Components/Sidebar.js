import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { categoryFilter, priceFilter, ratingFilter } from "../Redux/slices/productSlice";

const Sidebar = ({ products }) => {
  const dispatch = useDispatch();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [priceRangeOptions, setPriceRangeOptions] = useState([]);
  const [ratingOptions, setRatingOptions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const ratings = useMemo(() => {
    return Array.from({ length: 3 }, (_, index) => ({
      id: index + 1,
      name: `More than ${index + 2} stars`,
      checked: false,
    }));
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].map(
      (category, index) => ({
        id: index + 1,
        name: category,
        checked: false,
      })
    );
  }, [products]);

  const maxPriceValue = useMemo(
    () => Math.max(...products.map((product) => product.price)),
    [products]
  );

  const priceRanges = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const min = (index * maxPriceValue) / 5;
      const max = ((index + 1) * maxPriceValue) / 5;
      return {
        id: index + 1,
        name: `₹${min} - ₹${max}`,
        min,
        max,
        checked: false,
      };
    });
  }, [maxPriceValue]);

  useEffect(() => {
    setCategoryOptions(
      categories.map((category) => ({ ...category, checked: false }))
    );
    setPriceRangeOptions(
      priceRanges.map((range) => ({ ...range, checked: false }))
    );
    setRatingOptions(ratings.map((rating) => ({ ...rating, checked: false })));
  }, [categories, priceRanges, ratings]);

  useEffect(() => {
    // Get selected categories
    const selectedCategories = categoryOptions
      .filter((category) => category.checked)
      .map((category) => category.name);

    // Dispatch the categoryFilter action with selected categories
    dispatch(categoryFilter(selectedCategories));
  }, [categoryOptions, dispatch]);

  function handleCategoryChange(categoryId) {
    setCategoryOptions((prevOptions) =>
      prevOptions.map((category) =>
        category.id === categoryId
          ? { ...category, checked: !category.checked }
          : category
      )
    );
  }
  useEffect(() => {
    const selectedPriceRange = priceRangeOptions.find((range) => range.checked);
    dispatch(
      priceFilter(
        selectedPriceRange
          ? { min: selectedPriceRange.min, max: selectedPriceRange.max }
          : null
      )
    );
  }, [priceRangeOptions, dispatch]);

  function handlePriceChange(priceId) {
    setPriceRangeOptions((prevOptions) =>
      prevOptions.map((range) => ({
        ...range,
        checked: range.id === priceId && !range.checked,
      }))
    );
  }
  useEffect(() => {
    const selectedRatingRange = ratingOptions.find((range) => range.checked);
    dispatch(ratingFilter(selectedRatingRange ? selectedRatingRange.id + 1 : null));
  }, [ratingOptions, dispatch]);

  function handleRatingChange(ratingId) {
    setRatingOptions((prevOptions) =>
      prevOptions.map((range) => ({
        ...range,
        checked: range.id === ratingId && !range.checked,
      }))
    );
  }
  

  function handleGoButtonClick() {
    if (minPrice == "" && maxPrice == "") {
      dispatch(priceFilter({ min: 0, max: maxPriceValue }));
    } else if (minPrice == "") {
      dispatch(priceFilter({ min: 0, max: maxPrice }));
    } else if (maxPrice == "") {
      dispatch(priceFilter({ min: minPrice, max: maxPriceValue }));
    } else {
      dispatch(priceFilter({ min: minPrice, max: maxPrice }));
    }
  }

  return (
    <div className="bg-gray-800 text-white overflow-y-auto  sticky top-0 h-screen">
      <ul>
        <li className="p-4">
          <label className="block mb-2 text-xl">Category</label>
          {categoryOptions.map((category) => (
            <div key={category.id} className="mb-2">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={category.checked}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`} className="ml-2">
                {category.name}
              </label>
            </div>
          ))}

          <label className="block mt-4 mb-2 text-xl">Rating</label>
          {ratingOptions.map((rating) => (
            <div key={rating.id} className="mb-2">
              <input
                type="radio"
                id={`rating-${rating.id}`}
                checked={rating.checked}
                onClick={() => handleRatingChange(rating.id)}
              />
              <label htmlFor={`rating-${rating.id}`} className="ml-2">
                {rating.name}
              </label>
            </div>
          ))}

          {/* Price Range Options */}
          <label className="block mt-4 mb-2 text-xl">Price Range</label>
          {priceRangeOptions.map((range, index) => (
            <div
              key={range.id}
              className={index === priceRangeOptions.length - 1 ? "" : "mb-2"}
            >
              <input
                type="radio"
                id={`price-${range.id}`}
                checked={range.checked}
                onClick={() => handlePriceChange(range.id)}
              />
              <label htmlFor={`price-${range.id}`} className="ml-2">
                {range.name}
              </label>
            </div>
          ))}
        </li>
        <li className="px-4 flex space-x-2 mb-6 text-black">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 px-2 py-1 border rounded"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 px-2 py-1 border rounded"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleGoButtonClick}
          >
            Go
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
