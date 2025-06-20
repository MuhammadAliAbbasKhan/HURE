import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectExplorer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Simplified scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Categories with single color
  const categories = [
    { id: 'web', name: 'Web Development', icon: '🌐' },
    { id: 'android', name: 'Android Development', icon: '📱' },
    { id: 'ml', name: 'Machine Learning', icon: '🧠' },
    { id: 'gd', name: 'Graphic Designing', icon: '🤖' },
    { id: 'data', name: 'Data Science', icon: '📊' }
  ];

  const lineColor = '#2BAE66FF'; // Single color for all lines
  const bgColor = '#FCF6F5FF'; // Background color

  // Generate main lines
  const generateMainLines = () => {
    const numLines = categories.length;
    const center = { x : 45, y: 55 };
    const radius = 42;
    const angleIncrement = (2 * Math.PI) / numLines;
    const points = [];

    for (let i = 0; i < numLines; i++) {
      const angle = i * angleIncrement;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      points.push({ x, y });
    }

    return points;
  };

  // Generate connecting lines
  const generateConnectingLines = (mainPoints) => {
    const lines = [];
    const numConnections = 5;

    for (let i = 0; i < mainPoints.length; i++) {
      for (let j = i + 1; j < mainPoints.length; j++) {
        const start = mainPoints[i];
        const end = mainPoints[j];
        
        for (let k = 0; k < numConnections; k++) {
          const t1 = Math.random() * 0.6 + 0.2;
          const t2 = Math.random() * 0.6 + 0.2;

          lines.push({ 
            x1: 50 + t1 * (start.x - 50),
            y1: 50 + t1 * (start.y - 50),
            x2: 50 + t2 * (end.x - 50),
            y2: 50 + t2 * (end.y - 50),
            opacity: Math.random() * 0.3 + 0.4,
            width: Math.random() * 0.2 + 0.1
          });
        }
      }
    }

    return lines;
  };

  const mainPoints = generateMainLines();
  const connectingLines = generateConnectingLines(mainPoints);

  // Create category headings
  const headings = categories.map((category, index) => {
    const point = mainPoints[index % mainPoints.length];
    return {
      ...category,
      x: `${point.x}%`,
      y: `${point.y}%`,
      link: `/categories/${category.id}`
    };
  });

  return (
    <section
      ref={ref}
      className="h-screen mt-24 mb-24 relative flex items-center justify-center pd-8 md:p-8 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Simplified SVG with all lines emerging at once */}
      <motion.svg
        className="absolute overflow-hidden inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ 
          opacity,
          y,
          transition: 'all 0.5s ease-out'
        }}
      >
        {/* Main Lines - all appear simultaneously */}
        {mainPoints.map((point, index) => (
          <motion.line
            key={`main-line-${index}`}
            x1={50}
            y1={50}
            x2={point.x}
            y2={point.y}
            stroke={lineColor}
            strokeWidth="0.8"
            strokeLinecap="butt"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { 
              pathLength: 1,
              opacity: 1
            } : {}}
            transition={{ 
              duration: 1.2,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Connecting Lines - all appear simultaneously */}
        {connectingLines.map((line, index) => (
          <motion.line
            key={`connecting-line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={lineColor}
            strokeWidth={line.width}
            strokeOpacity={line.opacity}
            strokeLinecap="butt"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { 
              pathLength: 1,
              opacity: line.opacity
            } : {}}
            transition={{ 
              duration: 1.2,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Simple center point without circle */}
        <motion.line
          x1={50}
          y1={50}
          x2={50}
          y2={50}
          stroke={lineColor}
          strokeWidth="124.5"
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1
          } : {}}
          transition={{ 
            duration: 0.5,
            delay: 0.3
          }}
        />
      </motion.svg>

      {/* Category Links */}
      <motion.div className="absolute inset-0">
        {headings.map((heading) => (
          <motion.div
            key={heading.id}
            className="absolute overflow-hidden"
            style={{
              left: heading.x,
              top: heading.y,
              transform: 'translate(-50%, -50%)',
              opacity,
              y
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1
            } : {}}
            transition={{ 
              duration: 0.7,
              delay: 0.5
            }}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
          >
            <Link
              to={heading.link}
              className="text-sm md:text-base overflow-hidden font-medium px-3 py-1 md:px-4 md:py-2 rounded-lg  duration-200 flex items-center gap-1"
              style={{
                color: bgColor,
                backgroundColor: lineColor,
                border: `1px solid ${lineColor}`
              }}
            >
              <span>{heading.icon}</span>
              {heading.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Simplified Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]),
          color: lineColor
        }}
      >
        <p className="mb-2 text-xs md:text-sm">Scroll to explore</p>
        <div className="w-5 h-8 md:w-6 md:h-10 mx-auto relative">
          <motion.div
            className="w-1 h-3 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"
            style={{ backgroundColor: lineColor }}
            animate={{ 
              y: [0, 6, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectExplorer;