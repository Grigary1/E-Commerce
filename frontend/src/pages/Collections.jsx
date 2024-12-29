import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { shopContext } from '../context/ShopContext'
import { images } from '../assets/assets'

const Collections = () => {

  const { products } = useContext(shopContext);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter options */}
      <div className='min-w-60'>
        <div onClick={() => setShowFilter((prev) => !prev)} className='flex items-center cursor-pointer gap-2'>
          <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
          <img className={`h-3 sm:hidden ${showFilter ? '' : 'rotate-180'}`} src={images.dropdown_icon} alt="" />
        </div>
        {/* Category */}
        <div
  className={`sm:border sm:border-gray-300 pl-5 py-3 mt-6 transition-all duration-300 ease-in-out overflow-hidden ${
    showFilter
      ? 'max-h-[500px]'
      : 'max-h-0 border-none py-0 pl-0 mt-0'
  } sm:max-h-none sm:block`}
>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" name="" id="" value={'Men'} />Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" name="" id="" value={'Women'} />Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" name="" id="" value={'Kids'} />Kids
            </p>
          </div>
        </div>


        {/* Sub category */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 transition-all duration-300 ease-in-out overflow-hidden ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Topwear'} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Bottomwear'} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Winterwear'} />Winterwear
            </p>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Collections
