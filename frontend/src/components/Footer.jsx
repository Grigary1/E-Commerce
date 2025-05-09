import React from 'react'
import {images} from '../assets/assets'

const Footer = () => {
  return (
    <div >
      <div className='flex flex-row sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={images.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>
                COMPANY
            </p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
