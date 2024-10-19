import React from 'react'
import thumbsUpFill from '/thumb-up-fill.svg';
import thumbsUpLine from '/thumb-up-line.svg';
import thumbsDownLine from '/thumb-down-line.svg';
import thumbsDownFill from '/thumb-down-fill.svg';
import comment from '/comment.svg';

const FeedCard = ({toggleDescription, isDescriptionExpanded, fullName, collegeName, city, profilePic}) => {
  return (
        <div className='card h-fit flex flex-col gap-2 bg-white rounded-md p-4 mb-4'>
            <div className='flex gap-4'>
              <img className='h-[60px]' src={profilePic} alt="" />
              <div>
                <p className='font-semibold'>{fullName}</p>
                <p className='text-gray-700 text-[12px]'>{collegeName}</p>
                {/* <p className='text-gray-500 text-[12px]'>{city}</p> */}
                <p className='text-gray-500 text-[12px]'>Rating: 4.5</p>
              </div>
            </div>
            {/* Description Section */}
            <div 
              onClick={toggleDescription} 
              className={`description ${!isDescriptionExpanded ? 'line-clamp-3' : ''} cursor-pointer relative`}
              title="Click to expand/collapse"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius dolores possimus natus, ipsa, dolor, explicabo pariatur consectetur accusamus saepe voluptate atque laborum sint officia. Quaerat hic vitae eos iure.
              Incidunt debitis aut adipisci assumenda veritatis consectetur corrupti exercitationem rerum alias quisquam iste nostrum non nam numquam eligendi labore atque ipsa, soluta magnam ipsam sunt? Illo facere quis dolorum officiis.
              Deleniti quas molestiae laudantium sed ratione eius, itaque quaerat libero ullam odio, quos ut incidunt sequi provident dolores voluptatum fugit voluptatibus? Sunt voluptatum cum nostrum labore modi. Incidunt, architecto harum?
              Repellat temporibus fuga voluptates labore voluptatibus suscipit quos voluptatum necessitatibus cupiditate! Dicta, atque! Rerum sequi officiis, optio illo, officia cum aliquid architecto iste fugit ab est dicta dolore totam repellat!
              Porro nulla, distinctio nemo numquam nesciunt omnis nam sequi fugiat asperiores temporibus, repudiandae quisquam aperiam iusto. Qui id quisquam optio assumenda nihil! Exercitationem molestias suscipit facilis id soluta culpa aliquam?
              { !isDescriptionExpanded && <span className='absolute right-0 bottom-0'>...</span> }
            </div>
            <div className='pdf-preview'>PDF PREVIEW</div>
            <div className='h-[1px] w-full bg-gray-300'></div>
            <div className='flex gap-4'>
              <img className='h-[20px] cursor-pointer' src={thumbsUpLine} alt="" />
              <img className='h-[20px] cursor-pointer' src={thumbsDownLine} alt="" />
              <img className='h-[20px] cursor-pointer' src={comment} alt="" />
            </div>
          </div>
  )
}

export default FeedCard