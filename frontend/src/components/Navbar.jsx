import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import logo from './../assets/logo.png'

const Navbar = () => {
  return (
    <div className='flex flex-row items-center justify-between py-5 font-medium'>

    {/* Logo */}
      <img src={logo} className='w-14 h-14' alt="logo not found" />

      {/* Navlink */}
      <ul className='sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p className=''>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p className=''>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p className=''>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p className=''>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'/>
        </NavLink>
      </ul>
    </div>
  )
}

export default Navbar