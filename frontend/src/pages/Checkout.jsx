import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartData, fetchCartDetails, placeOrder, setOrderPlaced } = useContext(shopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [amount, setAmount] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [errors, setErrors] = useState({});
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // Recalculate total whenever cartData changes
  useEffect(() => {
    if (Array.isArray(cartData) && cartData.length) {
      const total = cartData.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setAmount(total);
    }
  }, [cartData]);

  // Fetch cart details on mount
  useEffect(() => {
    fetchCartDetails();
  }, []);

  // Calculate expected delivery date whenever delivery type changes
  useEffect(() => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5);

    if (selectedDelivery === 'standard') {
      const day = deliveryDate.getDay(); // 6 = Sat, 0 = Sun
      if (day === 6) {
        deliveryDate.setDate(deliveryDate.getDate() + 2); // push to Monday
      } else if (day === 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1); // push to Monday
      }
    }
    // For "weekend", keep whatever date results

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    setExpectedDelivery(deliveryDate.toLocaleDateString('en-IN', options));
  }, [selectedDelivery]);

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'This field is required';
    if (!email.trim()) newErrors.email = 'This field is required';
    if (!number.trim()) newErrors.number = 'This field is required';
    if (!address.trim()) newErrors.address = 'This field is required';
    if (!city.trim()) newErrors.city = 'This field is required';
    if (!state.trim()) newErrors.state = 'This field is required';
    if (!zipcode.trim()) newErrors.zipcode = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateFields()) return;
    setIsLoading(true);

    const items = cartData.map((item) => ({
      productId: item.productId,
      variant: { size: item.size },
      quantity: item.quantity,
      price: item.price,
    }));
    const orderData = {
      customer: { name, email, phone: number },
      shippingAddress: {
        addressLine1: address,
        addressLine2: '',
        city,
        state,
        zipCode: zipcode,
      },
      billingAddress: {
        addressLine1: address,
        addressLine2: '',
        city,
        state,
        zipCode: zipcode,
      },
      items,
      paymentDetails: { paymentMethod: selectedPayment },
      shippingMethod: selectedDelivery,
      orderNotes: '',
      totalAmount: amount,
    };

    console.log('Placing order with data:', orderData);
    const res = await placeOrder(orderData);
    setIsLoading(false);

    if (res) {
      setOrderPlaced(true);
      navigate('/order-placed')
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main content: blurred + disabled only when isLoading */}
      <div
        className={`w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden ${isLoading ? 'filter blur-sm pointer-events-none' : ''
          }`}
      >
        {/* Header */}
        <div className="bg-cyan-800 py-4">
          <p className="text-center text-3xl font-bold text-white">Gcart</p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex-1 h-1 bg-gray-300 rounded">
              <div className="w-1/2 h-1 bg-cyan-800 rounded"></div>
            </div>
            <div className="ml-4 flex space-x-4 text-sm">
              <span className="font-semibold text-cyan-800">1. Shipping</span>
              <span className="text-gray-500">2. Payment</span>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div
          className={`flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 ${isLoading ? 'opacity-70' : ''
            }`}
        >
          {/* Left Column */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 space-y-6">
            <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Checkout
            </p>
            <p className="text-lg sm:text-xl text-gray-600">
              Shipping Information
            </p>

            {/* Delivery Options */}
            <div className="space-y-2">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedDelivery('standard')}
                  className={`flex-1 py-2 px-4 text-center border rounded-md transition ${selectedDelivery === 'standard'
                    ? 'border-cyan-600 bg-cyan-100 text-cyan-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <div className="inline-flex items-center justify-center">
                    <span>Standard Delivery</span>
                    <span className="ml-2 inline-block relative group">
                      <span className="w-5 h-5 inline-flex items-center justify-center border border-gray-400 rounded-full text-gray-500 text-xs">
                        i
                      </span>
                      <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Delivery within 3–5 business days
                      </div>
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedDelivery('weekend')}
                  className={`flex-1 py-2 px-4 text-center border rounded-md transition ${selectedDelivery === 'weekend'
                    ? 'border-cyan-600 bg-cyan-100 text-cyan-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <div className="inline-flex items-center justify-center">
                    <span>Weekend & Late Delivery</span>
                    <span className="ml-2 inline-block relative group">
                      <span className="w-5 h-5 inline-flex items-center justify-center border border-gray-400 rounded-full text-gray-500 text-xs">
                        i
                      </span>
                      <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Delivery on weekends or after usual hours
                      </div>
                    </span>
                  </div>
                </button>
              </div>

              {/* Expected Delivery Date */}
              <p className="text-sm text-gray-600">
                Expected Delivery:{' '}
                <span className="font-medium text-gray-800">
                  {expectedDelivery}
                </span>
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.number ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.number && (
                  <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 mb-1">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="state" className="block text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="Enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="zipcode" className="block text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    id="zipcode"
                    type="text"
                    placeholder="Enter zipcode"
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.zipcode ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.zipcode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 border-l border-gray-200 flex flex-col">
            <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Review Your Cart
            </p>

            {/* Scrollable Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-4 max-h-96">
              {cartData?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow transition-shadow"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md border"
                    />
                    <div className="space-y-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <div className="text-sm text-gray-600">
                        Size: {item.size} &bull; Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-800 font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Empty Cart Message */}
              {(!cartData || cartData.length === 0) && (
                <p className="text-center text-gray-600">Your cart is empty.</p>
              )}
            </div>

            {/* Payment Methods */}
            <div className="mt-4 pt-4 border-t border-gray-300 space-y-4">
              <p className="font-semibold text-gray-700">
                Choose Payment Method
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedPayment('razorpay')}
                  className={`flex-1 py-2 px-4 text-center border rounded-md transition ${selectedPayment === 'razorpay'
                    ? 'border-cyan-600 bg-cyan-100 text-cyan-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Razorpay
                </button>
                <button
                  onClick={() => setSelectedPayment('cod')}
                  className={`flex-1 py-2 px-4 text-center border rounded-md transition ${selectedPayment === 'cod'
                    ? 'border-cyan-600 bg-cyan-100 text-cyan-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Cash on Delivery
                </button>
              </div>

              {/* Summary Section */}
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span className="font-medium">₹0.00</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax & Charges</span>
                  <span className="font-medium">₹0.00</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-800">
                  <span>Grand Total</span>
                  <span>₹{amount.toFixed(2)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-blue-600 text-white py-3 rounded-md text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;