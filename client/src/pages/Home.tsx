import Hero from '@/components/home/Hero';
import ImpactStats from '@/components/home/ImpactStats';
import OurWorkSection from '@/components/home/OurWorkSection';
import ImpactStory from '@/components/home/ImpactStory';
import SupportSection from '@/components/home/SupportSection';
import EventsNewsSection from '@/components/home/EventsNewsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import MeditationWidget from '@/components/home/MeditationWidget';
import ParallaxEffect from '@/components/animation/ParallaxEffect';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Define floating element for atmosphere
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  rotationRange?: number;
}

const FloatingElement = ({ 
  children, 
  delay = 0, 
  duration = 8, 
  x = 0, 
  y = 0, 
  rotationRange = 5 
}: FloatingElementProps) => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 1, 0.8, 1, 0],
      x: [x, x + 30, x + 15, x + 40, x], 
      y: [y, y - 40, y - 25, y - 60, y], 
      rotate: [0, rotationRange, 0, -rotationRange, 0] 
    }}
    transition={{ 
      repeat: Infinity, 
      duration, 
      delay,
      ease: "easeInOut" 
    }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  
  return (
    <>
      
      {/* Ambient floating decorative elements for atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {/* Light particles */}
        <FloatingElement delay={2} y={100} x={100} duration={10}>
          <div className="w-8 h-8 rounded-full bg-orange-100/20 blur-sm"></div>
        </FloatingElement>
        <FloatingElement delay={5} y={300} x={600} duration={15}>
          <div className="w-10 h-10 rounded-full bg-orange-200/20 blur-sm"></div>
        </FloatingElement>
        <FloatingElement delay={8} y={500} x={200} duration={12}>
          <div className="w-6 h-6 rounded-full bg-orange-100/20 blur-sm"></div>
        </FloatingElement>
        <FloatingElement delay={15} y={700} x={400} duration={20}>
          <div className="w-12 h-12 rounded-full bg-orange-100/10 blur-md"></div>
        </FloatingElement>
        <FloatingElement delay={25} y={200} x={800} duration={25}>
          <div className="w-14 h-14 rounded-full bg-orange-50/10 blur-md"></div>
        </FloatingElement>
      </div>
      
      <Hero />
      
      <div className="section-divider mx-auto max-w-5xl mt-10"></div>
      
      <ImpactStats />
      <OurWorkSection />
      
      {/* Enhanced decorative divider with parallax effect */}
      <div className="relative h-24 bg-gradient-to-b from-white to-[var(--parchment)] overflow-hidden">
        <ParallaxEffect direction="up" speed={0.5}>
          <div className="flex justify-center">
            <motion.div
              className="text-[var(--deep-saffron)] text-6xl opacity-20"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <i className='bx bxs-lotus'></i>
            </motion.div>
          </div>
        </ParallaxEffect>
      </div>
      
      <ImpactStory />
      <MeditationWidget />
      <SupportSection />
      <EventsNewsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
