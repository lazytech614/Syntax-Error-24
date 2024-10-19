import React from 'react'
import searchIcon from '/search-icon.svg';

const SearchBar = ({toggleMenu}) => {
  return (
        <div className='bg-white rounded-md h-fit p-4 flex justify-center items-center gap-2'>
            <img onClick={toggleMenu} className='md:hidden w-[60px] cursor-pointer' src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="" />
          <form className='w-full h-[50px] flex justify-center items-center'>
            <input className='w-[90%] h-full border border-gray-700 rounded-full px-6' type="text" placeholder='Search any subject or topic here...'/>
            <div className='w-[10%] flex justify-center items-center rounded-full cursor-pointer'>
              <img className='h-[30px]' src={searchIcon} alt="" />
            </div>
          </form>
        </div>
  )
}

export default SearchBar