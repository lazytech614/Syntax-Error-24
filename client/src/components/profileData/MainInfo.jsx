import React from 'react'
import { useUserInfoContext } from '../../contexts/userInfoContext'
import { Link } from 'react-router-dom';
import pencil from '/pencil-line.svg'

const MainInfo = () => {

    const {userInfo} = useUserInfoContext();

  return (
            <div className="relative lg:w-[100%] flex flex-col gap-1 p-4">
              <p className="font-semibold text-2xl">{userInfo?.fullName}</p>
              <p className="text-base text-gray-700">
                {userInfo?.headLine}
              </p>
              <div className=''>
                <p className="text-base text-gray-700">
                  {userInfo?.collegeName}
                </p>
                <p className="text-base text-gray-700">
                  {userInfo?.branch}
                </p>
              </div>
              <div className='flex'>
                <p className="text-gray-600 text-xm font-thin">
                  {userInfo?.city}
                </p>
                <span className={`text-gray-600 text-xm font-thin ${userInfo?.state ? "block" : "hidden"}`}>, &nbsp;</span>
                <p className="text-gray-600 text-xm font-thin">
                  {userInfo?.state}
                </p>
                <span className={`text-gray-600 text-xm font-thin ${userInfo?.country ? "block" : "hidden"}`}>, &nbsp;</span>
                <p className="text-gray-600 text-xm font-thin">
                  {userInfo?.country}
                </p>
              </div>
              <div>
                <p className='font-bold text-[#0a66c2] text-[14px]'>0 connections</p>
              </div>
              <Link to="/update-profile" state={{ section: 'MainInfo' }}className='absolute top-4 right-4'>
                <img className='w-[20px] sm:w-[30px]' src={pencil} alt="" />
              </Link>
            </div>
  )
}

export default MainInfo