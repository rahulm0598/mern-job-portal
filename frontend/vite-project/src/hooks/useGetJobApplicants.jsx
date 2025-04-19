// src/hooks/useGetJobApplicants.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJobApplicants } from '@/redux/applicationSlice';

const useGetJobApplicants = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobApplicants());
  }, [dispatch]);
};

export default useGetJobApplicants;