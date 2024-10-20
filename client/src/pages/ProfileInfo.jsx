import React from 'react'
import { useUserInfoContext } from '../contexts/userInfoContext';
import useLogOut from '../hooks/useLogOut';

const ProfileInfo = () => {

  const {isLoading, logOut} = useLogOut();
  const {userInfo} = useUserInfoContext();
  console.log(userInfo);

  return (
        <div className="bg-[#F3F2F0] w-[100%]  flex flex-col justify-center px-6 gap-2 sm:px-20 lg:px-40 py-6 sm:py-10">
          <img
            src={userInfo?.profilePic}
            className="w-[160px]"
            alt=""
          />
          <div className="lg:w-[100%]  flex flex-col gap-1 bg-white p-4 rounded-md">
            <p className="font-semibold text-2xl">{userInfo?.fullName}</p>
            <p className="text-base text-gray-700">
              {userInfo?.collegeName}
            </p>
            <p className="text-gray-600 text-xm font-thin">
              {userInfo?.city}
            </p>
            <p className="text-gray-600 text-xm font-thin">
              {userInfo?.branch}
            </p>
          </div>
          <div className=" bg-white p-4 lg:w-[100%] h-fit rounded-md w-[100%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
            quae. Laborum vero facilis ad illum unde consectetur praesentium
            reprehenderit similique dolorum, pariatur maiores cumque quam aut
            laboriosam, ipsam sint quos a vel eius officia labore itaque
            impedit. Impedit consequuntur quod ducimus saepe iusto minus dicta
            dignissimos unde architecto nisi doloremque, soluta iste iure quis
            aliquid expedita fugit reprehenderit sint. Natus architecto dolores
            molestiae ullam, beatae voluptas sunt eius harum, dignissimos alias
            quos ratione amet. Architecto facilis praesentium odit quas
            expedita?
          </div>
          <div className="p-4 rounded-md bg-white lg:w-[100%] h-fit w-[100%]">
            {userInfo?.posts?.length > 0 ? <p>Total notes uploaded: {userInfo?.posts?.length}</p> : <p>No notes uploaded yet</p>}
            <p>Rating: 4.5</p>
          </div>
          <button onClick={() => logOut()} className="mt-10 h-[40px] w-[30%] sm:w-[20%] lg:w-[15%] lg:text- bg-[#0a66c2] lg:text-sm sm:text-sm text-white text-xs rounded-sm px-2 py-1" disabled={isLoading}>
            {isLoading ? 'Loggign out...' : 'Log Out'}
          </button>
        </div>
  )
}

export default ProfileInfo