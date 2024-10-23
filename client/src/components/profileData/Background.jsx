import React from 'react'
import { useUserInfoContext } from '../../contexts/userInfoContext'
import bg from "/bgg.jpeg";
import pencil from "/pencil-line.svg"
import { Link } from 'react-router-dom';

const Background = () => {

    const {userInfo} = useUserInfoContext();

  return (
    <div className={`relative h-fit bg-white`}>
        <div className='h-[160px] sm:h-[200px] overflow-hidden'>
            <img className='w-full object-cover' src={bg} alt="" />
        </div>
        <div className='absolute bottom-4 sm:bottom-0 md:-bottom-2 lg:-bottom-4 xl:-bottom-8 left-4 bg-[#FFFFFF] p-1 w-fit rounded-full'>
            <img
                src={userInfo?.profilePic}
                className="w-[80px] sm:w-[120px]"
                alt=""
            />
        </div>
        {/* <Link to="/update-profile" className='absolute bottom-0 md:-bottom-2 right-4 text-white'>
            <img className='sm:w-[30px]' src={pencil} alt="" />
        </Link> */}
    </div>
  )
}

export default Background