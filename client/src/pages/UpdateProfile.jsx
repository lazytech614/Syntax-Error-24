import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState({
    // fullName: '',
    // userName: '',
    profilePic: '',
    headLine: '',
    bio: '',
    branch: '',
    collegeName: '',
    year: '',
    // phoneNumber: '',
    state: '',
    city: '',
    country: '',
  });

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const {section} = location.state;
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError('');
    // setSuccess('');

    try {
      // const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/update-profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user');
      }

      // setSuccess(true);
      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (error) {
      // setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 w-full sm:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-semibold text-center text-[#0a66c2] mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className={`flex flex-col ${section === 'MainInfo' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">Headline</label>
            <textarea
              type="text"
              name="headLine"
              rows={2}
              value={userDetails.headLine}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'Bio' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">Bio</label>
            <textarea
              type="text"
              name="bio"
              rows={4}
              value={userDetails.bio}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'MainInfo' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">Branch</label>
            <input
              type="text"
              name="branch"
              value={userDetails.branch}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'MainInfo' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">College Name</label>
            <input
              type="text"
              name="collegeName"
              value={userDetails.collegeName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'MainInfo' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">Year</label>
            <input
              type="number"
              name="year"
              value={userDetails.year}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'MainInfo' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={userDetails.city}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'MainInfo' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">State</label>
            <input
              type="text"
              name="state"
              value={userDetails.state}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'MainInfo' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">Country</label>
            <input
              type="text"
              name="country"
              value={userDetails.country}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>
          <div className={`flex flex-col ${section === 'profilePic' ? '' : 'hidden'}`}>
            <label className="text-sm text-gray-600">Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              value={userDetails.profilePic}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>

          <button
            type="submit"
            className={`bg-[#0a66c2] text-white p-3 rounded-lg hover:bg-blue-700 transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
