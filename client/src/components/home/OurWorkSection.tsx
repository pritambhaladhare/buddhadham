import { Link } from 'wouter';
import SectionTitle from '@/components/shared/SectionTitle';
import WorkCard from '@/components/shared/WorkCard';
import { WORK_CATEGORIES } from '@/lib/constants';

const OurWorkSection = () => {
  return (
    <section id="our-work" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Sacred Work" 
          subtitle="Preserving traditions, serving monastic communities, and protecting Buddhist heritage"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default OurWorkSection;
