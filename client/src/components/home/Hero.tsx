import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Lotus from '@/components/shared/Lotus';
import AnimatedButton from '@/components/animation/AnimatedButton';
import { 
  FadeInSection, 
  StaggerContainer, 
  StaggerItem, 
  FloatingElement 
} from '@/components/animation/AnimatedSection';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.2
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const phoneVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      duration: 0.8,
      delay: 0.6 
    }
  }
};

const bubbleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (custom: number) => ({
    scale: 1,
    opacity: 0.7,
    transition: { 
      delay: 1 + (custom * 0.2),
      duration: 0.5
    }
  })
};

const meditationCardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: 1.2 + (custom * 0.15),
      duration: 0.4
    }
  })
};

const buttonHoverVariants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 10
    }
  }
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set animation to visible after component mounts
    setIsVisible(true);
  }, []);

  const text = "Serving monks and preserving dhamma";
  const words = text.split(' ');

  return (
    <section className="min-h-screen bg-orange-50 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <motion.div 
            className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <FloatingElement className="mb-6 inline-block">
              <Lotus size={60} color="#f97316" />
            </FloatingElement>
            
            <motion.h1 
              className="font-heading text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800"
              variants={headerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {words.map((word, idx) => (
                <motion.span 
                  key={idx} 
                  className="inline-block mr-4"
                  variants={letterVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="text-xl max-w-xl mx-auto lg:mx-0 mb-8 text-gray-600"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 0.9 }}
            >
              Feel like your best self with meditations, stress-relieving exercises, sleep resources, and beyond.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 1.1 }}
            >
              <Link href="/get-involved">
                <AnimatedButton 
                  variant="primary"
                  size="lg"
                  className="shadow-orange-200/50"
                >
                  <span className="flex items-center">
                    <i className='bx bxs-heart mr-2'></i> Get Involved
                  </span>
                </AnimatedButton>
              </Link>
              <AnimatedButton 
                variant="secondary"
                size="lg"
                className="shadow-gray-300/50"
                onClick={() => {}}
              >
                <span className="flex items-center">
                  <i className='bx bx-meditation mr-2'></i> Try Free Meditation
                </span>
              </AnimatedButton>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 1.3 }}
            >
              <motion.a 
                href="#" 
                className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg"
                variants={buttonHoverVariants}
                initial="idle"
                whileHover="hover"
              >
                <i className='bx bxl-apple text-2xl mr-2'></i>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </motion.a>
              <motion.a 
                href="#" 
                className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg"
                variants={buttonHoverVariants}
                initial="idle"
                whileHover="hover"
              >
                <i className='bx bxl-play-store text-2xl mr-2'></i>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right content - Phone mockups */}
          <motion.div 
            className="lg:w-1/2 relative"
            variants={phoneVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="relative">
              {/* Main phone */}
              <motion.div 
                className="w-72 mx-auto lg:mx-0 lg:ml-auto relative z-10"
                initial={{ y: 20 }}
                animate={{ 
                  y: [20, 0, 20],
                  transition: {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 4,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-gray-100">
                  <div className="bg-orange-500 h-16 flex items-center justify-center">
                    <span className="text-white font-bold">Buddha Dhaam</span>
                  </div>
                  <div className="p-4">
                    <motion.div 
                      className="bg-orange-100 rounded-lg p-3 mb-3"
                      variants={meditationCardVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      custom={0}
                    >
                      <h4 className="font-bold text-sm mb-1">Morning Meditation</h4>
                      <p className="text-xs text-gray-700">15 minutes of guided practice</p>
                    </motion.div>
                    <motion.div 
                      className="bg-orange-50 rounded-lg p-3 mb-3"
                      variants={meditationCardVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      custom={1}
                    >
                      <h4 className="font-bold text-sm mb-1">Mindful Breathing</h4>
                      <p className="text-xs text-gray-700">10 minutes to center yourself</p>
                    </motion.div>
                    <motion.div 
                      className="bg-orange-50 rounded-lg p-3"
                      variants={meditationCardVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      custom={2}
                    >
                      <h4 className="font-bold text-sm mb-1">Evening Relaxation</h4>
                      <p className="text-xs text-gray-700">Prepare for restful sleep</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 rounded-full opacity-70 -mr-8 -mt-8 hidden lg:block"
                variants={bubbleVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                custom={0}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-20 h-20 bg-orange-300 rounded-full opacity-70 -ml-10 -mb-10 hidden lg:block"
                variants={bubbleVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                custom={1}
              />
              <motion.div 
                className="absolute top-1/4 left-0 w-8 h-8 bg-pink-300 rounded-full opacity-70 -ml-4 hidden lg:block"
                variants={bubbleVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                custom={2}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
