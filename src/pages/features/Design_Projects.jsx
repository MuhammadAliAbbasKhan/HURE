// import React, { useState } from 'react';
// import ReactPlayer from 'react-player';
// import { FaTimes } from 'react-icons/fa';
// import scssVariables from '../../../styles/colors.module.scss';
// import '.././ProjectExplorer.scss';

// import websites from '../../../utils/Website/Website_Info.js';

// import gd_projects from '../../../utils/WebdevData/GDesign_Data.js';

// const Design_Projects = () => {
//   const [fullscreenMedia, setFullscreenMedia] = useState(null);
//   const [mediaType, setMediaType] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [popupMessage, setPopupMessage] = useState(null);

//   const handleMediaClick = (mediaUrl, type) => {
//     if (!mediaUrl) {
//       setPopupMessage("This project preview is not currently available. Please check back later!");
//       return;
//     }
//     setFullscreenMedia(mediaUrl);
//     setMediaType(type);
//   };

//   return (
//     <div 
//       className="project-explorer py-12 mt-48 px-4 sm:px-6 lg:px-8" 
//       style={{ backgroundColor: scssVariables.colorBgSecondary }}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 
//             className="text-3xl md:text-4xl italic font-bold mb-4" 
//             style={{ 
//               color: scssVariables.colorBlack,
//               fontFamily: scssVariables.headings
//             }}
//           >
//             Our Projects
//           </h2>
//           <div 
//             className="w-24 h-1 mx-auto" 
//             style={{ backgroundColor: scssVariables.green }}
//           />
//         </div>

//         {fullscreenMedia && (
//           <div 
//             className="fixed inset-0 z-50 flex items-center justify-center p-4" 
//             style={{ 
//               backgroundColor: scssVariables.colorBlack,
//               opacity: 0.95
//             }}
//           >
//             <button 
//               onClick={() => {
//                 setFullscreenMedia(null);
//                 setMediaType(null);
//               }}
//               className="absolute top-6 right-6 text-3xl transition-colors"
//               style={{ 
//                 color: scssVariables.colorWhite,
//                 ':hover': {
//                   color: scssVariables.green
//                 }
//               }}
//             >
//               &times;
//             </button>
//             <div className="w-full max-w-6xl">
//               {mediaType === 'video' ? (
//                 <div className="aspect-video">
//                   <ReactPlayer
//                     url={fullscreenMedia}
//                     controls
//                     width="100%"
//                     height="100%"
//                     playing
//                   />
//                 </div>
//               ) : (
//                 <div className="flex justify-center">
//                   <img 
//                     src={fullscreenMedia} 
//                     alt="Project preview" 
//                     className="max-h-[90vh] max-w-full object-contain"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {popupMessage && (
//           <div 
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
//             onClick={() => setPopupMessage(null)}
//           >
//             <div 
//               className="relative max-w-md w-full p-6 rounded-lg shadow-lg"
//               style={{
//                 backgroundColor: scssVariables.colorWhite,
//                 color: scssVariables.colorGray800,
//                 fontFamily: scssVariables.text
//               }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button 
//                 onClick={() => setPopupMessage(null)}
//                 className="absolute top-4 right-4 transition-colors"
//                 style={{ 
//                   color: scssVariables.colorGray600,
//                   ':hover': {
//                     color: scssVariables.colorGray800
//                   }
//                 }}
//               >
//                 <FaTimes size={20} />
//               </button>
//               <div className="text-center">
//                 <h3 
//                   className="text-xl font-bold mb-3"
//                   style={{
//                     color: scssVariables.colorGray800,
//                     fontFamily: scssVariables.subheadings
//                   }}
//                 >
//                   Notice
//                 </h3>
//                 <p className="mb-4">{popupMessage}</p>
//                 <button
//                   onClick={() => setPopupMessage(null)}
//                   className="px-6 py-2 rounded-md transition-colors"
//                   style={{
//                     backgroundColor: scssVariables.green,
//                     color: scssVariables.colorWhite,
//                     ':hover': {
//                       backgroundColor: scssVariables.colorSuccess
//                     }
//                   }}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//           {gd_projects.map((project) => {
//             const hasVideo = !!project.videoUrl;
//             const hasImage = !!project.imageUrl;
//             const previewMedia = hasVideo ? project.videoUrl : (hasImage ? project.imageUrl : null);
//             const mediaType = hasVideo ? 'video' : (hasImage ? 'image' : null);

//             return (
//               <div 
//                 key={project.id} 
//                 className="aspect-[4/3] perspective-1000"
//                 onMouseEnter={() => setHoveredCard(project.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${hoveredCard === project.id ? 'rotate-y-180' : ''}`}>
//                   <div 
//                     className="absolute inset-0 backface-hidden rounded-xl p-6 shadow-md flex flex-col justify-center"
//                     style={{
//                       backgroundColor: scssVariables.colorWhite,
//                       borderColor: scssVariables.colorBorder,
//                       boxShadow: scssVariables.shadowMd,
//                       borderWidth: '1px'
//                     }}
//                   >
//                     <div className="text-center">
//                       <div className="flex justify-center mb-4">
//                         <div 
//                           className="w-20 h-20 rounded-full overflow-hidden border-2"
//                           style={{
//                             borderColor: scssVariables.green
//                           }}
//                         >
//                           <img 
//                             src={websites[0].logo} 
//                             alt={project.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       </div>
                      
//                       <h3 
//                         className="text-xl font-bold mb-3"
//                         style={{
//                           color: scssVariables.colorGray800,
//                           fontFamily: scssVariables.subheadings
//                         }}
//                       >
//                         {project.title}
//                       </h3>
//                       <p 
//                         className="mb-4 px-2"
//                         style={{
//                           color: scssVariables.colorGray600,
//                           fontFamily: scssVariables.text
//                         }}
//                       >
//                         {project.description}
//                       </p>
//                       <div 
//                         className="w-16 h-1 mx-auto"
//                         style={{ backgroundColor: scssVariables.green }}
//                       ></div>
//                     </div>
//                   </div>

//                   <div 
//                     className="absolute inset-0 backface-hidden rounded-xl overflow-hidden transform rotate-y-180"
//                     style={{ backgroundColor: scssVariables.green }}
//                   >
//                     <div className="relative w-full h-full">
//                       {mediaType === 'video' ? (
//                         <ReactPlayer
//                           url={previewMedia}
//                           width="100%"
//                           height="100%"
//                           muted
//                           loop
//                           playing={hoveredCard === project.id}
//                           playsinline
//                           className="project-video"
//                         />
//                       ) : mediaType === 'image' ? (
//                         <img 
//                           src={previewMedia} 
//                           alt={project.title}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div 
//                           className="w-full h-full flex items-center justify-center"
//                           style={{ backgroundColor: scssVariables.green }}
//                         >
//                           <p 
//                             className="text-center p-4"
//                             style={{
//                               color: scssVariables.colorWhite,
//                               fontFamily: scssVariables.text
//                             }}
//                           >
//                             Preview not available
//                           </p>
//                         </div>
//                       )}
                      
//                       <div 
//                         className="absolute inset-0 flex items-center justify-center gap-4"
//                         style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
//                       >
//                         {mediaType && (
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleMediaClick(previewMedia, mediaType);
//                             }}
//                             className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
//                             title={mediaType === 'video' ? "View Demo" : "View Preview"}
//                             style={{
//                               backgroundColor: scssVariables.green,
//                               color: scssVariables.colorWhite,
//                               ':hover': {
//                                 backgroundColor: scssVariables.colorSuccess
//                               }
//                             }}
//                           >
//                             {mediaType === 'video' ? (
//                               <span className="ml-1 text-xl">▶</span>
//                             ) : (
//                               <span className="text-xl">🔍</span>
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Design_Projects;