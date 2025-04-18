import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import topography from '../assets/topography.svg';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.role) {
      setError('Please fill all fields');
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post('http://localhost:3000/api/user/signin', inputs, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message || 'Login Successful');
        navigate('/home');
      } else {
        setError(response.data.message || 'Login Failed');
        toast.error(response.data.message || 'Login Failed');
      }
    } catch (error) {
      console.error('Error in Login', error);
      setError(error.response?.data?.message || 'Something went wrong');
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
   
   
    <div
    style={{
      backgroundImage: `url("https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?t=st=1744972054~exp=1744975654~hmac=50e2ec50a906980347d9e2b00278f204d4d1565c76b72bcaa9a90d572f55f9c2&w=1380")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
       height: "90vh",
       width: "85vw",
      overflow: "hidden",
    }}
    className="flex justify-center items-center"
  >
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-600">Jobify</h1>
          <p className="text-sm text-gray-600 mt-2">Login to your account</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            value={inputs.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Enter your email"
            className="border-gray-300 focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            value={inputs.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Enter your password"
            className="border-gray-300 focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Select Role</Label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                value="student"
                name="role"
                checked={inputs.role === 'student'}
                onChange={onChangeHandler}
                className="accent-orange-500 focus:ring-orange-500"
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
              />
              Recruiter
            </label>
          </div>
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
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </Button>

        <div className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-orange-600 font-medium hover:underline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;