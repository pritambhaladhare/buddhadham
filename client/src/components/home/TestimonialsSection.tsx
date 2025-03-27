import SectionTitle from '@/components/shared/SectionTitle';
import { TESTIMONIALS } from '@/lib/constants';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#3A2718]">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Words of Wisdom" 
          subtitle="Insights from those we serve and those who support our mission"
          light={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-[#5D4230] p-8 rounded-lg">
              <div className="mb-4 text-[#D4AF37]">
                <i className='bx bxs-quote-alt-left text-4xl'></i>
              </div>
              <p className="text-white text-lg mb-6 font-accent italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#D4AF37]">{testimonial.name}</h4>
                  <p className="text-[#F5F0E3] text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
