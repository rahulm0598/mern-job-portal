import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUser, setLoading } from '../redux/authSlice.js';

const UpdateProfileModel = ({ open, setisOpen }) => { 
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(', ') || "", // Convert array to string
    file: user?.profile?.resume || "",
  });

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onChangefileHandler = (e) => {
    setInputs({ ...inputs, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Split skills by comma and space
    const skillsArray = inputs.skills
      .split(/[ ,]+/)  // Split by comma or space
      .map((skill) => skill.trim())  // Trim spaces from each skill
      .filter((skill) => skill.length > 0);  // Remove any empty strings

    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('email', inputs.email);
    formData.append('phoneNumber', inputs.phoneNumber);
    formData.append('bio', inputs.bio);
    
    skillsArray.forEach(skill => {
      formData.append('skills[]', skill); // Append each skill individually
    });

    if (inputs.file) {
      formData.append('file', inputs.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.put('http://localhost:3000/api/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setisOpen(false);
        toast.success("User Updated Successfully");
      }

    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("Update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setisOpen}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your personal information and resume.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input type="text" value={inputs.name} name="name" onChange={onChangeHandler} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" value={inputs.email} name="email" onChange={onChangeHandler} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input type="tel" value={inputs.phoneNumber} name="phoneNumber" onChange={onChangeHandler} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <Textarea placeholder="Tell us about yourself..." name="bio" value={inputs.bio} onChange={onChangeHandler} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
              <Input type="text" value={inputs.skills} name="skills" onChange={onChangeHandler} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF)</label>
              <Input type="file" accept="application/pdf" onChange={onChangefileHandler} />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
              type= "button"
                variant="outline"
                onClick={() => {
                  // Check if no changes were made
                  const noChangesMade =
                    inputs.name === user?.name &&
                    inputs.email === user?.email &&
                    inputs.phoneNumber === user?.phoneNumber &&
                    inputs.bio === user?.profile?.bio &&
                    inputs.skills === (user?.profile?.skills?.join(', ') || "") &&
                    inputs.file === user?.profile?.resume;

                  if (noChangesMade) {
                    toast.info("No changes made");  // Show toast if no changes
                  }

                  setisOpen(false);  // Close the modal
                }}
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">
                {loading ? "Updating..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModel;
