import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaProjectDiagram, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import styles from '../../styles/colors.module.scss';

const AnimatedNumber = ({ value, duration = 2 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (value > 0) {
      const increment = value / (duration * 60); // 60fps
      let startValue = 0;
      
      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= value) {
          setCurrentValue(value);
          clearInterval(timer);
        } else {
          setCurrentValue(startValue);
        }
      }, 1000/60); // 60fps

      return () => clearInterval(timer);
    }
  }, [value, duration]);

  return Math.floor(currentValue);
};

const StatsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const stats = [
    { 
      icon: <FaUsers className="text-3xl" />,
      value: 100, 
      label: "Happy Clients",
      suffix: "+",
      duration: 1.5
    },
    { 
      icon: <FaProjectDiagram className="text-3xl" />,
      value: 250, 
      label: "Projects Completed",
      suffix: "+",
      duration: 1
    },
    { 
      icon: <FaClock className="text-3xl" />,
      value: 45, 
      label: "Weekly Hours",
      suffix: "hrs",
      duration: 1
    },
    { 
      icon: <FaCalendarAlt className="text-3xl" />,
      value: 2023, 
      label: "Working Since",
      suffix: "",
      duration: 1
    }
  ];

  return (
    <div ref={ref} className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
            >
              <div className="text-green-500">
                {stat.icon}
              </div>
              
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {inView ? (
                    <>
                      <AnimatedNumber value={stat.value} duration={stat.duration} />
                      {stat.suffix}
                    </>
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;