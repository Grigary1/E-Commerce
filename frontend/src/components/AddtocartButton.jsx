import { FaCartPlus, FaCheck } from 'react-icons/fa';

export default function AddToCartButton({ handleCart, state }) {
  return (
    <button
      onClick={handleCart}
      className={`
        relative overflow-hidden rounded-full 
        h-12 w-40 
        transform transition-transform duration-100 
        ${state ? 'scale-100' : 'hover:scale-110'} 
        bg-blue-600
      `}
    >
      {/* Base layer (ADD TO CART) */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center 
          text-white text-lg font-medium 
          transition-opacity duration-300 
          ${state ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <FaCartPlus className="mr-2" /> ADD TO CART
      </div>

      {/* “Done” layer (ADDED) */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center 
          text-white text-lg font-medium 
          bg-purple-600
          transition-transform duration-300 ease-in-out
          ${state
            ? 'translate-x-0 skew-x-0'
            : '-translate-x-[110%] skew-x-[-40deg]'
          }
        `}
      >
        <FaCheck className="mr-2" /> ADDED
      </div>
    </button>
  );
}
