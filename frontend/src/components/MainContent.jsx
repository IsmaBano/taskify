import React, { useState } from 'react';
import Card from './Card'; // Adjust the import path based on your folder structure
import { Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '@/redux/store';

const MainContent = () => {
    const {user}=useSelector(store=>store.auth);
    const social=user.social
console.log(social);

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold">Main Content</h1>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      <Link to="/update-profile" className="py-2 px-4 gap-2 flex hover:bg-gray-700">
                            <Edit2 /> Add new Social Handle
                        </Link>
      </button>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Data List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {social.map(item => (
            <Card id={item._id} username={item.username} images={item.images} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainContent;

