// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   selectOpenJobs,
//   addApplication,
//   postNewJob
// } from '../Slicers/ClinicJobSlice';
// import { addApplication as addUserApplication } from '../Slicers/JobSlice';
// import websites from '../../utils/Website/Website_Info.js';
// import styles from '../../styles/colors.module.scss';

// const HUREHire = () => {
//   const dispatch = useDispatch();
//   const jobs = useSelector(selectOpenJobs);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Filter states
//   const [locationFilter, setLocationFilter] = useState('');
//   const [roleFilter, setRoleFilter] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
  
//   // Authentication states (example: replace with actual auth logic)
//   const [isEmployer, setIsEmployer] = useState(false); // Set based on auth
//   const [isAdmin, setIsAdmin] = useState(false); // Set based on auth
//   const [userApproved, setUserApproved] = useState(false); // Set based on auth
  
//   // Form states
//   const [showJobForm, setShowJobForm] = useState(false);
//   const [newJob, setNewJob] = useState({
//     title: '',
//     department: '', // Changed from location/facility to match ClinicJobSlice
//     description: '',
//     type: 'Full-time',
//     salary: ''
//   });
  
//   // Application states
//   const [showApplication, setShowApplication] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [cvFile, setCvFile] = useState(null);

//   // Replace with actual user ID from auth context or Redux
//   const userId = 'user123'; // Placeholder: Replace with actual user ID

//   // Get website data
//   const website = websites[0];

//   // Update filtered jobs when Redux jobs change
//   useEffect(() => {
//     let results = jobs;
//     if (locationFilter) {
//       results = results.filter(job => 
//         (job.department || '').toLowerCase().includes(locationFilter.toLowerCase())
//       );
//     }
//     if (roleFilter) {
//       results = results.filter(job => 
//         job.title.toLowerCase().includes(roleFilter.toLowerCase())
//       );
//     }
//     if (typeFilter) {
//       results = results.filter(job => (job.type || '') === typeFilter);
//     }
//     setFilteredJobs(results);
//   }, [locationFilter, roleFilter, typeFilter, jobs]);

//   // Handle job posting
//   const handlePostJob = (e) => {
//     e.preventDefault();
//     dispatch(postNewJob({
//       title: newJob.title,
//       department: newJob.department,
//       description: newJob.description,
//       salary: newJob.salary || 'Negotiable',
//       type: newJob.type
//     }));
//     setNewJob({
//       title: '',
//       department: '',
//       description: '',
//       type: 'Full-time',
//       salary: ''
//     });
//     setShowJobForm(false);
//   };

//   // Handle job application
//   const handleApply = (e) => {
//     e.preventDefault();
//     if (!selectedJob || !userId) {
//       alert('Error: Please log in and select a job to apply.');
//       return;
//     }
    
//     // Dispatch to both ClinicJobSlice and JobSlice
//     dispatch(addApplication({ jobId: selectedJob.id, userId }));
//     dispatch(addUserApplication({ jobId: selectedJob.id, userId }));
    
//     // In a real app, handle CV upload (e.g., to a server)
//     alert(`Application submitted for ${selectedJob.title}`);
//     setShowApplication(false);
//     setSelectedJob(null);
//     setCvFile(null);
//   };

//   // Animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="min-h-screen mt-24 bg-gray-50" style={{ backgroundColor: styles.primaryColor3 }}>
//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <aside className="md:w-1/4">
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="p-6 rounded-lg shadow-md sticky top-8"
//               style={{ 
//                 backgroundColor: styles.primaryColor3,
//                 fontFamily: styles.subheadingFont
//               }}
//             >
//               <h2 className="text-xl font-semibold mb-4" style={{ color: styles.primaryColor5 }}>
//                 Filter Jobs
//               </h2>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Department"
//                     value={locationFilter}
//                     onChange={(e) => setLocationFilter(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                     style={{ 
//                       borderColor: styles.primaryColor4,
//                       focusRing: styles.primaryColor1
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                     Job Title
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Nurse, Therapist, etc."
//                     value={roleFilter}
//                     onChange={(e) => setRoleFilter(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                     style={{ 
//                       borderColor: styles.primaryColor4,
//                       focusRing: styles.primaryColor1
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                     Job Type
//                   </label>
//                   <select
//                     value={typeFilter}
//                     onChange={(e) => setTypeFilter(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                     style={{ 
//                       borderColor: styles.primaryColor4,
//                       focusRing: styles.primaryColor1
//                     }}
//                   >
//                     <option value="">All Types</option>
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Contract">Contract</option>
//                     <option value="Temporary">Temporary</option>
//                   </select>
//                 </div>
                
//                 <button
//                   onClick={() => {
//                     setLocationFilter('');
//                     setRoleFilter('');
//                     setTypeFilter('');
//                   }}
//                   className="w-full py-2 rounded-md transition"
//                   style={{ 
//                     backgroundColor: styles.primaryColor4,
//                     color: 'white',
//                     hoverBg: styles.primaryColor5
//                   }}
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             </motion.div>
//           </aside>

//           {/* Job Listings */}
//           <div className="md:w-3/4">
//             {(isEmployer || isAdmin) && (
//               <motion.button
//                 onClick={() => setShowJobForm(true)}
//                 className="mb-6 px-4 py-2 rounded-md"
//                 style={{ 
//                   backgroundColor: styles.primaryColor1,
//                   color: 'white',
//                   hoverBg: styles.primaryColor5
//                 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Post New Job
//               </motion.button>
//             )}
            
//             <h2 className="text-2xl font-semibold mb-6" style={{ color: styles.primaryColor5, fontFamily: styles.headingFont }}>
//               Healthcare Job Openings
//             </h2>
            
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: styles.primaryColor1 }}></div>
//               </div>
//             ) : filteredJobs.length === 0 ? (
//               <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
//                 <p style={{ color: styles.primaryColor5 }}>No jobs match your filters. Try adjusting your search criteria.</p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <AnimatePresence>
//                   {filteredJobs.map((job) => (
//                     <motion.div
//                       key={job.id}
//                       variants={cardVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="hidden"
//                       transition={{ duration: 0.3 }}
//                       whileHover={{ scale: 1.01 }}
//                       className="rounded-lg shadow-md overflow-hidden border-l-4"
//                       style={{ 
//                         backgroundColor: styles.primaryColor3,
//                         borderLeftColor: styles.primaryColor1 
//                       }}
//                     >
//                       <div className="p-6">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
//                               {job.title}
//                             </h3>
//                             <p className="mt-1" style={{ color: styles.primaryColor4 }}>
//                               {job.department}
//                             </p>
//                           </div>
//                           <span 
//                             className="text-xs px-3 py-1 rounded-full"
//                             style={{ 
//                               backgroundColor: styles.primaryColor2,
//                               color: styles.primaryColor5
//                             }}
//                           >
//                             {job.type || 'Full-time'}
//                           </span>
//                         </div>
                        
//                         <p className="mt-4" style={{ color: styles.primaryColor5 }}>
//                           {job.description}
//                         </p>
                        
//                         <div className="mt-6 flex justify-between items-center">
//                           <div>
//                             <p className="font-medium" style={{ color: styles.primaryColor5 }}>
//                               {job.salary || 'Negotiable'}
//                             </p>
//                             <p className="text-sm" style={{ color: styles.primaryColor4 }}>
//                               Posted {new Date(job.createdAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => {
//                               setSelectedJob(job);
//                               setShowApplication(true);
//                             }}
//                             className="px-4 py-2 rounded-md transition"
//                             style={{ 
//                               backgroundColor: styles.primaryColor1,
//                               color: 'white',
//                               hoverBg: styles.primaryColor5
//                             }}
//                           >
//                             Apply Now
//                           </motion.button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Post Job Modal */}
//       <AnimatePresence>
//         {showJobForm && (isEmployer || isAdmin) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="rounded-lg shadow-xl w-full max-w-md"
//               style={{ backgroundColor: styles.primaryColor3 }}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
//                     Post a Job Opening
//                   </h3>
//                   <button
//                     onClick={() => setShowJobForm(false)}
//                     style={{ color: styles.primaryColor5 }}
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                     </svg>
//                   </button>
//                 </div>
                
//                 <form onSubmit={handlePostJob}>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Job Title*
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         value={newJob.title}
//                         onChange={(e) => setNewJob({...newJob, title: e.target.value})}
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Department*
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         value={newJob.department}
//                         onChange={(e) => setNewJob({...newJob, department: e.target.value})}
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Job Type*
//                       </label>
//                       <select
//                         required
//                         value={newJob.type}
//                         onChange={(e) => setNewJob({...newJob, type: e.target.value})}
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       >
//                         <option value="Full-time">Full-time</option>
//                         <option value="Part-time">Part-time</option>
//                         <option value="Contract">Contract</option>
//                         <option value="Temporary">Temporary</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Salary (optional)
//                       </label>
//                       <input
//                         type="text"
//                         value={newJob.salary}
//                         onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Job Description*
//                       </label>
//                       <textarea
//                         required
//                         value={newJob.description}
//                         onChange={(e) => setNewJob({...newJob, description: e.target.value})}
//                         rows="4"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       ></textarea>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6 flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setShowJobForm(false)}
//                       className="px-4 py-2 border rounded-md"
//                       style={{ 
//                         borderColor: styles.primaryColor4,
//                         color: styles.primaryColor5,
//                         hoverBg: styles.primaryColor2
//                       }}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 rounded-md"
//                       style={{ 
//                         backgroundColor: styles.primaryColor1,
//                         color: 'white',
//                         hoverBg: styles.primaryColor5
//                       }}
//                     >
//                       Post Job
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Application Modal */}
//       <AnimatePresence>
//         {showApplication && selectedJob && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="rounded-lg shadow-xl w-full max-w-md"
//               style={{ backgroundColor: styles.primaryColor3 }}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
//                     Apply for {selectedJob.title}
//                   </h3>
//                   <button
//                     onClick={() => setShowApplication(false)}
//                     style={{ color: styles.primaryColor5 }}
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                     </svg>
//                   </button>
//                 </div>
                
//                 <div className="mb-6">
//                   <p className="mb-2" style={{ color: styles.primaryColor5 }}>
//                     <span className="font-medium">Department:</span> {selectedJob.department}
//                   </p>
//                   <p className="mb-2" style={{ color: styles.primaryColor5 }}>
//                     <span className="font-medium">Type:</span> {selectedJob.type || 'Full-time'}
//                   </p>
//                   <p style={{ color: styles.primaryColor5 }}>
//                     <span className="font-medium">Salary:</span> {selectedJob.salary || 'Negotiable'}
//                   </p>
//                 </div>
                
//                 <form onSubmit={handleApply}>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Full Name*
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Email*
//                       </label>
//                       <input
//                         type="email"
//                         required
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Phone Number*
//                       </label>
//                       <input
//                         type="tel"
//                         required
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Cover Letter (optional)
//                       </label>
//                       <textarea
//                         rows="4"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
//                         style={{ 
//                           borderColor: styles.primaryColor4,
//                           focusRing: styles.primaryColor1
//                         }}
//                       ></textarea>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
//                         Upload CV/Resume*
//                       </label>
//                       <div className="mt-1 flex items-center">
//                         <label 
//                           className="cursor-pointer py-2 px-3 border rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
//                           style={{ 
//                             backgroundColor: styles.primaryColor3,
//                             borderColor: styles.primaryColor4,
//                             color: styles.primaryColor5,
//                             focusRing: styles.primaryColor1
//                           }}
//                         >
//                           Choose File
//                           <input
//                             type="file"
//                             required
//                             onChange={(e) => setCvFile(e.target.files[0])}
//                             className="sr-only"
//                             accept=".pdf,.doc,.docx"
//                           />
//                         </label>
//                         <span className="ml-2 text-sm" style={{ color: styles.primaryColor5 }}>
//                           {cvFile ? cvFile.name : 'No file chosen'}
//                         </span>
//                       </div>
//                       <p className="mt-1 text-xs" style={{ color: styles.primaryColor4 }}>
//                         PDF, DOC, DOCX up to 5MB
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6 flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setShowApplication(false)}
//                       className="px-4 py-2 border rounded-md"
//                       style={{ 
//                         borderColor: styles.primaryColor4,
//                         color: styles.primaryColor5,
//                         hoverBg: styles.primaryColor2
//                       }}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 rounded-md"
//                       style={{ 
//                         backgroundColor: styles.primaryColor1,
//                         color: 'white',
//                         hoverBg: styles.primaryColor5
//                       }}
//                     >
//                       Submit Application
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HUREHire;




















































































































import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectOpenJobs,
  addApplication
} from '../Slicers/ClinicJobSlice';
import { addApplication as addUserApplication } from '../Slicers/JobSlice';
import websites from '../../utils/Website/Website_Info.js';
import styles from '../../styles/colors.module.scss';

const HUREHire = () => {
  
  const dispatch = useDispatch();
  // Get open jobs from Redux store
  const jobs = useSelector(selectOpenJobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [locationFilter, setLocationFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // Authentication states (example: replace with actual auth logic)
  const [isEmployer, setIsEmployer] = useState(false); // Set based on auth
  const [isAdmin, setIsAdmin] = useState(false); // Set based on auth
  const [userApproved, setUserApproved] = useState(false); // Set based on auth
  
  // Form states
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '', // Changed from location/facility to match ClinicJobSlice
    description: '',
    type: 'Full-time',
    salary: ''
  });
  
  // Application states
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  // Replace with actual user ID from auth context or Redux
  const userId = 'user123'; // Placeholder: Replace with actual user ID

  // Get website data
  const website = websites[0];

  // Update filtered jobs when Redux jobs change
  useEffect(() => {
    let results = jobs;
    if (locationFilter) {
      results = results.filter(job => 
        (job.department || '').toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (roleFilter) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(roleFilter.toLowerCase())
      );
    }
    if (typeFilter) {
      results = results.filter(job => (job.type || '') === typeFilter);
    }
    setFilteredJobs(results);
  }, [locationFilter, roleFilter, typeFilter, jobs]);

  // Handle job posting
  const handlePostJob = (e) => {
    e.preventDefault();
    dispatch(postNewJob({
      title: newJob.title,
      department: newJob.department,
      description: newJob.description,
      salary: newJob.salary || 'Negotiable',
      type: newJob.type
    }));
    setNewJob({
      title: '',
      department: '',
      description: '',
      type: 'Full-time',
      salary: ''
    });
    setShowJobForm(false);
  };

  // // Handle job application
  // const handleApply = (e) => {
  //   e.preventDefault();
  //   if (!selectedJob || !userId) {
  //     alert('Error: Please log in and select a job to apply.');
  //     return;
  //   }
    
  //   // Dispatch to both ClinicJobSlice and JobSlice
  //   dispatch(addApplication({ jobId: selectedJob.id, userId }));
  //   dispatch(addUserApplication({ jobId: selectedJob.id, userId }));
    
  //   // In a real app, handle CV upload (e.g., to a server)
  //   alert(`Application submitted for ${selectedJob.title}`);
  //   setShowApplication(false);
  //   setSelectedJob(null);
  //   setCvFile(null);
  // };

  // Animation variants
    const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

    useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  // Handle job application
  const handleApply = (e) => {
    e.preventDefault();
    if (!selectedJob || !userId) return;
    
    // Dispatch to both slices
    dispatch(addApplication({ 
      jobId: selectedJob.id, 
      userId 
    }));
    dispatch(addUserApplication({
      id: selectedJob.id,
      title: selectedJob.title,
      company: selectedJob.department,
      status: 'active',
      appliedDate: new Date().toISOString()
    }));
    
    alert(`Application submitted for ${selectedJob.title}`);
    setShowApplication(false);
    setSelectedJob(null);
  };


  return (
    <div className="min-h-screen mt-24 bg-gray-50" style={{ backgroundColor: styles.primaryColor3 }}>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="md:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg shadow-md sticky top-8"
              style={{ 
                backgroundColor: styles.primaryColor3,
                fontFamily: styles.subheadingFont
              }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: styles.primaryColor5 }}>
                Filter Jobs
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="Department"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Nurse, Therapist, etc."
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                    Job Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: styles.primaryColor4,
                      focusRing: styles.primaryColor1
                    }}
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    setLocationFilter('');
                    setRoleFilter('');
                    setTypeFilter('');
                  }}
                  className="w-full py-2 rounded-md transition"
                  style={{ 
                    backgroundColor: styles.primaryColor4,
                    color: 'white',
                    hoverBg: styles.primaryColor5
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          </aside>

          {/* Job Listings */}
          <div className="md:w-3/4">
            {(isEmployer || isAdmin) && (
              <motion.button
                onClick={() => setShowJobForm(true)}
                className="mb-6 px-4 py-2 rounded-md"
                style={{ 
                  backgroundColor: styles.primaryColor1,
                  color: 'white',
                  hoverBg: styles.primaryColor5
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Post New Job
              </motion.button>
            )}
            
            <h2 className="text-2xl font-semibold mb-6" style={{ color: styles.primaryColor5, fontFamily: styles.headingFont }}>
              Healthcare Job Openings
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: styles.primaryColor1 }}></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-8 rounded-lg shadow text-center" style={{ backgroundColor: styles.primaryColor3 }}>
                <p style={{ color: styles.primaryColor5 }}>No jobs match your filters. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.01 }}
                      className="rounded-lg shadow-md overflow-hidden border-l-4"
                      style={{ 
                        backgroundColor: styles.primaryColor3,
                        borderLeftColor: styles.primaryColor1 
                      }}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                              {job.title}
                            </h3>
                            <p className="mt-1" style={{ color: styles.primaryColor4 }}>
                              {job.department}
                            </p>
                          </div>
                          <span 
                            className="text-xs px-3 py-1 rounded-full"
                            style={{ 
                              backgroundColor: styles.primaryColor2,
                              color: styles.primaryColor5
                            }}
                          >
                            {job.type || 'Full-time'}
                          </span>
                        </div>
                        
                        <p className="mt-4" style={{ color: styles.primaryColor5 }}>
                          {job.description}
                        </p>
                        
                        <div className="mt-6 flex justify-between items-center">
                          <div>
                            <p className="font-medium" style={{ color: styles.primaryColor5 }}>
                              {job.salary || 'Negotiable'}
                            </p>
                            <p className="text-sm" style={{ color: styles.primaryColor4 }}>
                              Posted {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedJob(job);
                              setShowApplication(true);
                            }}
                            className="px-4 py-2 rounded-md transition"
                            style={{ 
                              backgroundColor: styles.primaryColor1,
                              color: 'white',
                              hoverBg: styles.primaryColor5
                            }}
                          >
                            Apply Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showJobForm && (isEmployer || isAdmin) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="rounded-lg shadow-xl w-full max-w-md"
              style={{ backgroundColor: styles.primaryColor3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                    Post a Job Opening
                  </h3>
                  <button
                    onClick={() => setShowJobForm(false)}
                    style={{ color: styles.primaryColor5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handlePostJob}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Job Title*
                      </label>
                      <input
                        type="text"
                        required
                        value={newJob.title}
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Department*
                      </label>
                      <input
                        type="text"
                        required
                        value={newJob.department}
                        onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Job Type*
                      </label>
                      <select
                        required
                        value={newJob.type}
                        onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Salary (optional)
                      </label>
                      <input
                        type="text"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Job Description*
                      </label>
                      <textarea
                        required
                        value={newJob.description}
                        onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="px-4 py-2 border rounded-md"
                      style={{ 
                        borderColor: styles.primaryColor4,
                        color: styles.primaryColor5,
                        hoverBg: styles.primaryColor2
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md"
                      style={{ 
                        backgroundColor: styles.primaryColor1,
                        color: 'white',
                        hoverBg: styles.primaryColor5
                      }}
                    >
                      Post Job
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplication && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="rounded-lg shadow-xl w-full max-w-md"
              style={{ backgroundColor: styles.primaryColor3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: styles.primaryColor5 }}>
                    Apply for {selectedJob.title}
                  </h3>
                  <button
                    onClick={() => setShowApplication(false)}
                    style={{ color: styles.primaryColor5 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="mb-2" style={{ color: styles.primaryColor5 }}>
                    <span className="font-medium">Department:</span> {selectedJob.department}
                  </p>
                  <p className="mb-2" style={{ color: styles.primaryColor5 }}>
                    <span className="font-medium">Type:</span> {selectedJob.type || 'Full-time'}
                  </p>
                  <p style={{ color: styles.primaryColor5 }}>
                    <span className="font-medium">Salary:</span> {selectedJob.salary || 'Negotiable'}
                  </p>
                </div>
                
                <form onSubmit={handleApply}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Full Name*
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Email*
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Cover Letter (optional)
                      </label>
                      <textarea
                        rows="4"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: styles.primaryColor4,
                          focusRing: styles.primaryColor1
                        }}
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: styles.primaryColor5 }}>
                        Upload CV/Resume*
                      </label>
                      <div className="mt-1 flex items-center">
                        <label 
                          className="cursor-pointer py-2 px-3 border rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{ 
                            backgroundColor: styles.primaryColor3,
                            borderColor: styles.primaryColor4,
                            color: styles.primaryColor5,
                            focusRing: styles.primaryColor1
                          }}
                        >
                          Choose File
                          <input
                            type="file"
                            required
                            onChange={(e) => setCvFile(e.target.files[0])}
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                        <span className="ml-2 text-sm" style={{ color: styles.primaryColor5 }}>
                          {cvFile ? cvFile.name : 'No file chosen'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs" style={{ color: styles.primaryColor4 }}>
                        PDF, DOC, DOCX up to 5MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowApplication(false)}
                      className="px-4 py-2 border rounded-md"
                      style={{ 
                        borderColor: styles.primaryColor4,
                        color: styles.primaryColor5,
                        hoverBg: styles.primaryColor2
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md"
                      style={{ 
                        backgroundColor: styles.primaryColor1,
                        color: 'white',
                        hoverBg: styles.primaryColor5
                      }}
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HUREHire;