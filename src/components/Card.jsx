import { motion } from 'framer-motion';
import { FaGithub, FaEye, FaTimes } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';

const Card = ({ project }) => {
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFallbackImage, setShowFallbackImage] = useState(false);

  // Handle video loading and fallback
  useEffect(() => {
    if (project.videoUrl && videoRef.current) {
      const playPromise = videoRef.current.play().catch(error => {
        // If video fails to play, show fallback image
        setShowFallbackImage(true);
      });
    }
  }, [project.videoUrl]);

  // Handle modal video play/pause
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.play();
    }
  }, [isModalOpen]);

  const openModal = () => {
    if (project.videoUrl) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    if (modalRef.current) {
      modalRef.current.pause();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative rounded-xl overflow-hidden shadow-lg group h-full"
      >
        {/* Media Container */}
        <div className="relative aspect-video">
          {/* Show video if available and no fallback needed */}
          {project.videoUrl && !showFallbackImage ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={project.imageUrl} // Use imageUrl as poster
              onError={() => setShowFallbackImage(true)}
            >
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          ) : (
            // Show image if video is not available or failed to load
            project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 p-4">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-xl font-bold mb-4 text-center"
            >
              {project.title}
            </motion.h3>

            <div className="flex space-x-4">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white p-3 rounded-full shadow-lg"
                >
                  <FaGithub className="text-gray-800 text-xl" />
                </motion.a>
              )}

              {/* Only show preview button if there's a video */}
              {project.videoUrl && (
                <motion.button
                  onClick={openModal}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white p-3 rounded-full shadow-lg"
                >
                  <FaEye className="text-blue-600 text-xl" />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Project Description */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white text-sm line-clamp-2">{project.description}</p>
        </motion.div>
      </motion.div>

      {/* Video Modal - Only show if project has video */}
      {isModalOpen && project.videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 -mt-12 text-white hover:text-gray-300 z-10"
            >
              <FaTimes className="text-3xl" />
            </button>
            
            <video
              ref={modalRef}
              className="w-full h-full max-h-[80vh] object-contain"
              controls
              autoPlay
              playsInline
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;