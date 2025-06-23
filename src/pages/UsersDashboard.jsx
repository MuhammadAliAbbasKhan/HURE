









import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectApplications,
  selectTotalApplications,
  selectActiveApplications,
  selectWithdrawnApplications,
  withdrawApplication 
} from '../Slicers/JobSlice.js';

import websites from '../../utils/Website/Website_Info.js';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const applications = useSelector(selectApplications) || [];
  const totalApplications = useSelector(selectTotalApplications);
  const activeApplications = useSelector(selectActiveApplications);
  const withdrawnApplications = useSelector(selectWithdrawnApplications);

  const handleWithdraw = (jobId) => {
    dispatch(withdrawApplication(jobId));
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

  const statCardVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-primary-color-3 text-primary-color-5 font-subheading">
      {/* Header */}
      <header className="bg-primary-color-1 text-primary-color-3 py-4 px-8 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <img 
            src={websites[0]?.logo} 
            alt={`${websites[0]?.name || 'HURE'} Logo`} 
            className="h-12 w-auto"
          />
          <motion.h1 
            className="text-3xl font-bold font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {websites[0]?.name || 'HURE'}
          </motion.h1>
        </div>
        <motion.p 
          className="text-sm italic mt-2 font-subheading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {websites[0]?.slogan || 'Smarter HR for Healthcare Teams'}
        </motion.p>
      </header>

      {/* Dashboard Content */}
      <motion.div 
        className="py-8 px-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-primary-color-2 text-primary-color-5 p-6 rounded-lg shadow-md"
            variants={statCardVariants}
            whileHover="hover"
          >
            <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
            <p className="text-3xl font-bold">{totalApplications}</p>
          </motion.div>
          
          <motion.div 
            className="bg-primary-color-2 text-primary-color-5 p-6 rounded-lg shadow-md"
            variants={statCardVariants}
            whileHover="hover"
          >
            <h3 className="text-lg font-semibold mb-2">Active Applications</h3>
            <p className="text-3xl font-bold text-green-600">{activeApplications}</p>
          </motion.div>
          
          <motion.div 
            className="bg-primary-color-2 text-primary-color-5 p-6 rounded-lg shadow-md"
            variants={statCardVariants}
            whileHover="hover"
          >
            <h3 className="text-lg font-semibold mb-2">Withdrawn</h3>
            <p className="text-3xl font-bold text-red-600">{withdrawnApplications}</p>
          </motion.div>
        </motion.div>

        {/* Active Applications */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 font-heading">Your Job Applications</h2>
          
          {applications?.length === 0 ? (
            <motion.p 
              className="text-gray-500 italic"
              variants={itemVariants}
            >
              You haven't applied to any jobs yet.
            </motion.p>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {applications?.map((job) => (
                <motion.div 
                  key={job?.id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <h3 className="text-xl font-semibold">{job?.title}</h3>
                    <p className="text-primary-color-4">{job?.company}</p>
                    <p className="mt-2">
                      Status: <span className={`font-semibold ${job?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                        {job?.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied on: {new Date(job?.appliedDate)?.toLocaleDateString()}
                    </p>
                  </div>
                  
                  {job?.status === 'active' && (
                    <motion.button 
                      onClick={() => handleWithdraw(job?.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      Withdraw Application
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Withdraw Section */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 font-heading">Applications to Withdraw</h2>
          {activeApplications === 0 ? (
            <motion.p 
              className="text-gray-500 italic"
              variants={itemVariants}
            >
              No applications available to withdraw.
            </motion.p>
          ) : (
            <motion.ul 
              className="space-y-3"
              variants={containerVariants}
            >
              {applications
                ?.filter(job => job?.status === 'active')
                ?.map(job => (
                  <motion.li 
                    key={job?.id}
                    className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                    variants={itemVariants}
                  >
                    <span>{job?.title} - {job?.company}</span>
                    <motion.button 
                      onClick={() => handleWithdraw(job?.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      Withdraw
                    </motion.button>
                  </motion.li>
                ))}
            </motion.ul>
          )}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-primary-color-5 text-primary-color-3 py-6 px-8 text-center">
        <p className="mb-2">
          Contact us: {websites[0]?.contactwebsite || 'N/A'} | {websites[0]?.contactnumber1 || 'N/A'}
        </p>
        <div className="flex justify-center gap-4">
          {websites[0]?.facebookaccount && (
            <a 
              href={websites[0]?.facebookaccount} 
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          )}
          {websites[0]?.instagramaccount && (
            <a 
              href={websites[0]?.instagramaccount} 
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}
          {websites[0]?.linkedinaccount && (
            <a 
              href={websites[0]?.linkedinaccount} 
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;