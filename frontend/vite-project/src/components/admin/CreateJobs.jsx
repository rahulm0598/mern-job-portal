import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateJobs = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { companies } = useSelector((store) => store.company);

  const HandleChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name.toLowerCase() === value
    );
    setInputs({ ...inputs, company: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.company) {
      toast.error("Please select a company");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/job/post",
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
        dispatch(setAdminJobs(response.data.job));
        toast.success(response.data.message);
        navigate(`/admin/jobs`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("error in creating job", error);
      toast.error("Failed to create job");
    } finally {
      setLoading(false);
    }
  };
  
  <Button
  disabled={loading || !inputs.company}
  type="submit"
  className="bg-black text-white mt-12 w-[40%] rounded-lg mx-auto hover:bg-black"
>
  {loading ? "Creating..." : "Create"}
</Button>

  return (
    <div className="py-5">
      <div>
        <h1 className="text-3xl font-bold">Create a new Job</h1>
      </div>
      <div className="flex justify-center items-center mt-16 mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[500px] py-12 mx-auto shadow-lg rounded-xl border-2 border-black flex flex-col gap-3"
        >
          <h2 className="text-lg font-semibold mt-3 text-center">
            Create New Job
          </h2>

          {[
            { name: "title", placeholder: "Enter job title" },
            { name: "description", placeholder: "Enter job description" },
            { name: "salary", placeholder: "Enter salary", type: "number" },
            { name: "location", placeholder: "Enter location" },
            {
              name: "requirements",
              placeholder: "Enter requirements (comma separated)",
            },
            {
              name: "experiencelevel",
              placeholder: "Enter experience level (number)",
              type: "number",
            },
            { name: "jobtype", placeholder: "Enter job type" },
            {
              name: "position",
              placeholder: "Enter number of positions",
              type: "number",
            },
          ].map(({ name, placeholder, type = "text" }) => (
            <div key={name} className="grid w-full px-3 gap-1.5">
              <Label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</Label>
              <Input
                type={type}
                name={name}
                value={inputs[name]}
                onChange={onChangeHandler}
                placeholder={placeholder}
              />
            </div>
          ))}

          <div className="grid w-full px-3 z-30 gap-1.5">
            <Label>Select Company</Label>
            <Select onValueChange={HandleChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    inputs.company
                      ? companies.find((c) => c._id === inputs.company)?.name
                      : "Select company"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies
                    .filter((company) => company?.name?.trim() !== "")
                    .map((company) => (
                      <SelectItem
                        key={company?._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="bg-black text-white mt-12 w-[40%] rounded-lg mx-auto hover:bg-black"
          >
            {loading ? "Creating..." : "Create"}
          </Button>

          {companies.length === 0 && (
            <p className="text-center text-red-600 mt-3">
              No companies found. Please add a company to post a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateJobs;
