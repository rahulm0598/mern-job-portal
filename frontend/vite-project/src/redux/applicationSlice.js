import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    appliedJobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAppliedJobs, setLoading, setError } = applicationSlice.actions;

// Action creator to fetch applied jobs
export const fetchAppliedJobs = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('http://localhost:3000/api/application/applied', {
      withCredentials: true, // Send cookies with the request
    });
    dispatch(setAppliedJobs(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch applied jobs'));
  }
};

export default applicationSlice.reducer;