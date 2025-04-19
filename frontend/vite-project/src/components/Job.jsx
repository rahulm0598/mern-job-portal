import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

const Job = ({ job, user }) => {
  const navigate = useNavigate();
  const JobId = job._id;

  const handleViewClick = () => {
    if (user) {
      navigate(`/job/description/${JobId}`);
    } else {
      toast.info("You need to log in to view job details");
      navigate("/login");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 space-y-5 w-full border border-gray-100">
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>{new Date(job.createdAt).toDateString()}</span>
        <span className="text-blue-500 font-medium">Featured</span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={job?.company?.logo || "https://via.placeholder.com/48"}
          alt="Company Logo"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">{job?.company?.name || "Company"}</h2>
          <Badge className="mt-1 bg-gray-200 text-gray-600 rounded-full">{job.location}</Badge>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{job.description}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Badge className="bg-indigo-100 text-indigo-700 rounded-full">{job.position}</Badge>
          <Badge className="bg-blue-100 text-blue-700 rounded-full">{job.jobType}</Badge>
          <Badge className="bg-green-100 text-green-700 rounded-full">{job.salary} LPA</Badge>
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleViewClick}
          className={`px-5 transition-colors duration-200 ${user ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"}`}
        >
          View Details
        </Button>
        <Button  variant="outline" className="hover:bg-gray-100 px-5">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;