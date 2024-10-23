import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import GenderDropdown from '../components/dropdown/GenderDropdown';
import YearDropdown from '../components/dropdown/YearDropdown';
import useSignUp from '../hooks/useSignUp';

const SignUp = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
        // branch: '',
        // year: '',
        // city: '',
        confirmPassword: '',
        phoneNumber: '',
        userName: '',
        // collegeName: '',
    })

    const { signup, isLoading } = useSignUp();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const setGender = (selectedGender) => {
        setFormData((prevState) => ({
          ...prevState,
          gender: selectedGender,
        }));
      };
    const setYear = (selectedYear) => {
        setFormData((prevState) => ({
          ...prevState,
          year: selectedYear,
        }));
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formData);
        await signup(formData);
    }

  return (
    <div className='w-[80%] sm:w-[50%] lg:w-[40%] xl:w-[30%] h-screen flex flex-col items-center justify-center mx-auto'>
      <div className='h-fit w-full bg-white rounded-md p-4 text-black'>
        <h1 className='text-[#004182] text-3xl text-center font-semibold'>Signup</h1>
        <form onSubmit={handleSubmit} className='my-4 flex flex-col gap-4'>
          <div>
            <input 
              id='fullname' 
              type="text" 
              className='w-full bg-[#F3F2F0] h-10 border border-gray-700 rounded-md px-4' 
              placeholder='Enter fullname'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input 
              id='username' 
              type="text" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Enter Username'
              name='userName'
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input 
              id='email' 
              type="email" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Enter E-Mail'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input 
              id='phoneNumber' 
              type="tel" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Enter phone number'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <GenderDropdown setGender={setGender} />
          </div>
          {/* <div>
            <input 
              id='collegeName' 
              type="text" 
              className='bg-[#F3F2F0] border border-gray-700 w-full h-10 rounded-md px-4' 
              placeholder='Enter your college name'
              name='collegeName'
              value={formData.collegeName}
              onChange={handleChange}
            />
          </div> */}
          {/* <div>
            <input 
              id='branch' 
              type="text" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Enter your branch name'
              name='branch'
              value={formData.branch}
              onChange={handleChange}
            />
          </div> */}
          {/* <div>
            <YearDropdown setYear={setYear} />
          </div> */}
          {/* <div>
            <input 
              id='city' 
              type="text" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Enter your city name'
              name='city'
              value={formData.city}
              onChange={handleChange}
            />
          </div> */}
          <div>
            <input 
              id='password' 
              type="password" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Enter password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input 
              id='confirm-password' 
              type="password" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Confirm password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className='relative w-full'>
            <button type="submit" className="bg-[#0a66c2] hover:bg-[#004182] text-white h-12 w-full rounded-full font-semibold" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <Link to="/signin" className='text-black hover:text-[#0a66c2]'>Already have an account</Link>
      </div>
    </div>
  )
}

export default SignUp