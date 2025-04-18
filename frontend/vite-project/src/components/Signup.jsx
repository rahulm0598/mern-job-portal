import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import topography from '../assets/topography.svg';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    password: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setError('');
  };

  const fileHandler = (e) => {
    setInputs({ ...inputs, file: e.target.files?.[0] });
    setError('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.email || !inputs.role || !inputs.phoneNumber || !inputs.password) {
      setError('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('email', inputs.email);
    formData.append('role', inputs.role);
    formData.append('phoneNumber', inputs.phoneNumber);
    formData.append('password', inputs.password);
    if (inputs.file) {
      formData.append('file', inputs.file);
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/user/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Signup Successful');
        navigate('/login');
      } else {
        setError(response.data.message || 'Signup Failed');
        toast.error(response.data.message || 'Signup Failed');
      }
    } catch (error) {
      console.error('Error in Signup', error);
      setError(error.response?.data?.message || 'Something went wrong');
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center p-4"
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?t=st=1744972054~exp=1744975654~hmac=50e2ec50a906980347d9e2b00278f204d4d1565c76b72bcaa9a90d572f55f9c2&w=1380")`,
        }}
    >
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-600">Jobify</h1>
          <p className="text-sm text-gray-600 mt-2">Create your account</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={inputs.name}
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter your name"
            className="border-gray-300 focus:ring-2 focus:ring-orange-500 transition-all"
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            value={inputs.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Enter your email"
            className="border-gray-300 focus:ring-2 focus:ring-orange-500 transition-all"
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={onChangeHandler}
            type="tel"
            placeholder="Enter your phone number"
            className="border-gray-300 focus:ring-2 focus:ring-orange-500 transition-all"
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            value={inputs.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Enter your password"
            className="border-gray-300 focus:ring-2 focus:ring-orange-500 transition-all"
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">
            Select Role <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                value="student"
                name="role"
                checked={inputs.role === 'student'}
                onChange={onChangeHandler}
                className="accent-orange-500 focus:ring-orange-500"
                aria-required="true"
              />
              Student
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                value="recruiter"
                name="role"
                checked={inputs.role === 'recruiter'}
                onChange={onChangeHandler}
                className="accent-orange-500 focus:ring-orange-500"
                aria-required="true"
              />
              Recruiter
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file" className="text-gray-700 font-medium">
            Profile Picture
          </Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            onChange={fileHandler}
            className="border-gray-300 focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-600 text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Signing up...
            </span>
          ) : (
            'Sign Up'
          )}
        </Button>

        <div className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;