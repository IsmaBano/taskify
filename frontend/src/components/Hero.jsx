import React from 'react';
import { Link } from 'react-router-dom'; 
import img from "../assets/unblured.jpeg"

import { Button } from './ui/button';

function Hero() {
    return (
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" 
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
  
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h3 className="font-extrabold text-4xl mb-4">Dive into the world of TaskiFy</h3>
          <p className="text-lg text-gray-200 max-w-lg mx-auto mb-6">
            Your gateway to earning money online as a student!
          </p>
          <div className="flex justify-center gap-4">
            {/* Use Link to navigate to login page */}
            <Link to="/login">
              <Button variant="secondary" className="px-6 py-2 bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200 shadow-md">
                Login
              </Button>
            </Link>
            {/* Use Link to navigate to register page */}
            <Link to="/register">
              <Button className="px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 shadow-md">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Hero;




