import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, { username }, {
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

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleUpdate} className="w-1/2 border border-gray-200 rounded-md p-4">
                <h1 className="font-bold text-xl mb-5">Add New Social Handle</h1>
                <div className="my-2">
                    <label className="block mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter new username"
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">Add</button>
                    <button type="button" onClick={handleBack} className="bg-gray-600 text-white py-2 px-4 rounded-md">Back</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
