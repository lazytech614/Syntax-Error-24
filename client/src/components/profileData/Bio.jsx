import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useUserInfoContext } from '../../contexts/userInfoContext'
import pencil from '/pencil-line.svg'

const Bio = () => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    const {userInfo} = useUserInfoContext()

  return (
    <div className={`relative bg-white p-4 lg:w-[100%] h-fit rounded-md w-[100%] ${userInfo?.bio ? "" : "hidden"} border-[1px] border-gray-300`}>
        <div onClick={toggleExpanded} className={`${!isExpanded ? 'line-clamp-3' : ''}`}>
            <div className='mb-1 relative cursor-pointer'>
                <span className='font-semibold text-2xl'>About</span>
                <Link to="/update-profile" state={{ section: 'Bio' }}className='absolute top-0 right-0'>
                    <img className='w-[20px] sm:w-[30px]' src={pencil} alt="" />
                </Link>
            </div>
            <p>{userInfo?.bio}</p>
        </div>
        
    </div>
  )
}

export default Bio