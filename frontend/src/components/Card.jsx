import { SOCIAL_API_END_POINT } from '@/utils/constant';
import { Delete, Edit2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const Card = ({ username, images, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleUpdate = async (imageToDelete) => {
        try {
            console.log(imageToDelete);
            const res = await axios.post(`${SOCIAL_API_END_POINT}/delete/${id}`,  { imageUrl: imageToDelete }, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user)); 
                toast.success(res.data.message);
                navigate('/dashboard'); 
            }
        } catch (error) {
            console.error(error);
            toast.error("Profile update failed.");
        }
    };

    return (
        <div className="border rounded-lg shadow-md p-6 bg-white mb-6 relative">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{username}</h3>
                <button className="bg-gray-500 rounded-full text-white px-4 py-2">
                    <Link to={`/addimage/${id}`} className="flex items-center gap-2">
                        <Edit2 />
                        Add
                    </Link>
                </button>
            </div>
            
            <div className="mt-4 grid grid-row-3 gap-2">
                {images?.map((item, index) => (
                    <div key={index} className='border rounded-lg shadow-md relative mb-6'>
                        <div className='flex justify-between items-center'>
                            <img
                                src={item} 
                                alt={`${username}'s image`}
                                className="rounded-lg h-full w-full object-cover"
                            />
                            <button 
                                type='button' // Use 'button' type
                                onClick={() => handleUpdate(item)} // Call handleUpdate with the item to delete
                                className="bg-red-500 rounded-full text-white p-2 absolute top-2 right-2"
                            >
                                <Delete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;



