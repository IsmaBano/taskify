import React from 'react';


function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white">
          TaskiFy
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="/" className="text-white text-lg hover:text-indigo-200 transition-colors duration-200">
            Home
          </a>
          <a href="/login" className="text-white text-lg hover:text-indigo-200 transition-colors duration-200">
            Login
          </a>
          <a href="/register" className="text-white text-lg hover:text-indigo-200 transition-colors duration-200">
            Register
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar