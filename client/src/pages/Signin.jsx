import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';

const SignIn = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  })

  const {signin, isLoading} = useSignIn();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e)=> {
    e.preventDefault();
    console.log(formData);
    await signin(formData);
  }


  return (
    <div className='w-[80%] sm:w-[50%] lg:w-[40%] xl:w-[30%] h-screen flex flex-col items-center justify-center mx-auto'>
      <div className='h-fit w-full bg-white rounded-md p-4 text-black'>
        <h1 className='text-[#004182] text-3xl text-center font-semibold'>Sign In</h1>
        <form onSubmit={handleSubmit} className='my-4 flex flex-col gap-4'>
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
              id='password' 
              type="password" 
              className='w-full h-10 bg-[#F3F2F0] border border-gray-700 rounded-md px-4' 
              placeholder='Enter password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='relative w-full'>
            <button type="submit" className="bg-[#0a66c2] hover:bg-[#004182] text-white h-12 w-full rounded-full font-semibold" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        <Link to="/signup" className='text-black hover:text-[#0a66c2]'>Don't have an account</Link>
      </div>
    </div>
  )
}

export default SignIn