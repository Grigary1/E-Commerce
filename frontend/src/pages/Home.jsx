import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='ml-10 mr-10'>
      <Hero/>
      <LatestCollection/>
      {/* <BestSellers/> */}
      <OurPolicy/>
      <NewsLetter/>
    </div>
  )
}

export default Home
