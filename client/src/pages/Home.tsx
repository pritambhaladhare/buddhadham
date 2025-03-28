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

const Home = () => {
  return (
    <>
      <Hero />
      <ImpactStats />
      <OurWorkSection />
      
      {/* Decorative divider with parallax effect */}
      <div className="relative h-24 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
        <ParallaxEffect direction="up" speed={0.5}>
          <div className="flex justify-center">
            <motion.div
              className="text-orange-300 text-6xl opacity-20"
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
