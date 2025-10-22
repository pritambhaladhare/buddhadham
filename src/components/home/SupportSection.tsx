import SectionTitle from '@/components/shared/SectionTitle';
import DonationCard from '@/components/shared/DonationCard';
import { DONATION_OPTIONS, OTHER_SUPPORT_OPTIONS } from '@/lib/constants';
import { motion } from 'framer-motion';
import MantraText from '@/components/animation/MantraText';
import { ScaleUpSection } from '@/components/animation/AnimatedSection';
import Particles from '@/components/animation/Particles';

const SupportSection = () => {
  return (
    <section id="support" className="py-20 bg-orange-50 relative">
      {/* Particle effects */}
      <Particles 
        count={20} 
        colors={['#FFA500', '#FFD700', '#FF8C00']} 
        shape="leaf" 
        speed={30}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-2 flex justify-center">
          <motion.div 
            className="text-orange-500 text-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotateZ: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <i className='bx bxs-heart'></i>
          </motion.div>
        </div>
        
        <SectionTitle 
          title="Support Our Spiritual Mission" 
          subtitle="Your dana (offering) helps preserve Buddha's teachings and support monks"
        />
        
        <ScaleUpSection className="mb-8">
          <div className="max-w-xl mx-auto p-4 rounded-lg bg-orange-100/50 text-center">
            <p className="text-gray-600 italic mb-2">Meditate on the wisdom of</p>
            <MantraText 
              text="Lokah Samastah Sukhino Bhavantu" 
              speed="medium" 
              fontSize="1.25rem"
              color="#f97316"
              backgroundColor="rgba(249, 115, 22, 0.1)" 
              className="font-medium" 
            />
            <p className="text-gray-600 italic mt-2">May all beings everywhere be happy and free</p>
          </div>
        </ScaleUpSection>
        
        <div className="flex justify-center">
          {DONATION_OPTIONS.map((option, index) => (
            <div key={index} className="max-w-md">
              <DonationCard option={option} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-white rounded-lg shadow-md">
          <h3 className="font-heading text-2xl font-bold text-orange-900 mb-4 text-center">Other Ways to Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OTHER_SUPPORT_OPTIONS.map((option, index) => (
              <div key={index} className="text-center p-4">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <i className={`bx ${option.icon} text-3xl text-orange-500`}></i>
                </div>
                <h4 className="font-heading font-bold mb-2 text-orange-900">{option.title}</h4>
                <p className="text-sm text-gray-700">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
