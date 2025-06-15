import React, { useContext, useEffect, useState } from 'react';
import {
  CheckIcon,
  TruckIcon,
  ClockIcon,
  LocationMarkerIcon,
  DownloadIcon,
  PhoneIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid';
import { shopContext } from '../context/ShopContext';

const OrdersDetailed = () => {
  const { myOrders, fetchOrderDetails } = useContext(shopContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchOrderDetails();x
  }, []);

  useEffect(() => {
    setOrders(myOrders);
  }, [myOrders]);

  if (!orders) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {orders.map((order) => {
          const {
            _id,
            shippingAddress,
            billingAddress,
            items,
            paymentDetails,    
            shippingMethod,
            orderStatus,
            createdAt,
            estimatedDelivery,
          } = order;

          // Compute subtotal, tax, total
          const subtotal = items.reduce((sum, itm) => sum + itm.price * itm.quantity, 0);
          const tax = Math.round(subtotal * 0.1);
          const shippingCost = 0;
          const grandTotal = subtotal + tax + shippingCost;

          // Format dates
          const purchasedOn = new Date(createdAt).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const expectedOn = new Date(estimatedDelivery).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          // Map orderStatus to an index for the timeline
          const statusSteps = ['pending', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
          const stepLabels = ['Order Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
          const currentIndex = statusSteps.indexOf(orderStatus.replace(' ', '_').toLowerCase());

          // For demo purposes, assign timestamps/locations at first & last steps
          const stepTimes = [
            purchasedOn,
            null,
            null,
            null,
            expectedOn
          ];
          const stepLocations = [
            'Order placed at warehouse',
            null,
            null,
            null,
            'Delivered to address'
          ];

          return (
            <div key={_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-cyan-800 py-6 px-8 text-white">
                <h2 className="text-2xl font-bold">Order ID: #{_id}</h2>
                <div className="mt-2 text-sm sm:text-base flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                  <div>
                    <span className="font-medium">Purchased On:</span>{' '}
                    <span className="font-semibold">{purchasedOn}</span>
                  </div>
                  <div>
                    <span className="font-medium">Expected Delivery:</span>{' '}
                    <span className="font-semibold">{expectedOn}</span>
                  </div>
                  <div>
                    <span className="font-medium">Payment Method:</span>{' '}
                    <span className="font-semibold">{paymentDetails.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Shipping Method:</span>{' '}
                    <span className="font-semibold">{shippingMethod.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-8 py-10 space-y-10">
                {/* Progress Timeline */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Status</h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0">
                    {stepLabels.map((lbl, idx) => {
                      const isCompleted = idx <= currentIndex;
                      const connectorColor = idx < currentIndex ? 'bg-cyan-600' : 'bg-gray-300';

                      return (
                        <div key={idx} className="relative flex-1 flex flex-col items-center">
                          {/* Circle */}
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                              isCompleted
                                ? 'border-cyan-600 bg-cyan-600'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckIcon className="w-6 h-6 text-white" />
                            ) : (
                              <span className="text-gray-500 font-semibold">{idx + 1}</span>
                            )}
                          </div>

                          {/* Horizontal connector (except after last step) */}
                          {idx < stepLabels.length - 1 && (
                            <div
                              className={`absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 h-1 w-full ${connectorColor}`}
                            />
                          )}

                          {/* Label & details */}
                          <p
                            className={`mt-2 text-sm font-medium ${
                              isCompleted ? 'text-gray-600' : 'text-gray-800'
                            } text-center`}
                          >
                            {lbl}
                          </p>
                          {stepTimes[idx] && (
                            <p className="text-xs text-gray-500 mt-1 text-center">
                              {stepTimes[idx]}
                            </p>
                          )}
                          {stepLocations[idx] && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center justify-center space-x-1">
                              <LocationMarkerIcon className="w-3 h-3 text-gray-500" />
                              <span>{stepLocations[idx]}</span>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Summary & Addresses */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Order Summary */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                    <div className="space-y-4">
                      {items.map((itm, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={itm.productInfo.image[0]}
                              alt={itm.productInfo.name}
                              className="w-16 h-16 object-cover rounded-md border"
                            />
                            <div>
                              <p className="text-gray-800 font-medium">
                                {itm.productInfo.name}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Size: {itm.variant.size} &nbsp; | &nbsp; Qty: {itm.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-800 font-semibold">
                            ₹{(itm.price * itm.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Tax (10%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>Total</span>
                        <span>₹{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-4 flex-wrap">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        <DownloadIcon className="w-5 h-5" />
                        <span>Download Invoice</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                        <ExclamationCircleIcon className="w-5 h-5 text-gray-500" />
                        <span>Return Policy</span>
                      </button>
                    </div>
                  </div>

                  {/* Shipping & Billing Addresses */}
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h3>
                      <p className="text-gray-700">{shippingAddress.addressLine1}</p>
                      {shippingAddress.addressLine2 && (
                        <p className="text-gray-700">{shippingAddress.addressLine2}</p>
                      )}
                      <p className="text-gray-700">
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Billing Address</h3>
                      <p className="text-gray-700">{billingAddress.addressLine1}</p>
                      {billingAddress.addressLine2 && (
                        <p className="text-gray-700">{billingAddress.addressLine2}</p>
                      )}
                      <p className="text-gray-700">
                        {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Carrier & Support Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="border border-gray-200 rounded-lg p-6 flex items-center space-x-4">
                    <TruckIcon className="w-8 h-8 text-cyan-600" />
                    <div>
                      <p className="text-gray-800 font-medium">Shipped via {shippingMethod.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 flex items-center space-x-4">
                    <ClockIcon className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-gray-800 font-medium">Customer Support</p>
                      <p className="text-gray-700 flex items-center space-x-1">
                        <PhoneIcon className="w-4 h-4 text-gray-600" />
                        <span>1800-123-4567</span>
                      </p>
                      <p className="text-gray-700 flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4 text-gray-600" />
                        <span>support@gcart.com</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support & Actions */}
                <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
                  <p className="text-gray-700">
                    If you have questions about this order, contact our support team:
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <PhoneIcon className="w-5 h-5 text-gray-600" />
                    <span>1800-123-4567</span>
                  </p>
                  <p className="text-gray-700">
                    Or email us at{' '}
                    <a href="mailto:support@gcart.com" className="underline text-cyan-600">
                      support@gcart.com
                    </a>
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                      <ExclamationCircleIcon className="w-5 h-5" />
                      <span>Cancel Order</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                      <ClockIcon className="w-5 h-5 text-gray-600" />
                      <span>Change Address</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersDetailed;
