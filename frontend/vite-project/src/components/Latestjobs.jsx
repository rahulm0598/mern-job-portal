import React from 'react';
import { useSelector } from 'react-redux';
import Job from './Job';

const Latestjobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="w-full mx-auto flex flex-col items-center py-12 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
        Latest Jobs & <span className="text-blue-600">Openings</span>
      </h1>
      {allJobs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-6 bg-white p-4 rounded-lg shadow-md">
          No jobs available
        </p>
      ) : (
        <div className="grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4">
          {allJobs.slice(0, 6).map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Job job={job} user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Latestjobs;