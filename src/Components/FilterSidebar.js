// src/components/FilterSidebar.js
import React, { useState } from "react";

const FilterSidebar = ({ applyFilters }) => {
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 100000 });
  const [categoryFilters, setCategoryFilters] = useState([]);

  const handleCategoryChange = (category) => {
    const updatedCategories = categoryFilters.includes(category)
      ? categoryFilters.filter((c) => c !== category)
      : [...categoryFilters, category];

    setCategoryFilters(updatedCategories);
  };

  const handleApplyFilters = () => {
    applyFilters({ price: priceFilter, category: categoryFilters });
  };

  return (
    <div className="fixed top-1/4 left-0 h-full p-4">
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Price Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Price Range
          </label>
          <div className="flex items-center">
            <span className="mr-2">₹{priceFilter.min}</span>
            <input
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={priceFilter.min}
              onChange={(e) =>
                setPriceFilter({ ...priceFilter, min: Number(e.target.value) })
              }
              className="flex-1"
            />
            <span className="ml-2">₹{priceFilter.max}</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <div className="flex flex-col">
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                onChange={() => handleCategoryChange("Laptop")}
                checked={categoryFilters.includes("Laptop")}
              />
              <span className="ml-2">Laptop</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                onChange={() => handleCategoryChange("TV")}
                checked={categoryFilters.includes("TV")}
              />
              <span className="ml-2">TV</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                onChange={() => handleCategoryChange("Camera")}
                checked={categoryFilters.includes("Camera")}
              />
              <span className="ml-2">Camera</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                onChange={() => handleCategoryChange("Phone")}
                checked={categoryFilters.includes("Phone")}
              />
              <span className="ml-2">Phone</span>
            </label>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={handleApplyFilters}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
