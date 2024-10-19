import React, { useState, useEffect } from 'react';
import menuBar from '/menu-bar.svg';
import searchIcon from '/search-icon.svg';
import thumbsUpFill from '/thumb-up-fill.svg';
import thumbsUpLine from '/thumb-up-line.svg';
import thumbsDownLine from '/thumb-down-line.svg';
import thumbsDownFill from '/thumb-down-fill.svg';
import comment from '/comment.svg';
import Sidebar from '../components/Sidebar/Sidebar';
import UserContent from '../components/userContent/UserContent';
import FeedCard from '../components/feedCard/FeedCard';
import SearchBar from '../components/search/SearchBar';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State to track expanded description
  const [users, setUsers] = useState([])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded); // Toggle expanded state
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
      .then((res) => res.json()).then((data) => setUsers(data))
  }, [])

  // console.log(users);

  return (
    <div className='h-screen flex flex-col md:flex-row justify-between gap-4 px-20 py-10'>
      {/* Sidebar */}
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      {/* Main Content */}
      <UserContent toggleMenu={toggleMenu} />

      {/* Feed Content */}
      <div className='w-[100%] md:w-[70%] flex flex-col gap-4'>
        <SearchBar toggleMenu={toggleMenu} />
        <div className='h-[1px] w-full bg-gray-300'></div>
        <div className='overflow-y-auto rounded-md h-[80vh] md:h-fit hide-scrollbar scroll-smooth'>
          {users.map((user, index) => (
            <FeedCard key={index} toggleDescription={toggleDescription} isDescriptionExpanded={isDescriptionExpanded} 
            fullName={user.fullName}
            collegeName={user.collegeName}
            city={user.city}
            profilePic={user.profilePic}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
