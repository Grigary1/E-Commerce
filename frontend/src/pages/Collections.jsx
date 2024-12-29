import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopContext } from '../context/ShopContext'
import { images } from '../assets/assets'
import ProductItem from '../components/ProductItem'

const Collections = () => {

  const { products } = useContext(shopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter(item => item !== e.target.value));
    }
    else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  }

  const sortProd = (e) => {
    let fpCopy = filterProducts.slice();
    if (sortType === 'low-high') {
      setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
    }
    else if (sortType === 'high-low') {
      setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
    }
    else {
      applyFilter();
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy);
  }

  useEffect(()=>{
    sortProd();
  },[sortType]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  useEffect(() => {
    setFilterProducts(products);
  }, []);


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
          className={`sm:border sm:border-gray-300 pl-5 py-3 mt-6 transition-all duration-300 ease-in-out overflow-hidden ${showFilter
            ? 'max-h-[500px]'
            : 'max-h-0 border-none py-0 pl-0 mt-0'
            } sm:max-h-none sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" name="" id="" value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" name="" id="" value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" name="" id="" value={'Kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>


        {/* Sub category */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 transition-all duration-300 ease-in-out overflow-hidden ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Topwear'} onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" name="" id="" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL '} text2={'COLLECTIONS'} />
          {/* SORT */}
          <select onChange={(e) => {
            setSortType(e.target.value); // Call your second function here
          }} className='border border-gray-300 text-sm px-2'>
            <option value="relevant">Sort By: Relevent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item.id} price={item.price} image={item.image} />
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Collections
