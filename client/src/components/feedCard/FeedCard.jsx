import React, { useState } from 'react';
import thumbsUpLine from '/thumb-up-line.svg';
import thumbsDownLine from '/thumb-down-line.svg';
import thumbsUpFill from '/thumb-up-fill.svg';
import thumbsDownFill from '/thumb-down-fill.svg';
import comment from '/comment.svg';
import download from '/download-line.svg';
import { previewImages } from '../../constants/previewImages';

const FeedCard = ({ noteId, toggleDescription, isDescriptionExpanded, content, fullName, collegeName, branch, profilePic, name, description, initialLikes, initialDislikes, Id }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false)

  // console.log("Isclicked", isClicked);
  
  const pdfUrl = `http://localhost:3000/uploads/${encodeURIComponent(content)}`;

  const imageUrl = previewImages.find((image) => image.name.toLocaleLowerCase() === name.toLocaleLowerCase())?.image;

  const handleReaction = async (type) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${Id}/reaction`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        if (type === 'like') {
          setLikes(updatedNote.likes);
        } else {
          setDislikes(updatedNote.dislikes);
        }
      } else {
        console.error("Error updating reaction", response.statusText);
      }
    } catch (error) {
      console.error("Error updating reaction", error);
    }
  };

  return (
    <div className='card h-fit flex flex-col gap-2 bg-white rounded-md p-4 mb-4'>
      <div className='flex gap-4'>
        <img className='h-[60px]' src={profilePic} alt="" />
        <div>
          <p className='font-semibold'>{fullName}</p>
          <p className='text-gray-700 text-[12px]'>{collegeName} || {branch}</p>
          <p className='text-gray-500 text-[12px]'>Rating: 4.5</p>
        </div>
      </div>
      <p>{name}</p>
      <div
        onClick={toggleDescription}
        className={`description ${!isDescriptionExpanded ? 'line-clamp-3' : ''} cursor-pointer relative text-[12px] sm:text-[16px]`}
        title="Click to expand/collapse"
      >
        {description}
        {!isDescriptionExpanded && <span className='absolute right-0 bottom-0'>...</span>}
      </div>
      {imageUrl && (<div><img src={imageUrl} alt="" /></div>)}
      <div className='h-[1px] w-full bg-gray-300'></div>
      <div className='relative flex gap-4'>
        <img onClick={() => {handleReaction('like'); setIsLikeClicked(!isLikeClicked)}} className='h-[20px] cursor-pointer' src={isLikeClicked?thumbsUpFill:thumbsUpLine} alt="Like" />
        <span>{likes}</span>
        <img onClick={() => {handleReaction('dislike'); setIsDislikeClicked(!isDislikeClicked)}} className='h-[20px] cursor-pointer' src={isDislikeClicked?thumbsDownFill:thumbsDownLine} alt="Dislike" />
        <span>{dislikes}</span>
        <img className='h-[20px] cursor-pointer' src={comment} alt="" />
        <img onClick={() => window.open(pdfUrl, '_blank')} className='absolute right-0 h-[20px] cursor-pointer' src={download} alt="" />
      </div>
    </div>
  );
};

export default FeedCard;
