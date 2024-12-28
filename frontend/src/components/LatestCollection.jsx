import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(shopContext);
  console.log(products);

  const [latestProducts,setLatestProducts]=useState([]);


  useEffect(()=>{
    setLatestProducts(products.slice(0,10));
  },[])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </p>
      </div>
    
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
      
    </div>
  )
}

export default LatestCollection