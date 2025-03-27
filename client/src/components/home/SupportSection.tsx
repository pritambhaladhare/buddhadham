import SectionTitle from '@/components/shared/SectionTitle';
import DonationCard from '@/components/shared/DonationCard';
import { DONATION_OPTIONS, OTHER_SUPPORT_OPTIONS } from '@/lib/constants';

const SupportSection = () => {
  return (
    <section id="support" className="py-20 bg-[#F5F0E3]">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Support Our Mission" 
          subtitle="Your contribution helps preserve Buddhist heritage and support monastic communities"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DONATION_OPTIONS.map((option, index) => (
            <DonationCard key={index} option={option} />
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-white rounded-lg shadow-md">
          <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4 text-center">Other Ways to Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OTHER_SUPPORT_OPTIONS.map((option, index) => (
              <div key={index} className="text-center p-4">
                <div className={`h-16 w-16 mx-auto mb-4 rounded-full bg-${option.icon === 'bxs-donate-heart' ? '[#E67E22]' : option.icon === 'bxs-hand-up' ? '[#9D2933]' : '[#D4AF37]'}/10 flex items-center justify-center`}>
                  <i className={`bx ${option.icon} text-3xl text-${option.icon === 'bxs-donate-heart' ? '[#E67E22]' : option.icon === 'bxs-hand-up' ? '[#9D2933]' : '[#D4AF37]'}`}></i>
                </div>
                <h4 className="font-heading font-bold mb-2">{option.title}</h4>
                <p className="text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
