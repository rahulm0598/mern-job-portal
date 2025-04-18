import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setLoading } from '@/redux/jobSlice';
import axios from 'axios';
import Job from './Job';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase } from 'lucide-react';

const Explore = () => {
  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get('http://localhost:3000/api/job/getall', {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        } else {
          console.error('Failed to fetch jobs:', response.data.message);
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching jobs:', error);
        dispatch(setLoading(false));
      }
    };
    fetchJobs();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Discover Your <span className="text-orange-500">Dream Job</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Browse thousands of opportunities tailored to your skills and ambitions.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : allJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto" />
            <p className="mt-4 text-lg font-medium text-gray-600">
              No Jobs Available
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Check back later or try searching for specific roles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;