import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from "../context/ShopContext";
import { images } from '../assets/assets';
const Filter = ({ searchResult }) => {
    const { products, search, showSearch } = useContext(shopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relevant");

    // Toggle category
    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Toggle sub-category
    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Apply all filters
    const applyFilter = () => {
        let filtered = [...products];

        // If searchResult is passed
        if (searchResult) {
            filtered = Array.isArray(searchResult) ? [...searchResult] : [searchResult];
        }

        // Filter by category
        if (category.length > 0) {
            filtered = filtered.filter((item) => category.includes(item.category));
        }

        // Filter by subcategory
        if (subCategory.length > 0) {
            filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
        }

        setFilterProducts(filtered);
    };
    useEffect(() => {
        console.log("hey");
        console.log("filter", filterProducts);
    }, [filterProducts])

    // Sort filtered products
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
    }, [products, category, subCategory, searchResult]);

    useEffect(() => {
        sortProducts();
    }, [sortType]);

    useEffect(() => {
        setFilterProducts(products);
    }, [products]);
    return (
        <div>
            <div className="min-w-60">
                <div
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="flex items-center cursor-pointer gap-2"
                >
                    <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
                        FILTERS
                    </p>
                    <img
                        className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? "" : "rotate-180"
                            }`}
                        src={images.dropdown_icon}
                        alt="Toggle Filters"
                    />
                </div>

                {/* Category Filter */}
                <div
                    className={`sm:border sm:border-gray-300 pl-5 py-3 mt-6 transition-all duration-300 ease-in-out overflow-hidden ${showFilter ? "max-h-[500px]" : "max-h-0 border-none py-0 pl-0 mt-0"
                        } sm:max-h-none sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {["Men", "Women", "Kids"].map((cat) => (
                            <label key={cat} className="flex gap-2 cursor-pointer">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value={cat}
                                    onChange={toggleCategory}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Subcategory Filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 my-5 transition-all duration-300 ease-in-out overflow-hidden ${showFilter ? "" : "hidden"
                        } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                            <label key={sub} className="flex gap-2 cursor-pointer">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value={sub}
                                    onChange={toggleSubCategory}
                                />
                                {sub}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Filter