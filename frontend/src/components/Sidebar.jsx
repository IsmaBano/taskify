import store from '@/redux/store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './ui/avatar'; 
import { Edit2, LogOut } from 'lucide-react';
import axios from 'axios';


import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';


const Sidebar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });

            if (res.data.success) {
                   dispatch(setUser(null));
                navigate('/login'); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Logout failed.");
        }
    };

    return (
        <aside className="w-64 h-screen bg-gray-800 text-white">
            <div className='flex justify-end m-4 p-6'>
                <button onClick={handleLogout} className="text-white">
                    <LogOut />
                </button>
            </div>
            <div className="flex items-center">
                <Avatar src={user.profilePhoto} alt={`${user.fullname}'s profile photo`} className="mr-4 border border-red-400 " />
                <h2 className="text-2xl font-bold">{user.fullname}</h2>
            </div>
            <nav className="mt-10">
                <ul>
                    <li>
                        <h2 className="block py-2 px-4 hover:bg-gray-700">{user.email}</h2>
                    </li>
                    <li>
                        <h2 className="block py-2 px-4 hover:bg-gray-700">{user.phoneNumber}</h2>
                    </li>
                    <li>
                        <h2 className="block py-2 px-4 hover:bg-gray-700">All Social Handles</h2>
                        <hr />
                        <ul>
                            {
                                user?.social?.map(item => (
                                    <li key={item._id}>
                                        <h3 className="block py-2 px-4 hover:bg-gray-700">{item.username}</h3>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
