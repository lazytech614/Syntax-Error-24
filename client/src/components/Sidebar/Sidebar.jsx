import React, {useEffect} from 'react'
import closeIcon from '/close-fill.svg';
import { useUserInfoContext } from '../../contexts/userInfoContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({isMenuOpen, toggleMenu}) => {

  const navigate = useNavigate();

  const {userInfo} = useUserInfoContext();

  return (
      <div className={`fixed z-[10] md:relative top-0 left-0 h-screen w-[40%] md:w-[30%] bg-white shadow-lg p-4 py-10 flex flex-col gap-2 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="relative flex flex-col justify-between items-start h-fit w-full bg-[#F3F2F0] rounded-md p-4">
          <img
            className="w-[80px]"
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
            alt=""
          />
          <div className="">
            <p className="font-semibold text-[20px]">{userInfo?.fullName}</p>
            <p className="text-gray-700">{userInfo?.collegeName}</p>
            <p className="text-gray-500">{userInfo?.city}</p>
          </div>
          <img onClick={toggleMenu} className='absolute top-4 right-4 h-[20px] cursor-pointer' src={closeIcon} alt='' />
        </div>
        <div className="h-fit w-full bg-[#F3F2F0] rounded-md p-4">
          <p>Total uploaded files: 12</p>
          <p>Rating: 4.5</p>
        </div>
        <div className="absolute bottom-0 left-0 flex h-fit w-full bg-white rounded-md p-4 flex-col gap-4">
          <button onClick={() => navigate('/profile')} className="h-[40px] w-[40%] bg-[#0a66c2] text-white text-xs rounded-sm px-2 py-1">Profile details</button>
          <button className="h-[40px] w-[40%] bg-[#0a66c2] text-white text-xs rounded-sm px-2 py-1">Upload files</button>
          <button className="h-[40px] w-[40%] bg-[#0a66c2] text-white text-xs rounded-sm px-2 py-1">Log Out</button>
        </div>
      </div>
  )
}

export default Sidebar