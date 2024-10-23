import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import UserContent from '../components/userContent/UserContent';
import FeedCard from '../components/feedCard/FeedCard';
import SearchBar from '../components/search/SearchBar';
import useGetUsers from '../hooks/useGetUsers';
import { useFeedContext } from '../contexts/FeedContext';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState(null); // State for expanded note
  const { getUsers, isLoading, users } = useGetUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const { feed } = useFeedContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDescription = (noteId) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId); // Toggle the expanded state for the note
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  const filteredFeed = feed.filter((note) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(lowerCaseQuery) ||
      note.name.toLowerCase().includes(lowerCaseQuery) ||
      note.code.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className='h-screen flex flex-col md:flex-row justify-between gap-4 px-6 sm:px-20 lg:px-40 xl:px-60 py-6'>
      {/* Sidebar */}
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      {/* Main Content */}
      <UserContent toggleMenu={toggleMenu} />

      {/* Feed Content */}
      <div className='w-full md:w-[70%] flex flex-col gap-2'>
        <SearchBar toggleMenu={toggleMenu} onSearch={handleSearch}/>
        <div className='h-[1px] w-full bg-gray-300'></div>
        <div className='overflow-y-auto rounded-md h-[80vh] md:h-fit hide-scrollbar scroll-smooth'>
          {feed.length === 0 ? (
            <div>No notes available...</div>
          ) : (
            filteredFeed.length > 0 && filteredFeed.map((note, index) => (
              <FeedCard 
                key={index} 
                noteId={note._id}
                toggleDescription={() => toggleDescription(note._id)} 
                isDescriptionExpanded={expandedNoteId === note._id} 
                fullName={note?.authorId?.fullName} 
                branch={note?.authorId?.branch}
                collegeName={note?.authorId?.collegeName} 
                city={note?.authorId?.city} 
                profilePic={note?.authorId?.profilePic}
                title={note?.title}
                content={note?.content}
                name={note?.name}
                description={note?.description}
                Id={note?._id}
                initialLikes={note?.likes}
                initialDislikes={note?.dislikes}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
