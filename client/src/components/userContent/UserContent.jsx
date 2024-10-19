import React from 'react'
import menuBar from '/menu-bar.svg'
import useLogOut from '../../hooks/useLogOut'

const UserContent = ({toggleMenu}) => {
    const {isLoading, logOut} = useLogOut();

  return (
      <div className='hidden md:flex w-[100%] md:w-[30%] flex-col gap-2'>
        <div className='flex md:flex-col justify-between h-fit w-full bg-white rounded-md p-4'>
          <img className='w-[80px]' src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="" />
          <div className='hidden md:block'>
            <p className='font-semibold text-[20px]'>Rupanjan De</p>
            <p className='text-gray-700'>Indian Institute of Technology, Roorkee</p>
            <p className='text-gray-500'>Roorkee</p>
          </div>
          <img onClick={toggleMenu} className='block md:hidden w-[30px] cursor-pointer' src={menuBar} alt="" />
        </div>
        <div className='hidden md:block h-fit w-full bg-white rounded-md p-4'>
          <p>Total uploaded files: 12</p>
          <p>Rating: 4.5</p>
        </div>
        <div className='hidden md:flex h-fit w-full bg-white rounded-md p-4 flex-col gap-4'>
          <button className='h-[30px] w-[40%] bg-[#0a66c2] text-white rounded-sm px-2 py-1'>Profile details</button>
          <button className='h-[30px] w-[40%] bg-[#0a66c2] text-white rounded-sm px-2 py-1'>Upload files</button>
          <button onClick={() => logOut()} className='h-[30px] w-[40%] bg-[#0a66c2] text-white rounded-sm px-2 py-1'>Log Out</button>
        </div>
      </div>
  )
}

export default UserContent