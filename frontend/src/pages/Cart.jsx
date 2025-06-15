import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Cart = () => {
  const { cartData, fetchCartDetails,updateFlagVariable } = useContext(shopContext);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchCartDetails();
  }, []);
  useEffect(()=>{
    updateFlagVariable();
  },[cartData])

  useEffect(() => {
    if (cartData && Array.isArray(cartData)) {
      const total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setAmount(total);
    }
  }, [cartData]);

  const token = localStorage.getItem('token');

  const updateCartQuantity = async (productId, action) => {
    try {
      const res = await axios.patch(
        `${backendUrl}/api/cart/update`,
        { productId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        fetchCartDetails();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error updating cart:', error.message);
      toast.error('Something went wrong');
    }
  };

  const navigate = useNavigate();

  const handleQuantity = (action, id, no) => {
    if (action === 'increase') {
      updateCartQuantity(id, 'add');
    } else if (no > 1) {
      updateCartQuantity(id, 'sub');
    }
    // if quantity is already 1 and you press decrease, do nothing
  };

  if (!cartData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg text-gray-600">Loading…</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="text-2xl font-semibold mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Table Header (visible md+) */}
      <div className="hidden md:block">
        <div className="bg-gray-50 sticky top-0 z-10">
          <div className="grid grid-cols-12 gap-4 border-b-2 border-gray-300 py-3 px-2">
            <div className="col-span-5 font-medium text-gray-700">Item</div>
            <div className="col-span-2 font-medium text-gray-700">Price</div>
            <div className="col-span-3 font-medium text-gray-700 text-center">Quantity</div>
            <div className="col-span-2 font-medium text-gray-700 text-right">Total</div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-200">
        {cartData.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/details/${item.productId}`)}
            className="py-4 hover:bg-gray-50 hover:cursor-pointer transition-colors duration-150"
          >
            {/* Tablet+ (md+) Row */}
            <div className="hidden md:grid grid-cols-12 items-center gap-4 px-2">
              {/* Item Info */}
              <div className="col-span-5 flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover border"
                />
                <div>
                  <div className="text-lg font-medium text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    Size: {item.size} &middot; {item.category}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-gray-800">₹{item.price.toFixed(2)}</div>

              {/* Quantity Buttons */}
              <div className="col-span-3 flex justify-center items-center space-x-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantity('decrease', item._id, item.quantity);
                  }}
                  className="p-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition"
                >
                  <MinusIcon className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-lg text-gray-800">{item.quantity}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantity('increase', item._id, item.quantity);
                  }}
                  className="p-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition"
                >
                  <PlusIcon className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Total */}
              <div className="col-span-2 text-right text-gray-800">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>

            {/* Mobile (sm:) Card */}
            <div className="md:hidden flex flex-col bg-white shadow-sm rounded-lg px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover border"
                  />
                  <div>
                    <div className="text-base font-medium text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      Size: {item.size} &middot; {item.category}
                    </div>
                  </div>
                </div>
                <div className="text-gray-800 font-medium">₹{item.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantity('decrease', item._id, item.quantity);
                    }}
                    className="p-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition"
                  >
                    <MinusIcon className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="text-base text-gray-800">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantity('increase', item._id, item.quantity);
                    }}
                    className="p-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition"
                  >
                    <PlusIcon className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <div className="text-gray-800 font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary and Checkout */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="w-full md:w-1/2"></div>

        {amount !== null && (
          <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">₹{amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-semibold text-gray-800">
                <span>Grand Total</span>
                <span>₹{amount.toFixed(2)}</span>
              </div>
              <button
              onClick={(e)=>{e.stopPropagation();navigate('/order-placed')}}
                type="button"
                className="w-full bg-black text-white text-center py-3 rounded-md text-lg hover:bg-gray-900 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
