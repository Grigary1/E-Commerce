import React, { useContext, useEffect } from 'react';
import { shopContext } from '../context/ShopContext';

const Brands = ({ category }) => {
  const { brand, fetchBrand } = useContext(shopContext);

  useEffect(() => {
    if (!brand || brand.length === 0) {
      fetchBrand(category);
    }
  }, [category, brand, fetchBrand]);

  return (
    <div>
      <p className="text-xl font-bold mb-2">Brands to explore</p>
      <div>
        {brand && brand.length > 0 ? (
          brand.map((item, index) => (
            <div
              key={index}
              className="w-32 h-32 bg-black rounded-full flex items-center justify-center mx-1 overflow-hidden hover:cursor-pointer"
            >
              <p className="text-white text-3xl text-center truncate px-1">
                {item}
              </p>
            </div>


          ))
        ) : (
          <div className="text-gray-500">No brands available.</div>
        )}
      </div>
    </div>
  );
};

export default Brands;
