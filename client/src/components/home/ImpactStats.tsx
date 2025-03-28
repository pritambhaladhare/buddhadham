import { IMPACT_STATS } from '@/lib/constants';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ScaleUpSection } from '@/components/animation/AnimatedSection';

// Enhanced CountUp animation with additional visual feedback
const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, inView]);
  
  // Add subtle pulse effect when counter reaches its target
  return (
    <motion.span 
      ref={nodeRef}
      animate={count === end ? { 
        scale: [1, 1.1, 1],
        color: ["#D4AF37", "#FFD700", "#D4AF37"]
      } : {}}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      {count}
    </motion.span>
  );
};

const ImpactStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12
      }
    }
  };
  
  const dividerVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "3rem",
      transition: { 
        duration: 0.6, 
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {IMPACT_STATS.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center relative"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div 
                className="text-[#D4AF37] text-5xl font-heading font-bold"
                animate={isInView ? { scale: [0.8, 1.1, 1] } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <CountUp end={parseInt(stat.number)} duration={2.5} />
                {stat.number.includes('+') && '+'}
              </motion.div>
              
              <motion.div 
                className="h-1 bg-[#9D2933] mx-auto my-3"
                variants={dividerVariants}
              />
              
              <motion.p 
                className="text-[#3A2718] font-medium"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
              >
                {stat.label}
              </motion.p>
              
              {/* Decorative icon in background */}
              <motion.div 
                className="absolute -z-10 opacity-10 text-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-300"
                initial={{ rotate: 0 }}
                animate={isInView ? { 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{ 
                  rotate: { 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  },
                  scale: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <i className={`bx ${
                  index === 0 ? 'bxs-donate-heart' : 
                  index === 1 ? 'bxs-tree' :
                  index === 2 ? 'bxs-temple' :
                  'bxs-book-open'
                }`}></i>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Parallax background decorative elements */}
      <div className="relative h-20">
        <ParallaxWaves />
      </div>
    </section>
  );
};

const ParallaxWaves = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  return (
    <div ref={ref} className="absolute w-full h-full overflow-hidden">
      <motion.div 
        className="absolute w-full h-12 bottom-0 left-0"
        style={{ y: y1 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".1" fill="#FFA500" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute w-full h-16 bottom-0 left-0"
        style={{ y: y2 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            opacity=".1" fill="#FFD700" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute w-full h-14 bottom-0 left-0"
        style={{ y: y3 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" 
            opacity=".1" fill="#9D2933" />
        </svg>
      </motion.div>
    </div>
  );
};

export default ImpactStats;
