import SectionTitle from '@/components/shared/SectionTitle';
import DonationCard from '@/components/shared/DonationCard';
import { DONATION_OPTIONS, OTHER_SUPPORT_OPTIONS } from '@/lib/constants';

const SupportSection = () => {
  return (
    <section id="support" className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="mb-2 flex justify-center">
          <div className="text-orange-500 text-3xl">
            <i className='bx bxs-heart'></i>
          </div>
        </div>
        <SectionTitle 
          title="Support Our Spiritual Mission" 
          subtitle="Your dana (offering) helps preserve Buddha's teachings and support monks"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DONATION_OPTIONS.map((option, index) => (
            <DonationCard key={index} option={option} />
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
