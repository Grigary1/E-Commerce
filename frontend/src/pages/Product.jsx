import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { images, products } from '../assets/assets';
import { shopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  let { productId } = useParams();
  productId = Number(productId);
  console.log("id", productId);
  const { products,currency,addToCart } = useContext(shopContext);
  const [productData, setProductData] = useState(null); // Set initial state to null
  const [image, setImage] = useState(null); // Set initial state to null
  const [size,setSize]=useState('');

  const fetchProductData = () => {
    const item = products.find((item) => item.id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]); // Set the first image of the product
    }
  }
  const handleCart=()=>{
    if(!size){
      toast.error("Specify size");
      return;
    }

    addToCart(productId,size);
    

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
                onClick={() => setImage(item)}
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
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex flex-row items-center gap-1 mt-2'>
            <img src={images.star_icon} alt="star icon" className='w-3' />
            <img src={images.star_icon} alt="star icon" className='w-3' />
            <img src={images.star_icon} alt="star icon" className='w-3' />
            <img src={images.star_icon} alt="star icon" className='w-3' />
            <img src={images.star_icon} alt="star icon" className='w-3' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-4xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border border-orange-500':''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>handleCart()} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product</p>
              <p>Cash On delivery is available on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className='mt-20'>
        <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Review (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</p>
        </div>
      </div>

    {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  )
}

export default Product;