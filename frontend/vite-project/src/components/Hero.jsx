import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto flex flex-col items-center bg-gradient-to-r from-orange-50 to-yellow-50 py-16 px-4">
      <h2 className="text-center mt-6 text-orange-600 text-3xl sm:text-4xl md:text-5xl font-extrabold">
        Welcome To Our Website :)
      </h2>
      <h1 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Search, Apply & <span className="text-yellow-500">Get the Right Job Mate!</span>
      </h1>
      <p className="mt-4 max-w-2xl text-center text-gray-600 text-sm sm:text-base">
        Your future starts here. Explore thousands of roles crafted for your skills💼
      </p>
      <div className="w-full max-w-md mx-auto flex items-center mt-6">
        <input
          type="text"
          placeholder="Search for a job"
          className="h-10 w-2/3 sm:w-2/3 border-2 border-r-0 border-gray-300 rounded-l-full py-2 px-4 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        />
        <Button
          onClick={() => navigate('/jobs')}
          className="h-10 w-1/3 sm:w-1/3 bg-orange-500 text-white border-2 border-l-0 border-gray-300 rounded-r-full py-2 px-4 font-semibold hover:bg-orange-600 hover:scale-105 transition-all duration-300"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Hero;