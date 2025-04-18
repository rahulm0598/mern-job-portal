import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const UpdateCompany = () => {
  const [inputs, setInputs] = useState({
    name: "",
    date: "",
    location: "",
    website: "",
    description: "",
    file: null,
  });
  const params = useParams();
  const companyId = params.id;
  const [loading, setLoading] = useState(false);
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInputs({ ...inputs, file });
  };
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("website", inputs.website);
    formData.append("location", inputs.location);
    if (inputs.file) {
      formData.append("file", inputs.file);
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/company/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        navigate("/admin/companies");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in updating company", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-16">
        <div>
          <h1 className="text-3xl font-bold">Update company</h1>
        </div>
        <div className="flex justify-center items-center mt-16 mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-[500px] py-12 mx-auto shadow-lg rounded-xl border-2 border-black flex flex-col gap-3"
          >
            <h2 className="text-lg font-semibold mt-3 text-center">
              Update Company
            </h2>
            <div className="grid w-full px-3  items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={inputs.name}
                onChange={onChangeHandler}
                placeholder="Enter your name"
              />
            </div>
            <div className="grid w-full px-3  items-center gap-1.5">
              <Label htmlFor="name">website</Label>
              <Input
                type="text"
                name="website"
                value={inputs.website}
                onChange={onChangeHandler}
                placeholder="your website"
              />
            </div>

            <div className="grid w-full px-3  items-center gap-1.5">
              <Label htmlFor="name">Description</Label>
              <Input
                type="text"
                name="description"
                value={inputs.description}
                onChange={onChangeHandler}
                placeholder="Enter your description"
              />
            </div>
            <div className="grid w-full px-3  items-center gap-1.5">
              <Label htmlFor="name">Location</Label>
              <Input
                type="text"
                name="location"
                value={inputs.location}
                onChange={onChangeHandler}
                placeholder="Enter your location"
              />
            </div>
            <div className="grid w-full px-3  items-center gap-1.5">
              <Label htmlFor="name">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className=" bg-black text-white w-[90%] rounded-lg mx-auto hover:bg-black"
            >
              {loading ? "updating" : "update"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateCompany;
