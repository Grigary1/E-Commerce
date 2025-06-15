import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { shopContext } from './../context/ShopContext.jsx'
import { Star } from 'lucide-react'

export default function ProductItem({ id, image, name, price, rating = 4.5 }) {
  const { currency } = useContext(shopContext)

  return (
    <Link
      to={`/product/details/${id}`}
      className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-0 pb-[100%] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount badge example */}
        <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          10% OFF
        </span>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold line-clamp-2 text-gray-800 group-hover:text-pink-600 transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(rating) ? 'opacity-100' : 'opacity-30'}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">{rating}</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">
            {currency}{price.toFixed(2)}
          </p>
          <span className="text-xs text-green-600 font-medium">
            Free Delivery
          </span>
        </div>
      </div>
    </Link>
  )
}
