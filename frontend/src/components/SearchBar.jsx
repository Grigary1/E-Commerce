import React, { useCallback, useContext, useEffect, useState } from 'react';
import { images } from '../assets/assets';
import { shopContext } from '../context/ShopContext';
import search_icon from './../assets/search_icon.svg';
import { debounce, every } from 'lodash';
import axios from 'axios';
import Collections from '../pages/Collections';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(shopContext);
  const [suggestions, setSuggestions] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate=useNavigate();
  const handleClick=(item)=>{
    navigate('/collection',{state:{searchResult:item}});
    setShowSearch(false);
  }

  const handleKeyDown=(event)=>{
    if(event.key=='Enter'){
      navigate('/collection')
    }
  }

  // Debounced search function
  const fetchSearchSuggestion = useCallback(
    debounce(async (query) => {
      try {
        const url = `${backendUrl}/api/product/list?q=${encodeURIComponent(query)}`;
        const res = await axios.get(url);
        setSuggestions(res.data.products);
        console.log("res", res.data.products);
      } catch (error) {
        console.error("Search error:", error.message);
      }
    }, 300),
    []
  );

  // Trigger search on search input
  useEffect(() => {
    if (search.trim()) {
      fetchSearchSuggestion(search);
    } else {
      fetchSearchSuggestion.cancel();
      setSuggestions([]);
    }
  }, [search]);

  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center relative'>
      {/* Search Box */}
      <div className='relative inline-block w-3/4 sm:w-1/2'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 rounded-full w-full bg-white'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 outline-none bg-inherit text-sm'
            type='text'
            placeholder='Search'
            onKeyDown={handleKeyDown}
          />
          <img className='w-4' src={search_icon} alt='search' />
        </div>

        {/* Suggestions Dropdown */}
        {suggestions && suggestions.length > 0 && (
          <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-full bg-white shadow-md rounded-md mt-1 z-10'>
            {suggestions.map((item, index) => (
              <div
              onClick={()=>handleClick(item)}
                key={item._id || index}
                className='flex items-center gap-2 px-4 py-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer'
              >
                <img className='w-6 h-6' src={search_icon} alt='' />
                <img className='w-16 h-12 rounded-md' src={item.image[0]} alt="" />
                <span className='text-sm text-gray-800'>{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Close Button */}
      <img
        onClick={() => setShowSearch(false)}
        className='inline w-3 cursor-pointer ml-3'
        src={images.close_icon}
        alt='close'
      />
    </div>
  ) : null;
};

export default SearchBar;
