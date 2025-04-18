import { useParams, Navigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "react-toastify";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const isInitialApplied = singleJob?.application?.some(
    (item) => item.applicant === user?._id
  ) || false;
  const [isApplied, setIsApplied] = useState(isInitialApplied);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate days since job was posted
  const dayAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching job with ID:", jobId);
        if (!jobId || !/^[0-9a-fA-F]{24}$/.test(jobId)) {
          toast.error("Invalid job ID");
          dispatch(setSingleJob(null));
          return;
        }
        const response = await axios.get(
          `http://localhost:3000/api/job/getsingle/${jobId}`,
          { withCredentials: true }
        );
        console.log("API response:", response.data);
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(
            response.data.job?.application?.some((item) => item.applicant === user?._id) || false
          );
        } else {
          dispatch(setSingleJob(null));
          toast.error(response.data.message || "Failed to fetch job");
        }
      } catch (error) {
        console.error("Error fetching single job:", error.response || error);
        dispatch(setSingleJob(null));
        toast.error("Error fetching job details");
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchSingleJob();
    } else {
      setIsLoading(false); // Stop loading if no user
    }
  }, [jobId, user, dispatch]);

  const handleJobApply = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/application/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsApplied(true);
        const updatedData = {
          ...singleJob,
          application: [...singleJob?.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedData));
      }
    } catch (error) {
      console.log("error in job", error);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login page if not authenticated
    // Alternatively, use a message: return <div className="flex justify-center items-center h-screen"><p className="text-xl font-semibold text-red-600">Please log in to view job details.</p></div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading job details...
        </div>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">
          Job not found. Please check the job ID or try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Posted Days Ago */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-500">
            Posted {dayAgo(singleJob.createdAt)} day{singleJob.createdAt && dayAgo(singleJob.createdAt) !== 1 ? 's' : ''} ago
          </span>
        </div>
        {/* Header: Title and Badges */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {singleJob?.title}
            </h1>
            <div className="flex gap-4 items-center">
              <Badge className="bg-gray-900 hover:bg-gray-800 cursor-pointer text-white rounded-xl">
                {singleJob?.position || 'NaN'} Position{singleJob?.position > 1 ? 's' : ''}
              </Badge>
              <Badge className="bg-gray-900 hover:bg-gray-800 cursor-pointer text-white rounded-xl">
                {singleJob?.salary || 'SS00000'} LPA
              </Badge>
            </div>
          </div>
          <Button
            disabled={isApplied}
            onClick={handleJobApply}
            className={`px-10 rounded-lg bg-orange-600 text-white hover:bg-orange-700 ${
              isApplied ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Details Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Details
          </h2>
          <div className="mt-6">
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">Role:</h3>
              <p>{singleJob?.title || 'Net Developer'}</p>
            </div>
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">Location:</h3>
              <p>{singleJob?.location || 'channel'}</p>
            </div>
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">Description:</h3>
              <p>{singleJob?.description || 'We are looking for a skilled React.js developer.'}</p>
            </div>
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">Experience:</h3>
              <p>{singleJob?.experienceLevel || 'years'}</p>
            </div>
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">Salary:</h3>
              <p>{singleJob?.salary || 'SS00000'} LPA</p>
            </div>
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">Total Applicants:</h3>
              <p>{singleJob?.application?.length || '0'}</p>
            </div>
            <div className="flex gap-4 items-center">
              <h3 className="font-semibold text-lg">Posted Date:</h3>
              <p>{singleJob?.createdAt?.split("T")[0] || '2023-04-00'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription