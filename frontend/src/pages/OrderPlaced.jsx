import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopContext } from '../context/ShopContext';
import { CheckCircleIcon } from '@heroicons/react/solid';

const OrderPlaced = () => {
    const { orderPlaced, setOrderPlaced } = useContext(shopContext);
    const [time, setTime] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (!orderPlaced) {
            navigate('/');
            return;
        }
        setOrderPlaced(false);

        const intervalId = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full text-center p-8 space-y-6">
                <div className="flex justify-center">
                    <div className="bg-green-100 rounded-full p-4">
                        <CheckCircleIcon className="w-12 h-12 text-green-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                    Your Order is Confirmed!
                </h2>
                <p className="text-gray-600">
                    Thank you for shopping with us. We’re preparing your order now.
                </p>
                <div className="text-gray-700">
                    <span>Redirecting to home in </span>
                    <span className="font-medium">{time}</span>
                    <span> second{time !== 1 ? 's' : ''}...</span>
                </div>
            </div>
        </div>
    );
};

export default OrderPlaced;
