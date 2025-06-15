import React from 'react';

export default function SkeletonProductItem() {
    return (
        <div className="group block bg-white rounded-2xl shadow-md overflow-hidden animate-pulse w-72">
            {/* Image Placeholder */}
            <div className="relative w-full h-0 pb-[100%] bg-gray-200">
                {/* Badge Placeholder */}
                <div className="absolute top-2 left-2 h-5 w-12 bg-gray-300 rounded-full" />
            </div>

            {/* Info Placeholder */}
            <div className="p-4 space-y-3">
                {/* Title Placeholder */}
                <div className="h-4 w-3/4 bg-gray-300 rounded" />

                {/* Rating Placeholder */}
                <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-3 w-3 bg-gray-300 rounded-full"
                        />
                    ))}
                    <div className="h-4 w-8 bg-gray-300 rounded ml-2" />
                </div>

                {/* Price & Delivery Placeholder */}
                <div className="flex justify-between items-center">
                    <div className="h-5 w-1/3 bg-gray-300 rounded" />
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                </div>
            </div>
        </div>
    );
}
