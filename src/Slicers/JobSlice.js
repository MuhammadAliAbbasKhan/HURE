import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [
    {
      id: '1',
      title: 'Registered Nurse',
      company: 'City General Hospital',
      status: 'active',
      appliedDate: '2023-05-15',
    },
    {
      id: '2',
      title: 'Medical Assistant',
      company: 'Community Clinic',
      status: 'active',
      appliedDate: '2023-06-01',
    },
    {
      id: '3',
      title: 'Healthcare Administrator',
      company: 'Regional Medical Center',
      status: 'withdrawn',
      appliedDate: '2023-04-10',
    },
  ],
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    withdrawApplication: (state, action) => {
      const jobId = action.payload;
      const jobIndex = state.applications.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        state.applications[jobIndex].status = 'withdrawn';
      }
    },
    addApplication: (state, action) => {
      state.applications.push({
        id: Date.now().toString(),
        ...action.payload,
        status: 'active',
        appliedDate: new Date().toISOString(),
      });
    },
    updateApplicationStatusFromClinic: (state, action) => {
      const { jobId, status } = action.payload;
      const job = state.applications.find(app => app.id === jobId);
      if (job) {
        job.status = status;
      }
    },
  },
});

// Selectors with default values
export const selectApplications = (state) => state.jobs?.applications || [];
export const selectTotalApplications = (state) => selectApplications(state).length;
export const selectActiveApplications = (state) => 
  selectApplications(state).filter(app => app.status === 'active').length;
export const selectWithdrawnApplications = (state) => 
  selectApplications(state).filter(app => app.status === 'withdrawn').length;

export const { 
  withdrawApplication, 
  addApplication,
  updateApplicationStatusFromClinic
} = jobsSlice.actions;

export default jobsSlice.reducer;