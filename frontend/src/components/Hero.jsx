import React from 'react'
import hero_icon from './../assets/hero_icon.jpg'
import { images } from '../assets/assets'

const Hero = () => {
  return (
    <div>
      <div className='flex flex-col sm:flex-row border border-gray-400'>
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
            </div>
          </div>
        </div>
        <img className='w-full sm:w-1/2' src={hero_icon} alt="Not found" />

      </div>
      <div className="flex justify-center items-center min-h-screen bg-white p-4">
        <div className="flex justify-center items-center min-h-screen bg-white p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl w-full">
            {[
              { src: images.men, label: "Men" },
              { src: images.women, label: "Women" },
              { src: images.kids, label: "Kids" },
              { src: images.men, label: "Men" },
            ].map(({ src, label }, idx) => (
              <div
                key={idx}
                className="p-1 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-yellow-500"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg h-64 hover:cursor-pointer">
                  <img
                    src={src}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient fade at bottom */}
                  <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black to-transparent" />
                  {/* Text on gradient */}
                  <div className="absolute bottom-2 left-0 w-full text-center px-2">
                    <span className="text-white font-semibold text-5xl pb-3">{label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>


    </div>
  )
}

export default Hero
