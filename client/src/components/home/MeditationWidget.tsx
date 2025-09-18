import { useState } from 'react';
import { motion } from 'framer-motion';
import MeditationBreathAnimation from '@/components/animation/MeditationBreathAnimation';
import { ScaleUpSection } from '@/components/animation/AnimatedSection';
import ScrollRevealContainer from '@/components/animation/ScrollRevealContainer';

const MeditationWidget = () => {
  const [showFullExperience, setShowFullExperience] = useState(false);
  
  return (
    <section className="py-16 bg-[var(--ivory)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--bodhi-bark)] mb-4">
            Mindful Breathing Experience
          </h2>
          <p className="text-[var(--temple-stone)] max-w-2xl mx-auto">
            Take a moment to center yourself with this guided breathing exercise.
            Lord Buddha taught that mindful breathing is the gateway to enlightenment.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ScaleUpSection className="md:w-1/2 max-w-md">
            <div className="flex justify-center mb-4">
              <MeditationBreathAnimation 
                size={220}
                color="var(--deep-saffron)"
                activeColor="var(--enlightenment-gold)"
                cycleTime={6}
                withText={true}
              />
            </div>
            
            <motion.button
              className="mx-auto mt-6 px-6 py-3 bg-[var(--monk-robe)] text-white rounded-lg font-medium flex items-center justify-center border border-[var(--deep-saffron)]/20 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFullExperience(!showFullExperience)}
            >
              <i className={`bx ${showFullExperience ? 'bx-minus' : 'bx-plus'} mr-2`}></i>
              {showFullExperience ? 'Simplify Experience' : 'Enhance Experience'}
            </motion.button>
          </ScaleUpSection>
          
          <div className="md:w-1/2 max-w-md">
            <ScrollRevealContainer effect="fade-left" delay={0.2}>
              {!showFullExperience ? (
                <div className="bg-[var(--parchment)] p-6 rounded-lg shadow-md border border-[var(--saffron)]/20">
                  <h3 className="font-heading text-xl font-bold mb-4 text-[var(--bodhi-bark)]">Benefits of Mindful Breathing</h3>
                  <ul className="space-y-3 text-[var(--temple-stone)]">
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-[var(--deep-saffron)] mt-1 mr-2'></i>
                      <span>Reduces stress and anxiety</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-[var(--deep-saffron)] mt-1 mr-2'></i>
                      <span>Improves concentration and mental clarity</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-[var(--deep-saffron)] mt-1 mr-2'></i>
                      <span>Cultivates presence and awareness</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-[var(--deep-saffron)] mt-1 mr-2'></i>
                      <span>Enhances emotional regulation</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-[var(--deep-saffron)] mt-1 mr-2'></i>
                      <span>Connects you with your inner peace</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-[var(--parchment)] p-6 rounded-lg shadow-md space-y-4 border border-[var(--saffron)]/20">
                  <h3 className="font-heading text-xl font-bold mb-4 text-[var(--bodhi-bark)]">Guided Meditation</h3>
                  
                  <div className="p-4 bg-[var(--ivory)] rounded-lg border border-[var(--saffron)]/10">
                    <h4 className="font-medium text-[var(--bodhi-bark)] mb-2">Step 1: Find Your Position</h4>
                    <p className="text-sm text-[var(--temple-stone)]">
                      Sit comfortably with your spine straight. Place your hands on your knees, palms facing up or down.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-[var(--ivory)] rounded-lg border border-[var(--saffron)]/10">
                    <h4 className="font-medium text-[var(--bodhi-bark)] mb-2">Step 2: Focus Your Awareness</h4>
                    <p className="text-sm text-[var(--temple-stone)]">
                      Gently close your eyes. Bring your attention to the sensation of breathing.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-[var(--ivory)] rounded-lg border border-[var(--saffron)]/10">
                    <h4 className="font-medium text-[var(--bodhi-bark)] mb-2">Step 3: Follow Your Breath</h4>
                    <p className="text-sm text-[var(--temple-stone)]">
                      Inhale slowly through your nose, feel your lungs expand. Hold briefly. Exhale completely.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-[var(--ivory)] rounded-lg border border-[var(--saffron)]/10">
                    <h4 className="font-medium text-[var(--bodhi-bark)] mb-2">Step 4: Return to Center</h4>
                    <p className="text-sm text-[var(--temple-stone)]">
                      When your mind wanders, gently bring it back to your breath without judgment.
                    </p>
                  </div>
                  
                  <div className="text-center pt-2">
                    <span className="text-sm text-[var(--monk-robe)] italic">
                      "Breathing in, I calm body and mind. Breathing out, I smile."
                    </span>
                  </div>
                </div>
              )}
            </ScrollRevealContainer>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default MeditationWidget;