import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';  
import Navbar from './Navbar';
import {  Button} from './ui/button';
import { USER_API_END_POINT } from '@/utils/constant';
import { Link, useNavigate } from 'react-router-dom';  
import { Label } from './ui/label';
import { Input } from './ui/input';
import { setLoading } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';


function Register() {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    profile: null
  });
  
  const {loading,user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
      setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();    //formdata object
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      if (input.file) {
          formData.append("file", input.file);
      }

      try {
          dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
              headers: { 'Content-Type': "multipart/form-data" },
              withCredentials: true,
          });
          if (res.data.success) {
              navigate("/login");
              toast.success(res.data.message);
          }
      } catch (error) {
          console.log(error);
         
      } finally{
          dispatch(setLoading(false));
      }
  }

  // useEffect(()=>{
  //     if(user){
  //         navigate("/");
  //     }
  // },[])

  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center max-w-7xl mx-auto my-6 py-4'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>SignUp</h1>
          
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Full name"
            />
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="email@example.com"
            />
          </div>

          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Phone number"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Your password"
            />
          </div>

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

          {
            loading ? (
              <Button className="w-full my-4">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">Signup</Button>
            )
          }

          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Register;
