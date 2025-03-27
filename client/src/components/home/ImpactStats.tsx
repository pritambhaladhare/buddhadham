import { IMPACT_STATS } from '@/lib/constants';

const ImpactStats = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {IMPACT_STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="text-[#D4AF37] text-5xl font-heading font-bold">{stat.number}</span>
              <div className="h-1 w-12 bg-[#9D2933] mx-auto my-3"></div>
              <p className="text-[#3A2718] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
