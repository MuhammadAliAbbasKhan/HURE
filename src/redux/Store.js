// store.js
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../Slicers/JobSlice';
import clinicJobsReducer from '../Slicers/ClinicJobSlice';

export const store = configureStore({
  reducer: {
    userJobs: jobsReducer,
    clinicJobs: clinicJobsReducer,
  },
});