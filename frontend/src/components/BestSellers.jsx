import React, { useEffect, useState } from 'react'
import Title from './Title'
import { products } from '../assets/assets';

const BestSellers = () => {

    const [product,setProducts] =useState([]);
    console.log("Best selllers ",product);
    useEffect(()=>{
        setProducts(products.filter(product=>product.bestseller===true));
    },[])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </p>
      </div>
          
      {/* Rendering products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            product.map((item,index)=>(
              <div key={index} className=' border-gray-200 p-4'>
                <img src={item.image[0]} alt={item.name} className='hover:scale-110 transition ease-in-out'/>
                <p className='pt-3 pb-1 text-sm'>{item.name}</p>
                <p className='text-sm font-medium'>${item.price}</p>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default BestSellers