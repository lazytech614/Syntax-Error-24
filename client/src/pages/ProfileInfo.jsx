import React from 'react'
import useLogOut from '../hooks/useLogOut';
import Background from '../components/profileData/Background';
import MainInfo from '../components/profileData/MainInfo';
import Bio from '../components/profileData/Bio';
import Activity from '../components/profileData/Activity';

const ProfileInfo = () => {
  
  const {isLoading, logOut} = useLogOut();

  return (
        <div className="bg-[#F3F2F0] w-[100%]  flex flex-col justify-center gap-2 sm:px-20 lg:px-40 xl:px-60 py-0 sm:py-10">
          <div className='bg-white rounded-t-none sm:rounded-md overflow-hidden border-[1px] border-gray-300'>
            <Background />
            <MainInfo />
          </div>
          <Bio />
          <Activity />
          <button onClick={() => logOut()} className="ml-4 sm:ml-0 mt-10 bg-[#0a66c2] text-white rounded-sm w-fit px-6 py-1" disabled={isLoading}>
            {isLoading ? 'Loggign out...' : 'Log Out'}
          </button>
        </div>
  )
}

export default ProfileInfo