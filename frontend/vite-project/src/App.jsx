import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/common/Navbar";
import Jobs from "./components/Jobs";

import { ToastContainer } from 'react-toastify';
import Explore from "./components/Explore";
import Profile from "./components/Profile";

import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import AdminJobs from "./components/admin/AdminJobs";
import CreateCompany from "./components/admin/CreateCompany";
import UpdateCompany from "./components/admin/UpdateCompany";
import UpdateJobs from "./components/admin/UpdateJobs";
import Appliedjobs from "./components/Appliedjobs";
import CreateJobs from './components/admin/CreateJobs'




function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/appliedjobs' element={<Appliedjobs />} />
        <Route path='/job/description/:id' element={<JobDescription />} />
        <Route path='admin/companies' element={<Companies />} />
        <Route path='admin/jobs' element={<AdminJobs />} />
        <Route path='admin/create/company' element={<CreateCompany />} />
        <Route path="/admin/update/company/:id" element={<UpdateCompany />} />
        <Route path="/admin/create/job" element={<CreateJobs />} />
        <Route path="/admin/update/job/:id" element={<UpdateJobs />} />


      
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
