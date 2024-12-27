import React from 'react'
import search_icon from './../assets/search_icon.svg'
import user_icon from './../assets/user_icon.png'
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
          <p >Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p className=''>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p className=''>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p className=''>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
      </ul>

      {/* icons */}
      <div className="flex items-center gap-6 h-16">
        <img src={search_icon} alt="Icon not found" className="w-9 h-9 cursor-pointer" />
        <div className='group relative'>
          <img src={user_icon} alt="Icon not found" className="w-9 h-9 cursor-pointer" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-sm'>
              <p className='cursor-pointer hover:text-black'>My profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>LogOut</p>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Navbar