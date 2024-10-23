import React, { useState } from 'react';
import thumbsUpLine from '/thumb-up-line.svg';
import thumbsDownLine from '/thumb-down-line.svg';
import thumbsUpFill from '/thumb-up-fill.svg';
import thumbsDownFill from '/thumb-down-fill.svg';
import comment from '/comment.svg';
import download from '/download-line.svg';
import { previewImages } from '../../constants/previewImages';

const FeedCard = ({
  noteId,
  toggleDescription,
  isDescriptionExpanded,
  content,
  fullName,
  bio,
  collegeName,
  branch,
  profilePic,
  name,
  description,
  initialLikes,
  initialDislikes,
  Id,
  title,
  onFeedback,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  // Load like/dislike state from localStorage specific to the noteId
  const [isLikeClicked, setIsLikeClicked] = useState(() => {
    const savedLike = localStorage.getItem(`isLikeClicked_${noteId}`);
    return savedLike ? JSON.parse(savedLike) : false;
  });

  const [isDislikeClicked, setIsDislikeClicked] = useState(() => {
    const savedDislike = localStorage.getItem(`isDislikeClicked_${noteId}`);
    return savedDislike ? JSON.parse(savedDislike) : false;
  });

  const pdfUrl = `http://localhost:3000/uploads/${encodeURIComponent(content)}`;
  const imageUrl = previewImages.find(
    (image) => image.name.toLocaleLowerCase() === name.toLocaleLowerCase()
  )?.image;

  const handleLike = () => {
    const updatedLikeState = !isLikeClicked;
    setIsLikeClicked(updatedLikeState);
    localStorage.setItem(`isLikeClicked_${noteId}`, JSON.stringify(updatedLikeState));

    if (updatedLikeState) {
      setLikes(likes + 1);
      onFeedback(noteId, 'like');

      // If liked, reset dislike
      if (isDislikeClicked) {
        setIsDislikeClicked(false);
        localStorage.setItem(`isDislikeClicked_${noteId}`, JSON.stringify(false));
        setDislikes(dislikes - 1);
        onFeedback(noteId, 'remove-dislike');
      }
    } else {
      setLikes(likes - 1);
      onFeedback(noteId, 'remove-like');
    }
  };

  const handleDislike = () => {
    const updatedDislikeState = !isDislikeClicked;
    setIsDislikeClicked(updatedDislikeState);
    localStorage.setItem(`isDislikeClicked_${noteId}`, JSON.stringify(updatedDislikeState));

    if (updatedDislikeState) {
      setDislikes(dislikes + 1);
      onFeedback(noteId, 'dislike');

      // If disliked, reset like
      if (isLikeClicked) {
        setIsLikeClicked(false);
        localStorage.setItem(`isLikeClicked_${noteId}`, JSON.stringify(false));
        setLikes(likes - 1);
        onFeedback(noteId, 'remove-like');
      }
    } else {
      setDislikes(dislikes - 1);
      onFeedback(noteId, 'remove-dislike');
    }
  };

  return (
    <div className='card h-fit flex flex-col gap-2 bg-white rounded-md p-4 mb-4 border-[1px] border-gray-300'>
      <div className='flex gap-4'>
        <img
          className='h-[60px] border-2 border-[#0a66c2] rounded-full'
          src={profilePic}
          alt=''
        />
        <div>
          <p className='font-semibold'>{fullName}</p>
          <p className='text-gray-700 text-[12px]'>
            {collegeName} <span className={`${branch !== '' ? 'inline-block' : 'hidden'}`}>,</span> {branch}
          </p>
          <p className='text-gray-500 text-[12px]'>Rating: 4.5</p>
        </div>
      </div>
      <div className='mt-4'>
        <p className='font-semibold text-gray-700'>{name}</p>
        <p className='text-gray-500 text-[14px]'>{title}</p>
      </div>
      <div className='h-[1px] w-full bg-gray-300'></div>
      <div
        onClick={toggleDescription}
        className={`description ${!isDescriptionExpanded ? 'line-clamp-3' : ''} cursor-pointer relative text-[12px] sm:text-[16px]`}
        title='Click to expand/collapse'
      >
        {description}
      </div>
      <div className='h-[400px] overflow-hidden'>
        {imageUrl ? (
          <img className='w-full bg-cover' src={imageUrl} alt='' />
        ) : (
          <img
            className='w-full bg-cover'
            src='https://th.bing.com/th/id/R.812ae5dbc4266a4d4e385ad6dd2c6028?rik=uIYfGPeflv4hBQ&riu=http%3a%2f%2fwww.pptgrounds.com%2fwp-content%2fuploads%2f2014%2f02%2fStudy-Book-and-Lights-Templates.jpg&ehk=dxZ54u5uxLJnMcnZUPFarIIfirGHwNeTbRW6OZQR%2f%2fk%3d&risl=&pid=ImgRaw&r=0'
            alt=''
          />
        )}
      </div>
      <div className='h-[1px] w-full bg-gray-300'></div>
      <div className='relative flex gap-4'>
        <img
          onClick={handleLike}
          className='h-[20px] cursor-pointer'
          src={isLikeClicked ? thumbsUpFill : thumbsUpLine}
          alt='Like'
        />
        <span>{likes}</span>
        <img
          onClick={handleDislike}
          className='h-[20px] cursor-pointer'
          src={isDislikeClicked ? thumbsDownFill : thumbsDownLine}
          alt='Dislike'
        />
        <span>{dislikes}</span>
        <img className='h-[20px] cursor-pointer' src={comment} alt='' />
        <img
          onClick={() => window.open(pdfUrl, '_blank')}
          className='absolute right-0 h-[20px] cursor-pointer'
          src={download}
          alt=''
        />
      </div>
    </div>
  );
};

export default FeedCard;
