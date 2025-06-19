import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopContext } from '../context/ShopContext'
import TrendingCard from './TrendingCard'
import SkeletonProductItem from './SkeltonProductItem'

const Trending = ({ tag }) => {
  if (!(tag === 'men' || tag == 'women' || tag == 'kids')) {
    return (
      <div>Page Not Found</div>
    )
  }
  const { trending, fetchTrending } = useContext(shopContext)
  const [data, setData] = useState(null);
  useEffect(() => {
    if (trending) {
      setData(trending)
      console.log("Trneding : ", trending);
    }
  }, [trending])

  useEffect(() => {
    fetchTrending(1, tag, 10);
  }, [])
  return (
    <div>
      {data ? (<div>
        <div className='flex flex-row gap-x-10'>
          {data.map((item, index) => (
            <TrendingCard id={item._id} image={item.baseImage} title={item.title} description={item.description} tag={tag} price={item.price} />
          ))
          }
        </div>
      </div>) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonProductItem key={idx} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Trending