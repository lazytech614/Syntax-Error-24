import React from 'react'
import menuBar from '/menu-bar.svg'
import useLogOut from '../../hooks/useLogOut'
import { useUserInfoContext } from '../../contexts/userInfoContext'
import { useNavigate } from 'react-router-dom'

const UserContent = ({toggleMenu}) => {
    const {isLoading, logOut} = useLogOut();
    const navigate = useNavigate();

    const {userInfo} = useUserInfoContext();

    console.log(userInfo);

  return (
      <div className='hidden md:flex w-[100%] md:w-[30%] flex-col gap-2'>
        <div className='flex md:flex-col justify-between h-fit w-full bg-white rounded-md p-4'>
          <img className='w-[80px]' src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="" />
          <div className='hidden md:block'>
            <p className='font-semibold text-[20px]'>{userInfo?.fullName}</p>
            <p className='text-gray-700'>{userInfo?.collegeName}</p>
            <p className='text-gray-500'>{userInfo?.city}</p>
          </div>
          <img onClick={toggleMenu} className='block md:hidden w-[30px] cursor-pointer' src={menuBar} alt="" />
        </div>
        <div className='hidden md:block h-fit w-full bg-white rounded-md p-4'>
          <p>Total uploaded files: 12</p>
          <p>Rating: 4.5</p>
        </div>
        <div className='hidden md:flex h-fit w-full bg-white rounded-md p-4 flex-col gap-4'>
          <button onClick={() => navigate('/profile')} className='h-[40px] w-[40%] md:w-[50%] bg-[#0a66c2] text-white text-xs rounded-sm px-2 py-1'>Profile details</button>
          <button className='h-[40px] w-[40%] md:w-[50%] bg-[#0a66c2] text-white text-xs rounded-sm px-2 py-1'>Upload files</button>
          <button onClick={() => logOut()} className='h-[40px] w-[40%] md:w-[50%] bg-[#0a66c2] text-white text-xs rounded-sm px-2 py-1'>Log Out</button>
        </div>
      </div>
  )
}

export default UserContent