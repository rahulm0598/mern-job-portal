import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

import { Button } from "../ui/button";
import { setAdminJobs } from "@/redux/jobSlice";// Adjust based on your Redux slice

const UpdateJobs = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company); // Fetch companies from Redux
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    salary: "",
    requirements: "",
    location: "",
    experiencelevel: "",
    jobtype: "",
    position: "",
    company: "",
  });

  // Fetch job data on mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/job/getsingle/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          const job = response.data.job;
          setInputs({
            title: job.title,
            description: job.description,
            salary: job.salary.toString(),
            requirements: job.requirements.join(", "),
            location: job.location,
            experiencelevel: job.experienceLevel.toString(),
            jobtype: job.jobType,
            position: job.position.toString(),
            company: job.company._id || job.company, // Handle populated company
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to fetch job details");
      }
    };

    fetchJob();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle company selection
  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value;
    setInputs((prev) => ({ ...prev, company: selectedCompanyId }));
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.company) {
      toast.error("Please select a company");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:3000/api/job/update/${id}`,
        {
          ...inputs,
          salary: Number(inputs.salary),
          experiencelevel: Number(inputs.experiencelevel),
          position: Number(inputs.position),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setAdminJobs(response.data.job)); // Update Redux store
        toast.success(response.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating job:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Job</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <Input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />
        <Textarea
          name="description"
          value={inputs.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
        />
        <Input
          type="number"
          name="salary"
          value={inputs.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />
        <Input
          type="text"
          name="requirements"
          value={inputs.requirements}
          onChange={handleChange}
          placeholder="Requirements (comma-separated)"
          required
        />
        <Input
          type="text"
          name="location"
          value={inputs.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <Input
          type="number"
          name="experiencelevel"
          value={inputs.experiencelevel}
          onChange={handleChange}
          placeholder="Experience Level (years)"
          required
        />
        <Select
          name="jobtype"
          value={inputs.jobtype}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </Select>
        <Input
          type="number"
          name="position"
          value={inputs.position}
          onChange={handleChange}
          placeholder="Number of Positions"
          required
        />
        <Select
          name="company"
          value={inputs.company}
          onChange={handleCompanyChange}
          required
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </Select>
        <Button
          disabled={loading}
          type="submit"
          className="bg-black text-white mt-6 w-[40%] rounded-lg mx-auto hover:bg-gray-800"
        >
          {loading ? "Updating..." : "Update Job"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateJobs;