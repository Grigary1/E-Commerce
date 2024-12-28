import React, { useState } from 'react';
import search_icon from './../assets/search_icon.svg';
import cross_icon from './../assets/cross_icon.png';
import user_icon from './../assets/user_icon.png';
import cart_icon from './../assets/cart_icon.png';
import menu_icon from './../assets/menu_icon.png';
import { Link, NavLink } from 'react-router-dom';
import logo from './../assets/logo.png';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className='flex flex-row items-center justify-between py-5 font-medium'>
      {/* Logo */}
      <Link to='/'>
        <img src={logo} className='w-14 h-14' alt="logo not found" />
      </Link>

      {/* Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink
          to='/'
          className={({ isActive }) => isActive ? 'flex flex-col items-center gap-1 text-black font-bold' : 'flex flex-col items-center gap-1 text-gray-700'}
        >
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink
          to='/collection'
          className={({ isActive }) => isActive ? 'flex flex-col items-center gap-1 text-black font-bold' : 'flex flex-col items-center gap-1 text-gray-700'}
        >
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => isActive ? 'flex flex-col items-center gap-1 text-black font-bold' : 'flex flex-col items-center gap-1 text-gray-700'}
        >
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) => isActive ? 'flex flex-col items-center gap-1 text-black font-bold' : 'flex flex-col items-center gap-1 text-gray-700'}
        >
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
      </ul>

      {/* Icons */}
      <div className="hidden sm:flex items-center gap-6 h-16">
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

        <Link to='/cart' className='relative'>
          <img src={cart_icon} alt="" className='w-9 h-9' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>16</p>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className='sm:hidden'>
        {!menuVisible && (
          <img
            onClick={() => setMenuVisible(true)}
            src={menu_icon}
            alt=""
            className="w-9 h-9 cursor-pointer"
          />
        )}

        {menuVisible && (
          <ul
            className={`absolute top-16 right-0 w-40 h-60 bg-slate-100 flex flex-col items-center gap-5 py-5 px-5 rounded-sm
              transition-transform transform duration-300 ease-in-out ${menuVisible ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <img
              src={cross_icon}
              onClick={() => setMenuVisible(false)}
              alt=""
              className="w-9 h-9 cursor-pointer"
            />
            <NavLink onClick={() => setMenuVisible(false)} to="/" className="cursor-pointer">Home</NavLink>
            <NavLink onClick={() => setMenuVisible(false)} to="/collection" className="cursor-pointer">Collection</NavLink>
            <NavLink onClick={() => setMenuVisible(false)} to="/about" className="cursor-pointer">About</NavLink>
            <NavLink onClick={() => setMenuVisible(false)} to="/contact" className="cursor-pointer">Contact</NavLink>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
