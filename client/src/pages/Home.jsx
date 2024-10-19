import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import UserContent from '../components/userContent/UserContent';
import FeedCard from '../components/feedCard/FeedCard';
import SearchBar from '../components/search/SearchBar';
import useGetUsers from '../hooks/useGetUsers';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { getUsers, isLoading, users } = useGetUsers();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  useEffect(() => {
    getUsers(); // Only called once when the component mounts
  }, [getUsers]);

  return (
    <div className='h-screen flex flex-col md:flex-row justify-between gap-4 px-6 sm:px-20 lg:px-40 py-6 sm:py-10'>
      {/* Sidebar */}
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      {/* Main Content */}
      <UserContent toggleMenu={toggleMenu} />

      {/* Feed Content */}
      <div className='w-full md:w-[70%] flex flex-col gap-4'>
        <SearchBar toggleMenu={toggleMenu} />
        <div className='h-[1px] w-full bg-gray-300'></div>
        <div className='overflow-y-auto rounded-md h-[80vh] md:h-fit hide-scrollbar scroll-smooth'>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            users.map((user, index) => (
              <FeedCard 
                key={index} 
                toggleDescription={toggleDescription} 
                isDescriptionExpanded={isDescriptionExpanded} 
                fullName={user.fullName}
                collegeName={user.collegeName}
                city={user.city}
                profilePic={user.profilePic}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
