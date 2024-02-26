import React, { useState, useEffect, useMemo } from "react";

const Sidebar = ({ products }) => {
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    priceRanges: [],
    ratings: [],
  });

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].map(
      (category, index) => ({
        id: index + 1,
        name: category,
        checked: false,
      })
    );
  }, [products]);

  const maxPrice = useMemo(
    () => Math.max(...products.map((product) => product.price)),
    [products]
  );

  const priceRanges = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      name: `₹${(index * maxPrice) / 5} - ₹${((index + 1) * maxPrice) / 5}`,
      checked: false,
    }));
  }, [maxPrice]);

  const ratings = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      name: `${index + 1} Star`,
      checked: false,
    }));
  }, []);

  useEffect(() => {
    // Set the filter options once products are available
    setFilterOptions({
      categories: categories.map((category) => ({
        ...category,
        checked: false,
      })),
      priceRanges: priceRanges.map((range) => ({
        ...range,
        checked: false,
      })),
      ratings: ratings.map((rating) => ({
        ...rating,
        checked: false,
      })),
    });
  }, [categories, priceRanges, ratings]);

  const handleCheckboxChange = (categoryType, id) => {
    console.log("Checkbox clicked:", categoryType, id);
    setFilterOptions((prevFilterOptions) => {
      const updatedOptions = {
        ...prevFilterOptions,
        [categoryType]: prevFilterOptions[categoryType].map((option) => {
          if (categoryType === "priceRanges") {
            // For priceRanges, uncheck all other checkboxes
            return { ...option, checked: option.id === id };
          } else {
            // For other categories, toggle the clicked checkbox
            return {
              ...option,
              checked: option.id === id ? !option.checked : option.checked,
            };
          }
        }),
      };
      return updatedOptions;
    });
  };

  return (
    <div className="bg-gray-800 text-white w-64 overflow-y-auto">
      <ul className="space-y-2">
        {/* Filter Options */}
        <li className="p-4">
          <label className="block mb-2 text-xl">Category</label>
          {filterOptions.categories.map((category) => (
            <div key={category.id} className="mb-2">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={category.checked}
                onChange={() => handleCheckboxChange("categories", category.id)}
              />
              <label htmlFor={`category-${category.id}`} className="ml-2">
                {category.name}
              </label>
            </div>
          ))}

          <label className="block mt-4 mb-2 text-xl">Price Range</label>
          {filterOptions.priceRanges.map((range) => (
            <div key={range.id} className="mb-2">
              <input
                type="checkbox"
                id={`price-${range.id}`}
                checked={range.checked}
                onChange={() => handleCheckboxChange("priceRanges", range.id)}
              />
              <label htmlFor={`price-${range.id}`} className="ml-2">
                {range.name}
              </label>
            </div>
          ))}

          <label className="block mt-4 mb-2 text-xl">Rating</label>
          {filterOptions.ratings.map((rating) => (
            <div key={rating.id} className="mb-2">
              <input
                type="checkbox"
                id={`rating-${rating.id}`}
                checked={rating.checked}
                onChange={() => handleCheckboxChange("ratings", rating.id)}
              />
              <label htmlFor={`rating-${rating.id}`} className="ml-2">
                {rating.name}
              </label>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
