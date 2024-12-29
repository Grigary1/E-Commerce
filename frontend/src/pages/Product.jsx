import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../assets/assets';
import { shopContext } from '../context/ShopContext';

const Product = () => {
  let { productId } = useParams();
  productId = Number(productId);
  console.log("id", productId);
  const { products } = useContext(shopContext);
  const [productData, setProductData] = useState(null); // Set initial state to null
  const [image, setImage] = useState(null); // Set initial state to null

  const fetchProductData = () => {
    const item = products.find((item) => item.id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]); // Set the first image of the product
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  // If productData is still not fetched, return empty div
  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full' style={{ maxHeight: '500px' }}>
            {/* Map over all images of the product */}
            {productData.image.map((item, index) => (
              <img
              onClick={()=>setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`Product image ${index}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
