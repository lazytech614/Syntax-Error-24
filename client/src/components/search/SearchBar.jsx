import React, { useState } from 'react';
import searchIcon from '/search-icon.svg';
import { useUserInfoContext } from '../../contexts/userInfoContext';

const SearchBar = ({ toggleMenu, onSearch }) => {
  const { userInfo } = useUserInfoContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);  // Pass search query back to Home component
  };

  return (
    <div className='bg-white rounded-md h-fit p-4 flex justify-center items-center gap-2'>
      <img onClick={toggleMenu} className='md:hidden w-[44px] cursor-pointer' src={userInfo?.profilePic} alt="" />
      <form onSubmit={handleSearch} className='w-full h-[40px] lg:h-[50px] flex gap-1 sm:gap-0 justify-center items-center'>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-[90%] h-full border border-gray-700 rounded-full px-6 text-[12px] sm:text-[16px]'
          type="text"
          placeholder='Search any subject or topic...'
        />
        <button type="submit" className='w-[10%] flex justify-center items-center rounded-full cursor-pointer'>
          <img className='h-[30px]' src={searchIcon} alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
