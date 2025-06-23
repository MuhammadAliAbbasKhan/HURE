import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectPostedJobs,
  selectApplications,
  postNewJob,
  deleteJob,
  updateApplicationStatus,
  sendStatusEmail
} from '../Slicers/ClinicJobSlice';
import websites from '../../utils/Website/Website_Info';

const ClinicDashboard = () => {
  const dispatch = useDispatch();
  const postedJobs = useSelector(selectPostedJobs);
  const applications = useSelector(selectApplications);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    description: '',
    type: 'Full-time',
    salary: 'Negotiable'
  });
  const [selectedJob, setSelectedJob] = useState(null);

  const handlePostJob = () => {
    if (!newJob.title || !newJob.department) {
      alert('Please fill in all required fields');
      return;
    }
    
    dispatch(postNewJob({
      ...newJob,
      status: 'open' // Ensure status is always open for new jobs
    }));
    setNewJob({ 
      title: '', 
      department: '', 
      description: '',
      type: 'Full-time',
      salary: 'Negotiable'
    });
  };

  const handleStatusUpdate = async (jobId, userId, status) => {
    dispatch(updateApplicationStatus({ jobId, userId, status }));
    
    // Find job title for email
    const job = postedJobs.find(j => j.id === jobId);
    if (job) {
      await dispatch(sendStatusEmail({ 
        email: `${userId}@example.com`, // Replace with actual email lookup
        status,
        jobTitle: job.title
      }));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-primary-color-3 text-primary-color-5 font-subheading">
      {/* Header */}
      <header className="bg-primary-color-1 text-primary-color-3 py-4 px-8 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <img 
            src={websites[0]?.logo} 
            alt={`${websites[0]?.name || 'Clinic'} Logo`} 
            className="h-12 w-auto"
          />
          <h1 className="text-3xl font-bold font-heading">
            {websites[0]?.name || 'Clinic'} Dashboard
          </h1>
        </div>
        <p className="text-sm italic mt-2 font-subheading">
          Healthcare Job Management System
        </p>
      </header>

      <motion.div 
        className="py-8 px-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Job Posting Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 font-heading">Post New Job</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title*</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department*</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newJob.department}
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Type</label>
                <select
                  className="w-full p-2 border rounded"
                  value={newJob.type}
                  onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                  placeholder="Negotiable"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description*</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                required
              />
            </div>
            <motion.button
              onClick={handlePostJob}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Post Job
            </motion.button>
          </div>
        </motion.div>

        {/* Posted Jobs Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 font-heading">Posted Jobs ({postedJobs.length})</h2>
          <div className="space-y-4">
            {postedJobs.map((job) => (
              <motion.div 
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-primary-color-4">{job.department}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Posted on: {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1">
                      Status: <span className={`font-semibold ${
                        job.status === 'open' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {job.status}
                      </span>
                    </p>
                    <p className="mt-1">
                      Type: <span className="font-semibold">{job.type || 'Full-time'}</span>
                    </p>
                    <p className="mt-1">
                      Salary: <span className="font-semibold">{job.salary || 'Negotiable'}</span>
                    </p>
                    <p className="mt-1">
                      Applicants: <span className="font-semibold">
                        {job.applicants?.length || 0}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      {selectedJob?.id === job.id ? 'Hide Details' : 'View Applicants'}
                    </motion.button>
                    <motion.button
                      onClick={() => dispatch(deleteJob(job.id))}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>

                {selectedJob?.id === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <h4 className="font-medium mb-3">Applicants ({job.applicants?.length || 0})</h4>
                    {job.applicants?.length > 0 ? (
                      <ul className="space-y-3">
                        {job.applicants.map(userId => {
                          const application = applications.find(app => 
                            app.jobId === job.id && app.userId === userId
                          );
                          return (
                            <li key={userId} className="flex justify-between items-center">
                              <div>
                                <p>User ID: {userId}</p>
                                {application && (
                                  <p className="text-sm">
                                    Status: <span className={`font-semibold ${
                                      application.status === 'accepted' ? 'text-green-600' : 
                                      application.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                                    }`}>
                                      {application.status || 'pending'}
                                    </span>
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <motion.button
                                  onClick={() => handleStatusUpdate(job.id, userId, 'accepted')}
                                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Accept
                                </motion.button>
                                <motion.button
                                  onClick={() => handleStatusUpdate(job.id, userId, 'rejected')}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Reject
                                </motion.button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No applicants yet</p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClinicDashboard;