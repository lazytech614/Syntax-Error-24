import React, { useState } from 'react'

const GenderDropdown = ({ setGender }) => {
  // console.log(options);
  const [isOpen, setIsOpen] = useState(false);
  const [gender, selectGender] = useState("");

  const handleGenderSelect = (selectedGender) => {
    selectGender(selectedGender);
    setGender(selectedGender); // Update formData in the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className='w-full h-10 bg-[#F3F2F0] p-2 px-4 rounded-lg border border-gray-700 text-black relative'>
      <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
        {gender === "" ? "Select gender" : `${gender}`}
      </div>
      {isOpen && (
        <div className='absolute z-[10] bottom-[-160px] left-0 w-full flex flex-col bg-[#F3F2F0] gap-2 p-2 rounded-lg'>
          <div 
            className='bg-white p-2 rounded-lg cursor-pointer' 
            onClick={() => handleGenderSelect("Male")}>
              Male
          </div>
          <div 
            className='bg-white p-2 rounded-lg cursor-pointer' 
            onClick={() => handleGenderSelect("Female")}>
              Female
          </div>
          <div 
            className='bg-white p-2 rounded-lg cursor-pointer' 
            onClick={() => handleGenderSelect("Others")}>
              Others
          </div>
        </div>
      )}
    </div>
  );
}

export default GenderDropdown;
