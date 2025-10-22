import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import templeHero from '@assets/temple-hero.jpg';

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

  const tagline = "Serving monks and preserving dhamma";
  const words = tagline.split(' ');

  return (
    <section className="min-h-screen bg-[var(--parchment)] text-[var(--bodhi-bark)] overflow-hidden">
      <div className="relative">
        {/* Sanskrit-inspired decorative border at top */}
        <div className="absolute top-0 left-0 w-full h-6 overflow-hidden">
          <div className="w-full h-full bg-[var(--saffron)] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-6 border-t-4 border-[var(--deep-saffron)] opacity-30"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <motion.div 
            className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            {/* Decorative element (Om symbol removed) */}
            <motion.div
              className="mb-4 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              {/* Empty space where Om symbol was */}
            </motion.div>
            
            <motion.h1 
              className="font-heading text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[var(--bodhi-bark)]"
              variants={headerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              data-testid="text-hero-tagline"
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
              className="text-xl max-w-xl mx-auto lg:mx-0 mb-8 text-[var(--temple-stone)]"
              variants={fadeIn}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 0.9 }}
            >
              Together, we preserve ancient wisdom and support the monastic community at sacred Buddhist sites across India and Nepal.
            </motion.p>
          </motion.div>
          
          {/* Right content - Temple image */}
          <motion.div 
            className="lg:w-1/2 relative"
            variants={phoneVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="relative max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <motion.img 
                src={templeHero}
                alt="Mahabodhi Temple at Bodhgaya"
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
                data-testid="img-hero-temple"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-0 right-0 w-16 h-16 bg-[var(--enlightenment-gold)] rounded-full opacity-70 -mr-8 -mt-8 hidden lg:block"
                variants={bubbleVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                custom={0}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-20 h-20 bg-[var(--deep-saffron)] rounded-full opacity-70 -ml-10 -mb-10 hidden lg:block"
                variants={bubbleVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                custom={1}
              />
              <motion.div 
                className="absolute top-1/4 left-0 w-8 h-8 bg-[var(--monk-robe)] rounded-full opacity-70 -ml-4 hidden lg:block"
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
