import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { images, products } from '../assets/assets';
import { shopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import SizeChart from '../components/SizeChart';

const Product = () => {
  let { productId } = useParams();
  const { currency, addToCart, getProductDetails, productDetails, getCartCount } = useContext(shopContext);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState('');
  const [variantIndex, setVariantIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const handleCart = async () => {
    await addToCart(productId, size,productDetails?.variants?.[variantIndex]?._id);
    getCartCount();
    toast.success("Added to cart!");
  }

  useEffect(() => {
    getProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    if (productDetails && productDetails.baseImage) {
      setImage(productDetails.baseImage);
    }
  }, [productDetails]);

  if (!productDetails) {
    return (
      <div className="text-center py-20 animate-pulse">
        <div className="w-16 h-16 mx-auto border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 transition-opacity duration-500">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <span>Home / </span>
        <span>{productDetails.category} / </span>
        <span>{productDetails.subCategory} / </span>
        <span className="text-gray-900">{productDetails.title}</span>
      </div>

      {/* Product data */}
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto justify-start md:w-24 w-full pb-2 md:pb-0" style={{ maxHeight: '500px' }}>
            <img 
              src={productDetails?.baseImage} 
              onClick={() => setImage(productDetails.baseImage)} 
              className={`w-20 h-20 md:w-full md:h-24 object-cover rounded-lg border-2 cursor-pointer transition-all duration-300 ${image === productDetails.baseImage ? 'border-blue-500' : 'border-transparent'}`}
              alt="Product thumbnail"
            />
            {productDetails?.images?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-20 h-20 md:w-full md:h-24 object-cover rounded-lg border-2 cursor-pointer transition-all duration-300 ${image === item ? 'border-blue-500' : 'border-transparent'}`}
                alt={`Product image ${index}`}
              />
            ))}
          </div>
          
          {/* Main Image */}
          <div className="w-full md:w-[calc(100%-6rem)]">
            <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-square flex items-center justify-center">
              <img 
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" 
                src={image || productDetails.baseImage} 
                alt="Main product" 
              />
              {productDetails?.variants[variantIndex]?.offerPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full transform -rotate-12 shadow-lg">
                  SALE
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl md:text-3xl text-gray-900">{productDetails?.title}</h1>
          
          <div className="flex items-center mt-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-600">(122 reviews)</p>
          </div>

          <div className="mt-5 flex items-center">
            {productDetails?.variants[variantIndex]?.offerPrice && (
              <p className="line-through text-xl text-gray-500 mr-3">{currency}{productDetails?.variants[variantIndex]?.offerPrice}</p>
            )}
            <p className="text-3xl font-bold text-gray-900">{currency}{productDetails?.variants[variantIndex]?.price}</p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="text-blue-700">Free delivery</p>
          </div>

          <p className="mt-6 text-gray-700">{productDetails.description}</p>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-gray-900">Select Size</p>
              <button 
                onClick={() => setIsSizeChartOpen(true)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
              >
                Size Guide
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {productDetails.variants.map((item, index) => (
                <button 
                  onClick={() => { setSize(item.size); setVariantIndex(index) }} 
                  className={`py-3 px-2 text-center rounded-lg border transition-all duration-300 ${
                    item.size === size 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium transform -translate-y-0.5 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  key={index}
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleCart}
            disabled={!size}
            className={`mt-8 w-full py-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] ${
              size 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {size ? 'ADD TO CART' : 'SELECT A SIZE'}
          </button>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>100% Original Product</p>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>Cash On Delivery Available</p>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p>Easy return and exchange policy within 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-16">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'description' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            DESCRIPTION
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'reviews' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            REVIEWS (122)
          </button>
        </div>
        
        <div className="p-6 border border-t-0 rounded-b-lg">
          {activeTab === 'description' ? (
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Product Details</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Material: 100% Premium Cotton</li>
                  <li>Care: Machine wash cold, tumble dry low</li>
                  <li>Fit: Regular fit</li>
                  <li>Pattern: Solid color</li>
                  <li>Neck: Crew neck</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="font-medium">Alex Johnson</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mt-2">Perfect fit and comfortable fabric. I love the color and the quality is excellent for the price.</p>
                    <p className="text-gray-400 text-sm mt-2">Posted on March 12, 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="font-medium">Sarah Williams</h4>
                    <div className="flex mt-1">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mt-2">Good quality but runs a bit small. I would recommend sizing up.</p>
                    <p className="text-gray-400 text-sm mt-2">Posted on February 28, 2023</p>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                View all 122 reviews
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Size Guide</h3>
                <button 
                  onClick={() => setIsSizeChartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SizeChart />
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setIsSizeChartOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts 
          category={productDetails.category} 
          subCategory={productDetails.subCategory} 
        />
      </div>
    </div>
  );
};

export default Product;