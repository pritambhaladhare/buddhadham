import { Link } from 'wouter';
import SectionTitle from '@/components/shared/SectionTitle';
import WorkCard from '@/components/shared/WorkCard';
import { WORK_CATEGORIES } from '@/lib/constants';

const OurWorkSection = () => {
  return (
    <section id="our-work" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Sacred Work" 
          subtitle="Serving monks, preserving traditions, and protecting heritage of teaching of lord buddha across sacred sites"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {WORK_CATEGORIES.map((category, index) => (
            <WorkCard 
              key={index}
              title={category.title}
              description={category.description}
              image={category.image}
              link={`/our-work#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center flex flex-col md:flex-row justify-center gap-4">
          <Link href="/our-work">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 shadow-md">
              Explore More Sacred Work
            </button>
          </Link>
          <Link href="/sacred-map">
            <button className="px-8 py-3 bg-[#D2691E] hover:bg-[#A0522D] text-white font-bold rounded-lg transition duration-300 shadow-md flex items-center justify-center gap-2">
              <i className='bx bx-map-alt text-xl'></i>
              View Sacred Sites Map
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurWorkSection;
