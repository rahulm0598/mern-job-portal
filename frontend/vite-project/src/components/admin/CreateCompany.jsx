import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
const CreateCompany = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/company/register",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        navigate(`/admin/update/company/${response.data.company._id}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in creating company", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div>
        <h1 className="text-3xl font-bold">Create a new company</h1>
      </div>
      <div className="flex justify-center items-center mt-16 mx-auto">
        <form className="w-[500px] py-12 mx-auto shadow-lg rounded-xl border-2 border-black flex flex-col gap-3">
          <h2 className="text-lg font-semibold mt-3 text-center">
            Create New Company
          </h2>
          <div className="grid w-full px-3  items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <Button
            onClick={submitHandler}
            disabled={loading}
            type="submit"
            className=" bg-black text-white w-[90%] rounded-lg mx-auto hover:bg-black"
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
export default CreateCompany;
