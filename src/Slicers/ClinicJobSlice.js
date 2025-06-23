import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import emailService from '../../services/emailService';

const initialState = {
  postedJobs: [
    {
      id: '1',
      title: 'Registered Nurse',
      department: 'Emergency',
      description: 'Provide emergency care to patients',
      type: 'Full-time',
      salary: '$65,000 - $85,000',
      status: 'open',
      applicants: ['user1', 'user2'],
      createdAt: '2023-05-10'
    }
  ],
  applications: [
    {
      jobId: '1',
      userId: 'user1',
      status: 'pending',
      appliedAt: '2023-05-12'
    },
    {
      jobId: '1',
      userId: 'user2',
      status: 'pending',
      appliedAt: '2023-05-15'
    }
  ],
  status: 'idle',
  error: null
};

// Async thunk for sending emails
export const sendStatusEmail = createAsyncThunk(
  'jobs/sendStatusEmail',
  async ({ email, status, jobTitle }, { rejectWithValue }) => {
    try {
      // In a real app, you would call your email service here
      // const response = await emailService.send({...});
      return { success: true }; // Mock response
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Email failed');
    }
  }
);

const clinicJobsSlice = createSlice({
  name: 'clinicJobs',
  initialState,
  reducers: {
    postNewJob: (state, action) => {
      const newJob = {
        id: Date.now().toString(),
        ...action.payload,
        status: 'open', // Ensure status is open
        applicants: [],
        createdAt: new Date().toISOString()
      };
      state.postedJobs.unshift(newJob); // Add to beginning of array
    },
    deleteJob: (state, action) => {
      const jobId = action.payload;
      // Remove job from postedJobs
      state.postedJobs = state.postedJobs.filter(job => job.id !== jobId);
      // Remove related applications
      state.applications = state.applications.filter(app => app.jobId !== jobId);
    },
    addApplication: (state, action) => {
      const { jobId, userId } = action.payload;
      
      // Add to job's applicants if not already there
      const job = state.postedJobs.find(job => job.id === jobId);
      if (job && !job.applicants.includes(userId)) {
        job.applicants.push(userId);
      }
      
      // Add to applications array if not already there
      const existingApp = state.applications.find(app => 
        app.jobId === jobId && app.userId === userId
      );
      if (!existingApp) {
        state.applications.push({
          jobId,
          userId,
          status: 'pending',
          appliedAt: new Date().toISOString()
        });
      }
    },
    updateApplicationStatus: (state, action) => {
      const { jobId, userId, status } = action.payload;
      const application = state.applications.find(app => 
        app.jobId === jobId && app.userId === userId
      );
      
      if (application) {
        application.status = status;
        application.updatedAt = new Date().toISOString();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendStatusEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendStatusEmail.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendStatusEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectPostedJobs = (state) => state.clinicJobs.postedJobs;
export const selectApplications = (state) => state.clinicJobs.applications;
export const selectOpenJobs = (state) => 
  state.clinicJobs.postedJobs.filter(job => job.status === 'open');
export const selectJobApplicants = (state, jobId) => 
  state.clinicJobs.applications.filter(app => app.jobId === jobId);

export const { 
  postNewJob, 
  deleteJob, 
  addApplication, 
  updateApplicationStatus 
} = clinicJobsSlice.actions;

export default clinicJobsSlice.reducer;