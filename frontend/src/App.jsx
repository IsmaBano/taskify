import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UpdateProfile from './components/UpdateProfile';
import AddImage from './components/AddImage';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/update-profile" element={<UpdateProfile/>} />
          <Route path="/addimage/:id" element={<AddImage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
