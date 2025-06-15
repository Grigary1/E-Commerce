import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import SkeletonProductItem from './SkeltonProductItem';
import { ChevronDown, ChevronRight } from 'lucide-react';

const LatestCollection = () => {
  const { products, getProductsData } = useContext(shopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    getProductsData();
  }, []);

  // When products update, update loading state and latestProducts
  useEffect(() => {
    if (products.length) {
      setLatestProducts(products.slice(-10)); // Optional: get latest 10 products
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'CO  LLECTIONS'} />
      </div>

      {/* Skeleton or Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonProductItem key={idx} />
          ))}
        </div>
      ) : (
        <div>
          {/* Show More Button */}
          <div className="flex justify-end mb-4">
            <button
              className="inline-flex items-center text-sm font-medium text-gray-900 border border-gray-300 px-4 py-2 rounded-full hover:bg-indigo-50 transition-colors duration-200"
            >
              Show More
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {latestProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
