import { Link } from 'wouter';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedButton from '@/components/animation/AnimatedButton';
import { 
  FadeInSection, 
  SlideInSection, 
  StaggerContainer, 
  StaggerItem,
  FloatingElement
} from '@/components/animation/AnimatedSection';
import buddhaShrine from '@assets/IMG-20250327-WA0022.jpg';

const ImpactStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Timeline animation variants for storytelling
  const timelineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  // Decorative elements animation
  const decorativeBgVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.1, 
      scale: 1,
      transition: { 
        duration: 1,
        delay: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-[#9D2933] relative overflow-hidden" ref={sectionRef}>
      {/* Decorative Background Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#D4AF37] opacity-10 -mr-20 -mt-20"
        variants={decorativeBgVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D4AF37] opacity-10 -ml-20 -mb-20"
        variants={decorativeBgVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.7 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <SlideInSection 
            className="md:w-1/2"
            direction="left"
            delay={0.2}
          >
            <div className="relative">
              <img 
                src={buddhaShrine} 
                alt="Buddha statue in shrine" 
                className="rounded-lg shadow-xl z-10 relative" 
              />
              
              {/* Image frame animation */}
              <motion.div
                className="absolute inset-0 border-4 border-[#D4AF37] rounded-lg"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              
              {/* Floating lotus decoration */}
              <FloatingElement className="absolute -bottom-5 -right-5 text-4xl text-[#D4AF37]">
                <i className='bx bxs-lotus'></i>
              </FloatingElement>
            </div>
          </SlideInSection>
          
          <div className="md:w-1/2 text-white">
            <FadeInSection delay={0.3}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Sacred Shrine Conservation</h2>
              
              {/* Animated timeline bar */}
              <div className="h-1 bg-[#D4AF37] rounded-full w-0 mb-6">
                <motion.div 
                  className="h-full w-full bg-[#D4AF37]"
                  variants={timelineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
              </div>
            </FadeInSection>
            
            <StaggerContainer staggerDelay={0.2} delay={0.4}>
              <StaggerItem>
                <p className="text-lg mb-6">
                  Our conservation team works tirelessly to preserve and protect the sacred Buddha shrines found throughout the holy sites. These spiritual treasures represent the living heritage of Buddhist traditions.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p className="text-lg mb-6">
                  Through careful restoration and regular maintenance, these precious Buddha statues continue to inspire devotion and meditation for monks and pilgrims who visit these sacred spaces.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <motion.div 
                  className="flex items-center space-x-4 mb-8 p-4 bg-[#8E2128] rounded-lg"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <FloatingElement className="h-14 w-14 rounded-full bg-[#D4AF37] flex items-center justify-center">
                    <i className='bx bxs-temple text-2xl text-[#3A2718]'></i>
                  </FloatingElement>
                  <div>
                    <h4 className="font-heading font-bold">Spiritual Preservation</h4>
                    <p className="text-sm">Maintaining the sacred essence of Buddhist tradition</p>
                  </div>
                </motion.div>
              </StaggerItem>
              
              <StaggerItem>
                <Link href="/our-work">
                  <AnimatedButton 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-[#9D2933]"
                    onClick={() => {}}
                  >
                    <span className="flex items-center">
                      Explore Our Work 
                      <i className='bx bx-right-arrow-alt ml-2'></i>
                    </span>
                  </AnimatedButton>
                </Link>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStory;
