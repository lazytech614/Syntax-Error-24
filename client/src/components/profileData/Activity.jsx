import React from 'react'
import { useUserInfoContext } from '../../contexts/userInfoContext'

const Activity = () => {

    const {userInfo} = useUserInfoContext()

  return (
    <div className="p-4 rounded-md bg-white lg:w-[100%] h-fit w-[100%] border-[1px] border-gray-300">
        <div className='font-semibold text-2xl mb-1'>Activity</div>
        <div>{userInfo?.posts?.length > 0 ? <p>Total notes uploaded: {userInfo?.posts?.length}</p> : <p>No notes uploaded yet</p>}</div>
        <p>Rating: 4.5</p>
    </div>
  )
}

export default Activity