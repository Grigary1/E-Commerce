import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import Title from '../components/Title';

const Cart = () => {
  const {products,currency,cartItems}=useContext(shopContext);
  const [cartData,setCartData]=useState([]);
  useEffect(()=>{
    const tempData=[];
    for (const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          tempData.push(
            {
              id:items,
              size:item,
              quantity:cartItems[items][item]
            }
          )
        }
      }
    }
    setCartData(tempData);
  },[cartItems]);
  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
      <Title text1={'YOUR'}text2={'CART'}/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData=products.find((product)=>product.id==item.id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_o.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                product{productData}
                  {/* <img className='w-16 sm:w-20' src={productData.image} alt="" /> */}
                  {/* <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  </div> */}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cart
