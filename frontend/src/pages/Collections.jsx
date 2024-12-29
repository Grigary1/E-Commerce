import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { shopContext } from "../context/ShopContext";
import { images } from "../assets/assets";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  const { products, search, showSearch } = useContext(shopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Toggle category filters
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle subcategory filters
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Apply all filters
  const applyFilter = () => {
    let filtered = [...products];

    // Filter by search
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Filter by subcategory
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(filtered);
  };

  // Sort products
  const sortProducts = () => {
    const sorted = [...filterProducts];
    if (sortType === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilterProducts(sorted);
  };

  useEffect(() => {
    applyFilter();
  }, [products, category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <div
          onClick={() => setShowFilter((prev) => !prev)}
          className="flex items-center cursor-pointer gap-2"
        >
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
            FILTERS
          </p>
          <img
            className={`h-3 sm:hidden ${showFilter ? "" : "rotate-180"}`}
            src={images.dropdown_icon}
            alt="Dropdown"
          />
        </div>

        {/* Category Filter */}
        <div
          className={`sm:border sm:border-gray-300 pl-5 py-3 mt-6 transition-all duration-300 ease-in-out overflow-hidden ${
            showFilter
              ? "max-h-[500px]"
              : "max-h-0 border-none py-0 pl-0 mt-0"
          } sm:max-h-none sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <p key={cat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                />
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 transition-all duration-300 ease-in-out overflow-hidden ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <p key={sub} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={sub}
                  onChange={toggleSubCategory}
                />
                {sub}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL " text2="COLLECTIONS" />
          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Product Items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item.id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
