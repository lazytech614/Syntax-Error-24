import React, { useState } from 'react'

const YearDropdown = ({ setYear }) => {
  // console.log(options);
  const [isOpen, setIsOpen] = useState(false);
  const [year, selectYear] = useState("");

  const handleYearSelect = (selectedYear) => {
    selectYear(selectedYear);
    setYear(selectedYear); // Update formData in the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className='w-full h-10 bg-[#F3F2F0] p-2 px-4 rounded-lg border border-gray-700 text-black relative'>
      <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
        {year === "" ? "Select year" : `${year}`}
      </div>
      {isOpen && (
        <div className='absolute z-[9] bottom-[-160px] left-0 w-full flex flex-col bg-[#F3F2F0] gap-2 p-2 rounded-lg'>
          <div 
            className=' bg-white p-2 rounded-lg cursor-pointer' 
            onClick={() => handleYearSelect(1)}>
              1
          </div>
          <div 
            className='bg-white p-2 rounded-lg cursor-pointer' 
            onClick={() => handleYearSelect(2)}>
              2
          </div>
          <div 
            className='bg-white p-2 rounded-lg cursor-pointer' 
            onClick={() => handleYearSelect(3)}>
              3
          </div>
          <div 
            className='bg-white p-2 rounded-lg cursor-pointer' 
            onClick={() => handleYearSelect(4)}>
              4
          </div>
        </div>
      )}
    </div>
  );
}

export default YearDropdown;
