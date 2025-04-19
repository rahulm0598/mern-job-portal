// src/App.jsx
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
import CreateJobs from './components/admin/CreateJobs';
import AdminApplications from "./components/admin/AdminApplications";
import ApplicationDetails from "./components/admin/ApplicationDetails";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure this path is correct
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/description/:id" element={<JobDescription />} />
        <Route
          path="admin/companies"
          element={
            <ProtectedRoute role="recruiter">
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/jobs"
          element={
            <ProtectedRoute role="recruiter">
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/applications"
          element={
            <ProtectedRoute role="recruiter">
              <AdminApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/application/:applicationId"
          element={
            <ProtectedRoute role="recruiter">
              <ApplicationDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/create/company"
          element={
            <ProtectedRoute role="recruiter">
              <CreateCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/update/company/:id"
          element={
            <ProtectedRoute role="recruiter">
              <UpdateCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/create/job"
          element={
            <ProtectedRoute role="recruiter">
              <CreateJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/update/job/:id"
          element={
            <ProtectedRoute role="recruiter">
              <UpdateJobs />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;