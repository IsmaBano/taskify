import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { SOCIAL_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
import { setLoading, setUser } from '@/redux/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';

const AddImage = () => {
  const {user}=useSelector(store=>store.auth);
  const {id}=useParams();
  console.log(id);
  const [input, setInput] = useState({
    image: null
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const changeFileHandler = (e) => {
      setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();  
    
      if (input.file) {
        formData.append("file", input.file);
    }

      try {
        
        const res = await axios.post(`${SOCIAL_API_END_POINT}/update/${id}`, formData, {
          headers: { 'Content-Type': "multipart/form-data" },
          withCredentials: true,
      });
          if (res.data.success) {
            dispatch(setUser(res.data.user)); 
              navigate("/dashboard");
              toast.success(res.data.message);
          }
      } catch (error) {
          console.log(error);
         
      } 
  }
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4">
                <h1 className="font-bold text-xl mb-5">Add New Image</h1>
                
          <div className='flex items-center justify-between my-2'>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
                <div className="flex justify-between mt-4">
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">Add</button>
                    <button type="button" onClick={handleBack} className="bg-gray-600 text-white py-2 px-4 rounded-md">Back</button>
                </div>
            </form>
        </div>
    );
};

export default AddImage;