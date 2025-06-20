// import React, { useEffect, useRef, useCallback } from 'react';
// import Slider from './Slider';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import websites from '../website/website-info.js';
// import './Home.scss';
// import styles from '../../styles/colors.module.scss';
// import { Link } from 'react-router-dom';
// import Card from '../components/Card.jsx';
// import SkillsCard from '../components/Skills_Card.jsx';
// import StatsSection from '../components/StatsSection.jsx';

// const Home = () => {
//   // Refs for gallery scrolling
//   const galleryRef = useRef(null);
//   const scrollInterval = useRef(null);
//   const isScrolling = useRef(false);

//   // Images for the gallery
//   const images = [
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCelkmWfnQkGmyWNujbuC9mF04Ww5rGRN1vA&s',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAol6ee04wbzdltVJBsnm_1TGwpQYidVFwvw&s',
//     'https://www.developer-tech.com/wp-content/uploads/2021/02/mongodb-atlas-google-cloud-partnership-nosql-databases-integrations-2.jpg',
//     'https://cdn.hashnode.com/res/hashnode/image/upload/v1703155483443/e42a7be2-890a-4bd2-accf-306e53ccebbd.png',
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/640px-Python-logo-notext.svg.png',
//     'https://d2jdgazzki9vjm.cloudfront.net/images/javascript/javascript_logo.png',
//     'https://geo-python-site.readthedocs.io/en/latest/_images/pandas_logo.png',
//     'https://miro.medium.com/v2/resize:fit:750/1*Kq-3gVJYQyS7zBiK0PcZSA.jpeg',
//     'https://studyopedia.com/wp-content/uploads/2022/12/Matplotlib-featured-image-studyopedia.png',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw1-oC4gtSXSqISRSwdiEOaKYcSRmP5L0j2Q&s',
//   ];
//   const doubledImages = [...images, ...images];

//   // Memoized scroll functions
//   const startScrolling = useCallback(() => {
//     if (isScrolling.current || !galleryRef.current) return;
//     isScrolling.current = true;

//     scrollInterval.current = setInterval(() => {
//       if (!galleryRef.current) return;

//       const { scrollLeft, scrollWidth } = galleryRef.current;
//       const scrollAmount = 216; // image width + margin (200 + 16)

//       if (scrollLeft >= scrollWidth / 2) {
//         galleryRef.current.scrollLeft = scrollLeft - scrollWidth / 2;
//       } else {
//         galleryRef.current.scrollBy({
//           left: scrollAmount,
//           behavior: 'smooth'
//         });
//       }
//     }, 1400);
//   }, []);

//   const stopScrolling = useCallback(() => {
//     isScrolling.current = false;
//     if (scrollInterval.current) {
//       clearInterval(scrollInterval.current);
//     }
//   }, []);

//   // Scroll effect management
//   useEffect(() => {
//     startScrolling();
//     return () => stopScrolling();
//   }, [startScrolling, stopScrolling]);

//   // Project data
//   const projects = [
//     {
//       id: 1,
//       title: "E-Commerce Platform",
//       image: "https://cdn.wedevs.com/uploads/2021/04/Best-project-management-software-for-web-designers.png",
//       githubLink: "https://github.com",
//       demoLink: "https://youtube.com",
//     },
//     {
//       id: 2,
//       title: "Portfolio Website",
//       image: "https://cdn.wedevs.com/uploads/2021/04/Best-project-management-software-for-web-designers.png",
//       githubLink: "https://github.com",
//       demoLink: "https://youtube.com",
//     },
//     {
//       id: 3,
//       title: "Portfolio Website",
//       image: "https://source.unsplash.com/random/600x400/?portfolio",
//       githubLink: "https://github.com",
//       demoLink: "https://youtube.com",
//     },
//     {
//       id: 4,
//       title: "Portfolio Website",
//       image: "https://cdn.wedevs.com/uploads/2021/04/Best-project-management-software-for-web-designers.png",
//       githubLink: "https://github.com",
//       demoLink: "https://youtube.com",
//     },
//   ];

//   // Animation controls for each section
//   const [websiteRef, websiteInView] = useInView({ threshold: 0.1, triggerOnce: true });
//   const [latestWorkRef, latestWorkInView] = useInView({ threshold: 0.1, triggerOnce: true });
//   const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true });
//   const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true });
//   const [skillsCardsRef, skillsCardsInView] = useInView({ threshold: 0.1, triggerOnce: true });

//   const websiteControls = useAnimation();
//   const latestWorkControls = useAnimation();
//   const projectsControls = useAnimation();
//   const skillsControls = useAnimation();
//   const skillsCardsControls = useAnimation();

//   // Animation triggers
//   useEffect(() => {
//     if (websiteInView) websiteControls.start("visible");
//     if (latestWorkInView) latestWorkControls.start("visible");
//     if (projectsInView) projectsControls.start("visible");
//     if (skillsInView) skillsControls.start("visible");
//     if (skillsCardsInView) skillsCardsControls.start("visible");
//   }, [
//     websiteInView, 
//     latestWorkInView, 
//     projectsInView, 
//     skillsInView, 
//     skillsCardsInView,
//     websiteControls,
//     latestWorkControls,
//     projectsControls,
//     skillsControls,
//     skillsCardsControls
//   ]);

//   return (
//     <div className="overflow-x-hidden">
//       <Slider />

//       {/* Website Info Section */}
//       <motion.div 
//         ref={websiteRef}
//         initial={{ opacity: 0, y: 40 }}
//         animate={websiteControls}
//         variants={{
//           visible: { 
//             opacity: 1, 
//             y: 0,
//             transition: { duration: 0.6, ease: "easeOut" }
//           }
//         }}
//         className="flex flex-col md:flex-row mt-12 mb-12 items-center gap-6 p-1 md:p-8 bg-white rounded-xl shadow-lg max-w-[1000px] mx-auto border border-green-300 shadow-[#6ee96e]"
//       >
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="flex-shrink-0"
//         >
//           <img 
//             src={websites[0].logo} 
//             alt="Website Logo"
//             className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover shadow-md"
//             loading="lazy"
//           />
//         </motion.div>

//         <div className="flex-1 space-y-4">
//           <motion.h1
//             initial={{ x: -10, opacity: 0 }}
//             animate={websiteControls}
//             variants={{
//               visible: { 
//                 x: 0, 
//                 opacity: 1,
//                 transition: { delay: 0.2, duration: 0.4 }
//               }
//             }}
//             className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2BAE66FF] to-[black] bg-clip-text text-transparent"
//           >
//             Welcome To &nbsp;
//             {websites[0].name}
//           </motion.h1>

//           <motion.p
//             initial={{ x: -10, opacity: 0 }}
//             animate={websiteControls}
//             variants={{
//               visible: { 
//                 x: 0, 
//                 opacity: 1,
//                 transition: { delay: 0.4, duration: 0.4 }
//               }
//             }}
//             className="text-gray-600 text-lg md:text-xl"
//           >
//             {websites[0].name} is a leading IT solutions provider, established in 2023 in Taxila, Rawalpindi. We specialize in Website Development, Android App Development, Graphic Designing, and Machine Learning solutions, delivering cutting-edge technology to businesses worldwide.
//             <br/>
//             With a team of highly skilled developers, designers, and AI experts, we are committed to providing top-quality digital solutions tailored to our clients' needs.
//           </motion.p>
//         </div>
//       </motion.div>

//       {/* Links Buttons */}
//       <motion.div 
//         className="flex justify-center overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={websiteControls}
//         variants={{
//           visible: { 
//             opacity: 1,
//             transition: { delay: 0.6, duration: 0.4 }
//           }
//         }}
//       >
//         <Link className="button-92" to="/testimonials" role="button">Testimonials</Link>
//         <Link className="button-93" to="/explore" role="button">Explore Now</Link>
//       </motion.div>

//       {/* Latest Work Section */}
//       <motion.div 
//         ref={latestWorkRef}
//         className="relative overflow-hidden mt-24 p-4"
//         style={{ backgroundColor: styles.green }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <motion.div
//               className="inline-block overflow-hidden"
//               initial="hidden"
//               animate={latestWorkControls}
//               variants={{
//                 hidden: { x: '-100%', opacity: 0 },
//                 visible: { 
//                   x: 0, 
//                   opacity: 1,
//                   transition: {
//                     type: 'spring',
//                     stiffness: 60,
//                     damping: 12,
//                     duration: 0.4,
//                     delay: 0.2
//                   }
//                 }
//               }}
//             >
//               <span 
//                 style={{ color: styles.white }}
//                 className="inline-block uppercase italic text-4xl md:text-6xl lg:text-5xl font-extrabold pr-2 relative after:absolute after:right-0 after:top-1/4 after:bottom-1/4 after:w-0.5 after:bg-green-500 after:scale-y-0 after:origin-bottom after:transition-transform after:duration-400 after:ease-out after:delay-800 group-hover:after:scale-y-100"
//               >
//                 Check Our 
//               </span>
//             </motion.div>

//             <motion.div
//               className="inline-block overflow-hidden"
//               initial="hidden"
//               animate={latestWorkControls}
//               variants={{
//                 hidden: { x: '100%', opacity: 0 },
//                 visible: { 
//                   x: 0, 
//                   opacity: 1,
//                   transition: {
//                     type: 'spring',
//                     stiffness: 60,
//                     damping: 12,
//                     duration: 0.4,
//                     delay: 0.4
//                   }
//                 }
//               }}
//             >
//               <span
//                 style={{ color: styles.white }}
//                 className="inline-block uppercase italic text-4xl md:text-6xl lg:text-5xl font-extrabold text-gray-900 pl-2"
//               >
//                 Latest Work
//               </span>
//             </motion.div>
//           </div>

//           <motion.div
//             className="mx-auto mt-4 h-0.5 bg-green-500"
//             initial={{ scaleX: 0 }}
//             animate={latestWorkControls}
//             variants={{
//               visible: { 
//                 scaleX: 1,
//                 transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
//               }
//             }}
//           />
//         </div>
//       </motion.div>

//       {/* Projects Card Section */}
//       <motion.div
//         ref={projectsRef}
//         initial={{ opacity: 0 }}
//         animate={projectsControls}
//         variants={{
//           visible: { 
//             opacity: 1,
//             transition: { staggerChildren: 0.1, delayChildren: 0.2 }
//           }
//         }}
//         className="grid mt-24 p-6 md:p-24 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//       >
//         {projects.map((project) => (
//           <motion.div
//             key={project.id}
//             variants={{
//               hidden: { y: 50, opacity: 0 },
//               visible: { 
//                 y: 0, 
//                 opacity: 1,
//                 transition: { duration: 0.5 }
//               }
//             }}
//           >
//             <Card project={project} />
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Skills Heading Section */}
//       <motion.div 
//         ref={skillsRef}
//         className="relative overflow-hidden mt-24 p-4"
//         style={{ backgroundColor: styles.green }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <motion.div
//               className="inline-block overflow-hidden"
//               initial="hidden"
//               animate={skillsControls}
//               variants={{
//                 hidden: { x: '-100%', opacity: 0 },
//                 visible: { 
//                   x: 0, 
//                   opacity: 1,
//                   transition: {
//                     type: 'spring',
//                     stiffness: 60,
//                     damping: 12,
//                     duration: 0.4,
//                     delay: 0.2
//                   }
//                 }
//               }}
//             >
//               <span 
//                 style={{ color: styles.white }}
//                 className="inline-block uppercase italic text-4xl md:text-6xl lg:text-5xl font-extrabold pr-2 relative after:absolute after:right-0 after:top-1/4 after:bottom-1/4 after:w-0.5 after:bg-green-500 after:scale-y-0 after:origin-bottom after:transition-transform after:duration-400 after:ease-out after:delay-800 group-hover:after:scale-y-100"
//               >
//                 Check Our 
//               </span>
//             </motion.div>

//             <motion.div
//               className="inline-block overflow-hidden"
//               initial="hidden"
//               animate={skillsControls}
//               variants={{
//                 hidden: { x: '100%', opacity: 0 },
//                 visible: { 
//                   x: 0, 
//                   opacity: 1,
//                   transition: {
//                     type: 'spring',
//                     stiffness: 60,
//                     damping: 12,
//                     duration: 0.4,
//                     delay: 0.4
//                   }
//                 }
//               }}
//             >
//               <span
//                 style={{ color: styles.white }}
//                 className="inline-block uppercase italic text-4xl md:text-6xl lg:text-5xl font-extrabold text-gray-900 pl-2"
//               >
//                 Top Skill
//               </span>
//             </motion.div>
//           </div>

//           <motion.div
//             className="mx-auto mt-4 h-0.5 bg-green-500"
//             initial={{ scaleX: 0 }}
//             animate={skillsControls}
//             variants={{
//               visible: { 
//                 scaleX: 1,
//                 transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
//               }
//             }}
//           />
//         </div>
//       </motion.div>

//       {/* Skills Cards Section */}
//       <motion.div
//         ref={skillsCardsRef}
//         initial={{ opacity: 0 }}
//         animate={skillsCardsControls}
//         variants={{
//           visible: { 
//             opacity: 1,
//             transition: { staggerChildren: 0.1, delayChildren: 0.2 }
//           }
//         }}
//         className="grid mt-12 p-6 md:p-24 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//       >
//         <motion.div
//           variants={{
//             hidden: { y: 50, opacity: 0 },
//             visible: { 
//               y: 0, 
//               opacity: 1,
//               transition: { duration: 0.5 }
//             }
//           }}
//         >
//           <SkillsCard 
//             title="Web Development" 
//             description="Modern responsive websites with React, Next.js, and more"
//             overlayText="We build fast, SEO-friendly websites with the latest technologies"
//           />
//         </motion.div>
        
//         <motion.div
//           variants={{
//             hidden: { y: 50, opacity: 0 },
//             visible: { 
//               y: 0, 
//               opacity: 1,
//               transition: { duration: 0.5, delay: 0.1 }
//             }
//           }}
//         >
//           <SkillsCard 
//             title="App Development" 
//             description="Cross-platform mobile apps for iOS and Android"
//             overlayText="React Native and Flutter apps with native performance"
//           />
//         </motion.div>
        
//         <motion.div
//           variants={{
//             hidden: { y: 50, opacity: 0 },
//             visible: { 
//               y: 0, 
//               opacity: 1,
//               transition: { duration: 0.5, delay: 0.2 }
//             }
//           }}
//         >
//           <SkillsCard 
//             title="UI/UX Design" 
//             description="Beautiful interfaces with intuitive user experiences"
//             overlayText="From wireframes to pixel-perfect designs"
//           />
//         </motion.div>
      
//         <motion.div
//           variants={{
//             hidden: { y: 50, opacity: 0 },
//             visible: { 
//               y: 0, 
//               opacity: 1,
//               transition: { duration: 0.5, delay: 0.3 }
//             }
//           }}
//         >
//           <SkillsCard 
//             title="Graphic Designing" 
//             description="Stunning visual designs that communicate your brand's message"
//             overlayText="Professional logos, branding, and marketing materials with Adobe Creative Suite"
//           />
//         </motion.div>

//         <motion.div
//           variants={{
//             hidden: { y: 50, opacity: 0 },
//             visible: { 
//               y: 0, 
//               opacity: 1,
//               transition: { duration: 0.5, delay: 0.4 }
//             }
//           }}
//         >
//           <SkillsCard 
//             title="Machine Learning" 
//             description="Intelligent systems that learn and adapt to your business needs"
//             overlayText="Custom AI solutions using Python, TensorFlow, and PyTorch"
//           />
//         </motion.div>

//         <motion.div
//           variants={{
//             hidden: { y: 50, opacity: 0 },
//             visible: { 
//               y: 0, 
//               opacity: 1,
//               transition: { duration: 0.5, delay: 0.5 }
//             }
//           }}
//         >
//           <SkillsCard 
//             title="Data Science" 
//             description="Transform raw data into actionable business insights"
//             overlayText="Advanced analytics, predictive modeling, and data visualization solutions"
//           />
//         </motion.div>
//       </motion.div>

//       {/* Stat Section */}
//       <motion.div 
//         ref={latestWorkRef}
//         className="relative overflow-hidden mt-12 p-4"
//         style={{ backgroundColor: styles.green }}
//       >
//         <StatsSection/>
//       </motion.div>

//       {/* Technologies Heading Section */}
//       <motion.div 
//         ref={skillsRef}
//         className="relative overflow-hidden mt-24 p-4"
//         style={{ backgroundColor: styles.green }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <motion.div
//               className="inline-block overflow-hidden"
//               initial="hidden"
//               animate={skillsControls}
//               variants={{
//                 hidden: { x: '-100%', opacity: 0 },
//                 visible: { 
//                   x: 0, 
//                   opacity: 1,
//                   transition: {
//                     type: 'spring',
//                     stiffness: 60,
//                     damping: 12,
//                     duration: 0.4,
//                     delay: 0.2
//                   }
//                 }
//               }}
//             >
//               <span 
//                 style={{ color: styles.white }}
//                 className="inline-block uppercase italic text-4xl md:text-6xl lg:text-5xl font-extrabold pr-2 relative after:absolute after:right-0 after:top-1/4 after:bottom-1/4 after:w-0.5 after:bg-green-500 after:scale-y-0 after:origin-bottom after:transition-transform after:duration-400 after:ease-out after:delay-800 group-hover:after:scale-y-100"
//               >
//                 Technologies
//               </span>
//             </motion.div>

//             <motion.div
//               className="inline-block overflow-hidden"
//               initial="hidden"
//               animate={skillsControls}
//               variants={{
//                 hidden: { x: '100%', opacity: 0 },
//                 visible: { 
//                   x: 0, 
//                   opacity: 1,
//                   transition: {
//                     type: 'spring',
//                     stiffness: 60,
//                     damping: 12,
//                     duration: 0.4,
//                     delay: 0.4
//                   }
//                 }
//               }}
//             >
//               <span
//                 style={{ color: styles.white }}
//                 className="inline-block uppercase italic text-4xl md:text-6xl lg:text-5xl font-extrabold text-gray-900 pl-2"
//               >
//                 We Used
//               </span>
//             </motion.div>
//           </div>

//           <motion.div
//             className="mx-auto mt-4 h-0.5 bg-green-500"
//             initial={{ scaleX: 0 }}
//             animate={skillsControls}
//             variants={{
//               visible: { 
//                 scaleX: 1,
//                 transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
//               }
//             }}
//           />
//         </div>
//       </motion.div>

//       {/* Technologies Gallery */}
//       <div className="relative py-8 overflow-hidden">
//         <div 
//           ref={galleryRef}
//           className="flex overflow-x-auto scrollbar-hide"
//           onMouseEnter={stopScrolling}
//           onMouseLeave={startScrolling}
//         >
//           {doubledImages.map((img, index) => (
//             <motion.div
//               key={`${index}-${img}`}
//               className="flex-shrink-0 mx-4 first:ml-0 last:mr-0"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//             >
//               <div 
//                 className="relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center"
//                 style={{
//                   width: '200px',
//                   height: '150px'
//                 }}
//               >
//                 <img 
//                   src={img} 
//                   alt={`Technology ${index % images.length}`}
//                   className="w-3/4 h-3/4 object-contain"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-300" />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

