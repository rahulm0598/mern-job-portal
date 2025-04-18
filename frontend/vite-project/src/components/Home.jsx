import React from 'react'
import Hero from './Hero';
import Category from './Category';
import Latestjobs from './Latestjobs';
import Footer from './Footer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate();
  const {user} = useSelector ((store) => store.auth);
  useEffect (() => {
    if(user ?.role === 'recruiter')
    {
      navigate("/admin/companies");
    }
  },[]);
 
  return (
    <div>
      <Hero/>
      <Category/>
      <Latestjobs/>
      <Footer/>
    </div>
  )
}

export default Home;