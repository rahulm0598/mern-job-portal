import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { setAllJobs, setLoading } from '@/redux/jobSlice';
import { toast } from 'react-toastify';
import FilterJob from './FilterJob';
import Job from './Job';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    salary: '',
    experienceLevel: '',
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(setLoading(true));
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        const queryParams = {
          ...(category && { keyword: category }),
          ...(filters.location && { location: filters.location }),
          ...(filters.jobType && { jobType: filters.jobType }),
          ...(filters.salary && { salary: filters.salary }),
          ...(filters.experienceLevel && { experienceLevel: filters.experienceLevel }),
          page,
          limit: 9,
        };
        const response = await axios.get('http://localhost:3000/api/job/getall', {
          params: queryParams,
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        } else {
          toast.error(response.data.message || 'Failed to fetch jobs');
        }
      } catch (error) {
        toast.error('Error fetching jobs');
        console.error('Error fetching jobs:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchJobs();
  }, [dispatch, location.search, filters, page]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      jobType: '',
      salary: '',
      experienceLevel: '',
    });
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Find Your <span className="text-orange-500">Perfect Job</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore opportunities that match your skills and aspirations.
          </p>
        </header>

        <div className="md:hidden mb-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="bg-orange-500 text-white hover:bg-orange-600">
                Filter Jobs
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <FilterJob
                onFilterChange={handleFilterChange}
                selectedFilters={filters}
                onClearFilters={handleClearFilters}
              />
            </DrawerContent>
          </Drawer>
        </div>

        <div className="flex gap-6">
          <div className="w-full md:w-1/4 hidden md:block">
            <FilterJob
              onFilterChange={handleFilterChange}
              selectedFilters={filters}
              onClearFilters={handleClearFilters}
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(filters).map(([key, value]) =>
                value ? (
                  <div
                    key={key}
                    className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full flex items-center text-sm"
                  >
                    {value}
                    <button
                      onClick={() => handleFilterChange(key, '')}
                      className="ml-2 text-orange-800 hover:text-orange-900"
                    >
                      ×
                    </button>
                  </div>
                ) : null
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-80 w-full rounded-2xl" />
                ))}
              </div>
            ) : allJobs.length > 0 ? (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {allJobs.length} job{allJobs.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allJobs.map((job) => (
                    <div
                      key={job._id}
                      className="transform transition-transform duration-300 hover:scale-105"
                    >
                      <Job job={job} user={user} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setPage(page + 1)}
                    className="bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto" />
                <p className="mt-4 text-lg font-medium text-gray-600">
                  No Jobs Found
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;