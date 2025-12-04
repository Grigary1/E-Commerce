import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { shopContext } from '../context/ShopContext';

// Import icons from lucide-react for a modern look
import { Search, ShoppingBag, User, X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { getCartCount, setLoginModalVisible } = useContext(shopContext);

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);


  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginModalVisible(true);
    } else {
      setLoginModalVisible(false);
      navigate('/cart');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsProfileOpen(false);
    // Optional: Redirect to home or show a toast message
    navigate('/');
    // toast.success("Logged out successfully");
  }

  // Define nav links for reuse in both desktop and mobile menus
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Collection', path: '/collection' },
    // { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <header className='sticky top-0 z-50'>
      <nav className='flex items-center justify-between px-4 sm:px-8 py-3 bg-white/80 backdrop-blur-md shadow-sm'>
        
        {/* Logo */}
        <Link to='/' className='text-2xl font-bold text-gray-800'>
          {/* Using text logo as an example, you can replace with your `<img>` tag */}
          GCart
        </Link>

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex items-center gap-8 text-gray-600'>
          {navLinks.map((link) => (
            <li key={link.title}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative transition-colors duration-300 hover:text-black ${isActive ? 'font-semibold text-black' : ''}`
                }
              >
                {link.title}
                {({ isActive }) =>
                  isActive && (
                    <span className='absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 w-1 bg-black rounded-full'></span>
                  )
                }
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons and Actions */}
        <div className='flex items-center gap-4 sm:gap-6'>
          <button aria-label="Search" className='hidden sm:block text-gray-600 hover:text-black transition-colors'>
            <Search size={22} />
          </button>

          {/* User Profile Dropdown */}
          <div ref={profileRef} className='relative'>
            <button
              aria-label="User account"
              onClick={() => setIsProfileOpen(prev => !prev)}
              className='text-gray-600 hover:text-black transition-colors'
            >
              <User size={22} />
            </button>
            {isProfileOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20'>
                <Link to='/profile' onClick={() => setIsProfileOpen(false)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>My Profile</Link>
                <Link to='/orders' onClick={() => setIsProfileOpen(false)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Orders</Link>
                <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'>
                  Logout
                </button>
              </div>
            )}
          </div>

          <button aria-label="Open cart" onClick={handleCartClick} className='relative text-gray-600 hover:text-black transition-colors'>
            <ShoppingBag size={22} />
            <span className='absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-black text-white text-[10px] rounded-full'>
              {getCartCount()}
            </span>
          </button>
          
          {/* Mobile Menu Button */}
          <button aria-label="Open menu" onClick={() => setIsMenuOpen(true)} className='lg:hidden text-gray-600 hover:text-black transition-colors'>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-end p-4'>
          <button aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className='flex flex-col items-center gap-8 mt-8 text-lg'>
          {navLinks.map((link) => (
            <li key={link.title}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-300 hover:text-black ${isActive ? 'font-semibold text-black' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;