// applicationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    appliedJobs: [],
    jobApplicants: [], // New state for applicants
    loading: false,
    error: null,
  },
  reducers: {
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setJobApplicants: (state, action) => {
      state.jobApplicants = action.payload;
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

export const { setAppliedJobs, setJobApplicants, setLoading, setError } = applicationSlice.actions;

// Action creator to fetch applied jobs (for students)
export const fetchAppliedJobs = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('http://localhost:3000/api/application/applied', {
      withCredentials: true,
    });
    dispatch(setAppliedJobs(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch applied jobs'));
  }
};

// Action creator to fetch job applicants (for recruiters)
export const fetchJobApplicants = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Fetch all jobs created by the recruiter first
    const jobsResponse = await axios.get('http://localhost:3000/api/job/getAdminJobs', {
      withCredentials: true,
    });

    if (jobsResponse.data.success) {
      const jobs = jobsResponse.data.jobs;
      const applicantsPromises = jobs.map((job) =>
        axios.get(`http://localhost:3000/api/application/getapplicants/${job._id}`, {
          withCredentials: true,
        })
      );

      const applicantsResponses = await Promise.all(applicantsPromises);
      const allApplicants = applicantsResponses
        .filter((response) => response.data.success)
        .flatMap((response, index) => {
          const job = jobs[index];
          return response.data.applicants.application.map((app) => ({
            applicantName: app.applicant.name,
            jobTitle: job.title,
            jobId: job._id,
            applicationId: app._id,
            status: app.status,
          }));
        });

      dispatch(setJobApplicants(allApplicants));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch job applicants'));
  }
};

export default applicationSlice.reducer;