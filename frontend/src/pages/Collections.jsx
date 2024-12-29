import React from 'react'
import Title from '../components/Title'

const Collections = () => {
  return (
    <div className='flex flex-row'>
      {/* Filters */}
      <div>
        <p>FILTERS</p>
        {/* Categories */}
        <div className='border border-gray-600 w-40 p-4 mb-2'>
          Categories
          <form>
            <input type="checkbox" name="" id="" />
            <label>  Men</label><br/>
            <input type="checkbox" name="" id="" />
            <label>  Women</label><br/>
            <input type="checkbox" name="" id="" />
            <label>  Kids</label><br/>
          </form>
        </div>

        {/* Type */}
        <div className='border border-gray-600 w-40 p-4'>
          Categories
          <form>
            <input type="checkbox" name="" id="" />
            <label>  TopWear</label><br/>
            <input type="checkbox" name="" id="" />
            <label>  Bottomwear</label><br/>
            <input type="checkbox" name="" id="" />
            <label>  Winterwear</label><br/>
          </form>
        </div>
      </div>

      {/* All collections */}
      <div>
        <Title></Title>
      </div>
    </div>
  )
}

export default Collections
