import { useState } from 'react';
import { motion } from 'framer-motion';
import MeditationBreathAnimation from '@/components/animation/MeditationBreathAnimation';
import { ScaleUpSection } from '@/components/animation/AnimatedSection';
import ScrollRevealContainer from '@/components/animation/ScrollRevealContainer';

const MeditationWidget = () => {
  const [showFullExperience, setShowFullExperience] = useState(false);
  
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Mindful Breathing Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a moment to center yourself with this guided breathing exercise.
            Buddha taught that mindful breathing is the gateway to enlightenment.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ScaleUpSection className="md:w-1/2 max-w-md">
            <div className="flex justify-center mb-4">
              <MeditationBreathAnimation 
                size={220}
                color="#f97316"
                activeColor="#FFD700"
                cycleTime={6}
                withText={true}
              />
            </div>
            
            <motion.button
              className="mx-auto mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium flex items-center justify-center"
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
                <div className="bg-orange-50 p-6 rounded-lg shadow-md">
                  <h3 className="font-heading text-xl font-bold mb-4 text-orange-900">Benefits of Mindful Breathing</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-orange-500 mt-1 mr-2'></i>
                      <span>Reduces stress and anxiety</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-orange-500 mt-1 mr-2'></i>
                      <span>Improves concentration and mental clarity</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-orange-500 mt-1 mr-2'></i>
                      <span>Cultivates presence and awareness</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-orange-500 mt-1 mr-2'></i>
                      <span>Enhances emotional regulation</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bxs-check-circle text-orange-500 mt-1 mr-2'></i>
                      <span>Connects you with your inner peace</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-orange-50 p-6 rounded-lg shadow-md space-y-4">
                  <h3 className="font-heading text-xl font-bold mb-4 text-orange-900">Guided Meditation</h3>
                  
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Step 1: Find Your Position</h4>
                    <p className="text-sm text-gray-700">
                      Sit comfortably with your spine straight. Place your hands on your knees, palms facing up or down.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Step 2: Focus Your Awareness</h4>
                    <p className="text-sm text-gray-700">
                      Gently close your eyes. Bring your attention to the sensation of breathing.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Step 3: Follow Your Breath</h4>
                    <p className="text-sm text-gray-700">
                      Inhale slowly through your nose, feel your lungs expand. Hold briefly. Exhale completely.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Step 4: Return to Center</h4>
                    <p className="text-sm text-gray-700">
                      When your mind wanders, gently bring it back to your breath without judgment.
                    </p>
                  </div>
                  
                  <div className="text-center pt-2">
                    <span className="text-sm text-gray-500 italic">
                      "Breathing in, I calm body and mind. Breathing out, I smile."
                    </span>
                  </div>
                </div>
              )}
            </ScrollRevealContainer>
          </div>
        </div>
        
        {/* Download App Section */}
        <div id="download-app" className="mt-16 bg-orange-50 rounded-xl p-8 shadow-lg max-w-5xl mx-auto">
          <ScrollRevealContainer effect="fade-up">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Buddha Dhaam Mobile App
                </h3>
                <p className="text-gray-700 mb-6">
                  Buddha Dhaam helps you track your daily Vipassana practice, keeps you motivated to meditate every day, and is absolutely free to download and use. 🙏
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a 
                    href="#" 
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className='bx bxl-apple text-2xl'></i>
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className='bx bxl-play-store text-2xl'></i>
                    <div>
                      <div className="text-xs">Get it on</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </motion.a>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <motion.div
                  className="relative w-64 h-80 md:w-72 md:h-96 bg-gray-200 rounded-[36px] border-[8px] border-gray-800 shadow-xl overflow-hidden"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute w-32 h-6 bg-gray-800 top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg"></div>
                  <div className="w-full h-full flex items-center justify-center bg-orange-100">
                    <div className="text-center p-4">
                      <div className="w-20 h-20 mx-auto rounded-full bg-orange-500 flex items-center justify-center mb-4">
                        <i className='bx bxs-meditation text-white text-3xl'></i>
                      </div>
                      <h4 className="text-lg font-bold text-orange-800">Buddha Dhaam</h4>
                      <p className="text-sm text-orange-700 mt-2">Track your meditation progress</p>
                      <div className="mt-6 flex justify-center">
                        <div className="w-full max-w-xs bg-white rounded-lg p-3 shadow-sm">
                          <div className="h-4 w-3/4 bg-orange-200 rounded mb-2"></div>
                          <div className="h-4 w-1/2 bg-orange-200 rounded mb-2"></div>
                          <div className="h-4 w-4/5 bg-orange-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollRevealContainer>
        </div>
      </div>
    </section>
  );
};

export default MeditationWidget;