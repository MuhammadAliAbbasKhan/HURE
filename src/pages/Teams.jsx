
//   const handleHoverStart = (id) => {
//     setHoveredMember(id);
//     controls.start("hover");
//   };

//   const handleHoverEnd = () => {
//     setHoveredMember(null);
//     controls.start("animate");
//   };
// import React, { useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { FaLinkedinIn, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
// import websites from '../website/website-info.js';
// import styles from '../../styles/colors.module.scss';
// import teamData from '../../teamsdata.js';

// const Teams = () => {
//   const [hoveredMember, setHoveredMember] = useState(null);
//   const controls = useAnimation();

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const memberVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const lineVariants = {
//     initial: {
//       width: 0,
//       x: -50,
//       opacity: 0
//     },
//     animate: (i) => ({
//       width: "100%",
//       x: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.8,
//         ease: "easeInOut"
//       }
//     }),
//     hover: {
//       opacity: 1,
//       pathLength: 1,
//       transition: { duration: 0.5 }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FCF6F5FF] py-16 px-4 sm:px-6 lg:px-8">
//       {/* Page metadata */}
//       <title>Our Team - {websites[0].name}</title>
//       <meta name="description" content={`Meet the talented team behind ${websites[0].name}`} />

//       {/* Main container */}
//       <div className="max-w-7xl mx-auto">
//         {/* Header section */}
//         <div className="text-center mb-16">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className={`text-4xl font-extrabold text-[#2BAE66FF] italic sm:text-5xl sm:tracking-tight lg:text-6xl font-${styles.headings}`}
//           >
//             Our Team
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className={`mt-5 max-w-2xl mx-auto text-xl text-${styles.green} font-${styles.subheadings}`}
//           >
//             The brilliant minds who make it all happen
//           </motion.p>
//         </div>

//         {/* Team grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
//         >
//           {teamData.map((member, index) => (
//             <motion.div
//               key={member.id}
//               variants={memberVariants}
//               className="relative"
//               onHoverStart={() => handleHoverStart(member.id)}
//               onHoverEnd={handleHoverEnd}
//             >
//               {/* Team member card */}
//               <div className={`bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 ${
//                 hoveredMember === member.id ? 'transform scale-105 shadow-xl' : ''
//               }`}>
//                 {/* Animated border lines */}
//                 <div className="absolute inset-0 overflow-hidden rounded-xl">
//                   {/* Top line */}
//                   <motion.div
//                     custom={0}
//                     initial="initial"
//                     animate={hoveredMember === member.id ? "hover" : "animate"}
//                     variants={lineVariants}
//                     className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#2BAE66FF] to-transparent"
//                   />
//                   {/* Right line */}
//                   <motion.div
//                     custom={1}
//                     initial="initial"
//                     animate={hoveredMember === member.id ? "hover" : "animate"}
//                     variants={lineVariants}
//                     className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#2BAE66FF] to-transparent"
//                   />
//                   {/* Bottom line */}
//                   <motion.div
//                     custom={2}
//                     initial="initial"
//                     animate={hoveredMember === member.id ? "hover" : "animate"}
//                     variants={lineVariants}
//                     className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#2BAE66FF] to-transparent"
//                   />
//                   {/* Left line */}
//                   <motion.div
//                     custom={3}
//                     initial="initial"
//                     animate={hoveredMember === member.id ? "hover" : "animate"}
//                     variants={lineVariants}
//                     className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#2BAE66FF] to-transparent"
//                   />
//                 </div>

//                 {/* Member image */}
//                 <div className="relative pt-8 px-8">
//                   <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
//                     <motion.img
//                       src={member.image}
//                       alt={member.name}
//                       className="w-full h-full object-cover"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </div>
//                 </div>

//                 {/* Member info */}
//                 <div className="p-6 text-center flex-grow">
//                   <motion.h3 
//                     className={`text-2xl font-bold text-gray-900 mb-2 font-${styles.headings}`}
//                     whileHover={{ color: '#2BAE66FF' }}
//                   >
//                     {member.name}
//                   </motion.h3>
//                   <p className={`text-lg text-${styles.green} font-medium mb-4`}>
//                     {member.position}
//                   </p>
//                   <p className={`text-gray-600 mb-6 font-${styles.text}`}>
//                     {member.bio}
//                   </p>
//                 </div>

//                 {/* Social links */}
//                 <div className="px-6 pb-6 flex justify-center space-x-4">
//                   {member.social.linkedin && (
//                     <motion.a
//                       href={member.social.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white"
//                       whileHover={{ y: -5, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <FaLinkedinIn />
//                     </motion.a>
//                   )}
//                   {member.social.twitter && (
//                     <motion.a
//                       href={member.social.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white"
//                       whileHover={{ y: -5, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <FaTwitter />
//                     </motion.a>
//                   )}
//                   {member.social.github && (
//                     <motion.a
//                       href={member.social.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
//                       whileHover={{ y: -5, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <FaGithub />
//                     </motion.a>
//                   )}
//                   {member.social.email && (
//                     <motion.a
//                       href={`mailto:${member.social.email}`}
//                       className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white"
//                       whileHover={{ y: -5, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <FaEnvelope />
//                     </motion.a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Team description */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className={`mt-20 text-center max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md font-${styles.text}`}
//         >
//           <h2 className={`text-3xl font-bold text-gray-900 mb-6 font-${styles.headings}`}>
//             Collaborative Excellence
//           </h2>
//           <p className={`text-lg text-gray-700 mb-6`}>
//             Our team combines diverse expertise with shared passion to deliver exceptional results. 
//             We believe in the power of collaboration and innovation to solve complex challenges.
//           </p>
//           <motion.div
//             className="w-24 h-1 bg-[#2BAE66FF] mx-auto"
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ delay: 1, duration: 0.8 }}
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Teams;

























// // import React, { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { FaLinkedinIn, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

// // // Sample team data (replace with your actual data)
// // const teamData = [
// //   {
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },
// //   {
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },{
// //     id: 1,
// //     name: 'John Doe',
// //     position: 'Frontend Developer',
// //     bio: 'Specializes in React and UI design with 5 years of experience building responsive web applications.',
// //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       github: 'https://github.com',
// //       email: 'john@example.com'
// //     }
// //   },
// //   {
// //     id: 2,
// //     name: 'Jane Smith',
// //     position: 'Backend Engineer',
// //     bio: 'Expert in Node.js and database architecture with a focus on scalable solutions.',
// //     image: 'https://randomuser.me/api/portraits/women/44.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       github: 'https://github.com',
// //       email: 'jane@example.com'
// //     }
// //   },
// //   {
// //     id: 3,
// //     name: 'Alex Johnson',
// //     position: 'UX Designer',
// //     bio: 'Passionate about creating intuitive user experiences with a background in psychology.',
// //     image: 'https://randomuser.me/api/portraits/men/75.jpg',
// //     social: {
// //       linkedin: 'https://linkedin.com',
// //       twitter: 'https://twitter.com',
// //       email: 'alex@example.com'
// //     }
// //   }
// // ];

// // const RoughBorder = ({ isActive }) => {
// //   return (
// //     <motion.svg 
// //       width="100%" 
// //       height="100%" 
// //       viewBox="0 0 100 100"
// //       preserveAspectRatio="none"
// //       className="absolute inset-0 pointer-events-none overflow-visible"
// //     >
// //       {/* Top border */}
// //       <motion.path
// //         d="M 0,5 L 100,5"
// //         stroke="#2BAE66FF"
// //         strokeWidth="2"
// //         fill="none"
// //         initial={{ pathLength: 0, opacity: 0 }}
// //         animate={{ 
// //           pathLength: 1,
// //           opacity: 1,
// //           strokeDasharray: isActive ? "0,0" : "8,8"
// //         }}
// //         transition={{ 
// //           duration: isActive ? 0.4 : 1.5,
// //           ease: isActive ? "easeOut" : "linear",
// //           repeat: isActive ? 0 : Infinity
// //         }}
// //       />
// //       {/* Right border */}
// //       <motion.path
// //         d="M 95,5 L 95,95"
// //         stroke="#2BAE66FF"
// //         strokeWidth="2"
// //         fill="none"
// //         initial={{ pathLength: 0, opacity: 0 }}
// //         animate={{ 
// //           pathLength: 1,
// //           opacity: 1,
// //           strokeDasharray: isActive ? "0,0" : "8,8"
// //         }}
// //         transition={{ 
// //           duration: isActive ? 0.4 : 1.5,
// //           ease: isActive ? "easeOut" : "linear",
// //           repeat: isActive ? 0 : Infinity,
// //           delay: isActive ? 0 : 0.1
// //         }}
// //       />
// //       {/* Bottom border */}
// //       <motion.path
// //         d="M 95,95 L 5,95"
// //         stroke="#2BAE66FF"
// //         strokeWidth="2"
// //         fill="none"
// //         initial={{ pathLength: 0, opacity: 0 }}
// //         animate={{ 
// //           pathLength: 1,
// //           opacity: 1,
// //           strokeDasharray: isActive ? "0,0" : "8,8"
// //         }}
// //         transition={{ 
// //           duration: isActive ? 0.4 : 1.5,
// //           ease: isActive ? "easeOut" : "linear",
// //           repeat: isActive ? 0 : Infinity,
// //           delay: isActive ? 0 : 0.2
// //         }}
// //       />
// //       {/* Left border */}
// //       <motion.path
// //         d="M 5,95 L 5,5"
// //         stroke="#2BAE66FF"
// //         strokeWidth="2"
// //         fill="none"
// //         initial={{ pathLength: 0, opacity: 0 }}
// //         animate={{ 
// //           pathLength: 1,
// //           opacity: 1,
// //           strokeDasharray: isActive ? "0,0" : "8,8"
// //         }}
// //         transition={{ 
// //           duration: isActive ? 0.4 : 1.5,
// //           ease: isActive ? "easeOut" : "linear",
// //           repeat: isActive ? 0 : Infinity,
// //           delay: isActive ? 0 : 0.3
// //         }}
// //       />
// //     </motion.svg>
// //   );
// // };

// // const TeamCard = ({ member, isHovered, onHover }) => {
// //   const socialLinks = [
// //     { icon: FaLinkedinIn, url: member.social.linkedin, color: 'bg-blue-600' },
// //     { icon: FaTwitter, url: member.social.twitter, color: 'bg-blue-400' },
// //     { icon: FaGithub, url: member.social.github, color: 'bg-gray-800' },
// //     { icon: FaEnvelope, url: `mailto:${member.social.email}`, color: 'bg-red-500' }
// //   ].filter(link => link.url);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="relative h-full"
// //       onHoverStart={() => onHover(member.id)}
// //       onHoverEnd={() => onHover(null)}
// //     >
// //       <div className={`bg-white rounded-lg shadow-md h-full flex flex-col overflow-hidden ${
// //         isHovered ? 'ring-2 ring-[#2BAE66FF]' : ''
// //       }`}>
// //         <RoughBorder isActive={isHovered} />
        
// //         <div className="p-6 flex flex-col items-center">
// //           <motion.div 
// //             className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <img 
// //               src={member.image} 
// //               alt={member.name}
// //               className="w-full h-full object-cover"
// //               loading="lazy"
// //             />
// //           </motion.div>
          
// //           <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
// //           <p className="text-[#2BAE66FF] font-medium mb-3">{member.position}</p>
// //           <p className="text-gray-600 text-center mb-6 line-clamp-3">{member.bio}</p>
// //         </div>

// //         <div className="mt-auto pb-6 px-6 flex justify-center gap-3">
// //           {socialLinks.map((link, index) => (
// //             <motion.a
// //               key={index}
// //               href={link.url}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className={`w-9 h-9 rounded-full ${link.color} flex items-center justify-center text-white`}
// //               whileHover={{ y: -3, scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               <link.icon className="text-sm" />
// //             </motion.a>
// //           ))}
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // const Teams = () => {
// //   const [hoveredId, setHoveredId] = useState(null);
  
// //   return (
// //     <div className="min-h-screen bg-[#FCF6F5] py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-7xl mx-auto">
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="text-center mb-12"
// //         >
// //           <h1 className="text-4xl sm:text-5xl font-bold text-[#2BAE66FF] mb-3">Our Team</h1>
// //           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //             The brilliant minds who make it all happen
// //           </p>
// //         </motion.div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {teamData.map(member => (
// //             <TeamCard
// //               key={member.id}
// //               member={member}
// //               isHovered={hoveredId === member.id}
// //               onHover={setHoveredId}
// //             />
// //           ))}
// //         </div>

// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           viewport={{ once: true, margin: "-100px" }}
// //           className="mt-16 bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto text-center"
// //         >
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">Collaborative Excellence</h2>
// //           <p className="text-gray-600 mb-6">
// //             Our team combines diverse expertise with shared passion to deliver exceptional results.
// //           </p>
// //           <motion.div
// //             className="w-24 h-1 bg-[#2BAE66FF] mx-auto"
// //             initial={{ scaleX: 0 }}
// //             whileInView={{ scaleX: 1 }}
// //             transition={{ duration: 0.8 }}
// //           />
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Teams;
























import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaGithub, FaEnvelope, FaQuoteLeft } from 'react-icons/fa';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import websites from '../../utils/Website/Website_Info.js';
import teamData from '../../utils/Website/teamsdata.js';
import styles from '../../styles/colors.module.scss';

const Teams = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const controls = useAnimation();
  const testimonialControls = useAnimation();

  // Color constants with fallbacks
  const primaryColor = '#2BAE66';
  const primaryLight = 'rgba(43, 174, 102, 0.1)';
  const textDark = '#1a1a1a';
  const textLight = '#4b5563';
  const backgroundLight = '#FCF6F5';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const memberVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  const lineVariants = {
    initial: {
      width: 0,
      x: -50,
      opacity: 0
    },
    animate: (i) => ({
      width: "100%",
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeInOut"
      }
    }),
    hover: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 0.5 }
    }
  };

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  const handleHoverStart = (id) => {
    setHoveredMember(id);
    controls.start("hover");
  };

  const handleHoverEnd = () => {
    setHoveredMember(null);
    controls.start("animate");
  };

  const nextTestimonial = () => {
    testimonialControls.start("exit", { direction: 1 }).then(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      testimonialControls.start("center");
    });
  };

  const prevTestimonial = () => {
    testimonialControls.start("exit", { direction: -1 }).then(() => {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      testimonialControls.start("center");
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      quote: "Working with this team has been transformative for our business. Their innovative approach solved challenges we didn't even know we had.",
      author: "Sarah Johnson, CEO of TechCorp"
    },
    {
      id: 2,
      quote: "The level of professionalism and creativity this team brings is unmatched. They delivered beyond our expectations every time.",
      author: "Michael Chen, Director of Product at InnovateCo"
    },
    {
      id: 3,
      quote: "What sets this team apart is their ability to truly understand our needs and translate them into exceptional digital experiences.",
      author: "Emma Davis, Head of Marketing at BrandVision"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b mt-12 from-[${backgroundLight}] to-[#f0e8e7] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden`}>
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-[#2BAE66] opacity-10 blur-xl"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        custom={1}
      />
      <motion.div 
        className="absolute bottom-1/4 right-20 w-24 h-24 rounded-full bg-[#2BAE66] opacity-10 blur-xl"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        custom={2}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-[#2BAE66] opacity-10 blur-xl"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        custom={3}
      />

      {/* SEO metadata */}
      <title>Our Team - {websites[0]?.name || 'Our Company'}</title>
      <meta name="description" content={`Meet the talented team behind ${websites[0]?.name || 'our company'}`} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block relative"
          >
            <h1 
              style={{ fontFamily: styles?.subheadings || 'sans-serif' }}
              className="text-4xl font-extrabold text-[#2BAE66] italic sm:text-5xl sm:tracking-tight lg:text-6xl relative z-10"
            >
              Our Team
            </h1>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-3 bg-[#2BAE66] bg-opacity-30 z-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontFamily: styles?.text || 'sans-serif' }}
            className="mt-5 max-w-2xl mx-auto text-xl text-[#2BAE66] font-medium"
          >
            The brilliant minds who make it all happen
          </motion.p>
        </div>

        {/* Team members grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {teamData?.map((member) => (
            <motion.div
              key={member?.id || Math.random()}
              variants={memberVariants}
              whileHover="hover"
              className="relative"
              onHoverStart={() => handleHoverStart(member?.id)}
              onHoverEnd={handleHoverEnd}
            >
              <div className={`bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col transition-all duration-300 ${
                hoveredMember === member?.id ? 'transform scale-[1.02] shadow-2xl' : ''
              }`}>
                {/* Decorative border lines */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    custom={0}
                    initial="initial"
                    animate={hoveredMember === member?.id ? "hover" : "animate"}
                    variants={lineVariants}
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#2BAE66] to-transparent"
                  />
                  <motion.div
                    custom={1}
                    initial="initial"
                    animate={hoveredMember === member?.id ? "hover" : "animate"}
                    variants={lineVariants}
                    className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#2BAE66] to-transparent"
                  />
                  <motion.div
                    custom={2}
                    initial="initial"
                    animate={hoveredMember === member?.id ? "hover" : "animate"}
                    variants={lineVariants}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#2BAE66] to-transparent"
                  />
                  <motion.div
                    custom={3}
                    initial="initial"
                    animate={hoveredMember === member?.id ? "hover" : "animate"}
                    variants={lineVariants}
                    className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#2BAE66] to-transparent"
                  />
                </div>

                {/* Member photo */}
                <div className="relative pt-8 px-8">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <motion.div
                      className="w-full h-full bg-gradient-to-br from-[#2BAE66] to-[#1e8a4f] absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
                    />
                    <motion.img
                      src={member?.image || '/images/placeholder.jpg'}
                      alt={member?.name || 'Team member'}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Member info */}
                <div className="p-6 text-center flex-grow">
                  <motion.h3 
                    style={{ fontFamily: styles?.headings || 'sans-serif' }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                    whileHover={{ color: '#2BAE66' }}
                  >
                    {member?.name || 'Team Member'}
                  </motion.h3>
                  <p 
                    style={{ fontFamily: styles?.subheadings || 'sans-serif' }}
                    className="text-lg text-[#2BAE66] font-medium mb-4"
                  >
                    {member?.position || 'Position'}
                  </p>
                  <p 
                    style={{ fontFamily: styles?.text || 'sans-serif' }}
                    className="text-gray-600 mb-6"
                  >
                    {member?.bio || 'Bio coming soon...'}
                  </p>
                </div>

                {/* Social links - only shown if social links exist */}
                {(member?.social?.linkedin || member?.social?.email) && (
                  <div className="px-6 pb-6 flex justify-center space-x-4">
                    {member?.social?.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white relative overflow-hidden group"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaLinkedinIn className="relative z-10" />
                        <motion.span 
                          className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        />
                      </motion.a>
                    )}
                    
                    {member?.social?.email && (
                      <motion.a
                        href={`mailto:${member.social.email}`}
                        className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white relative overflow-hidden group"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEnvelope className="relative z-10" />
                        <motion.span 
                          className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        />
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company description section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-[#2BAE66] opacity-10 blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-[#2BAE66] opacity-10 blur-xl" />
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6 relative z-10">
            Collaborative Excellence
          </h2>
          <p className="text-lg text-gray-700 mb-6 relative z-10">
            Our team combines diverse expertise with shared passion to deliver exceptional results. 
            We believe in the power of collaboration and innovation to solve complex challenges.
          </p>
          <motion.div
            className="w-24 h-1 bg-[#2BAE66] mx-auto relative z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.div>

        {/* Testimonials section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900">
            What Our Clients Say
          </h3>
          
          <div className="relative max-w-3xl mx-auto h-64">
            <AnimatePresence custom={1} initial={false}>
              <motion.div
                key={activeTestimonial}
                custom={1}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center"
              >
                <FaQuoteLeft className="text-3xl text-[#2BAE66] mb-6 opacity-30" />
                <p className="text-lg text-gray-700 mb-6 italic">
                  {testimonials[activeTestimonial]?.quote || 'Loading testimonial...'}
                </p>
                <p className="text-gray-900 font-medium">
                  {testimonials[activeTestimonial]?.author || 'Client'}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#2BAE66] hover:text-white transition-colors"
            >
              <FiArrowLeft />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#2BAE66] hover:text-white transition-colors"
            >
              <FiArrowRight />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const direction = index > activeTestimonial ? 1 : -1;
                  testimonialControls.start("exit", { direction }).then(() => {
                    setActiveTestimonial(index);
                    testimonialControls.start("center");
                  });
                }}
                className={`w-3 h-3 rounded-full transition-colors ${index === activeTestimonial ? 'bg-[#2BAE66]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Teams;