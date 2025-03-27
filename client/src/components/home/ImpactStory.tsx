import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const ImpactStory = () => {
  return (
    <section className="py-20 bg-[#9D2933]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1601591568038-6124edc513c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Restored Buddhist temple" 
              className="rounded-lg shadow-lg" 
            />
          </div>
          <div className="md:w-1/2 text-white">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">The Revival of Kushinagar Temple</h2>
            <p className="text-lg mb-6">
              When we first arrived at the ancient Kushinagar temple complex, much of the original structure had fallen into disrepair. With the dedicated support of our donors and volunteers, we were able to undertake a comprehensive restoration project.
            </p>
            <p className="text-lg mb-6">
              Today, this sacred site has been restored to its former glory, with regular chanting ceremonies and a thriving community of 50 resident monks who now have proper accommodations, regular meals, and medical support.
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <i className='bx bxs-temple text-2xl text-[#3A2718]'></i>
              </div>
              <div>
                <h4 className="font-heading font-bold">Complete Restoration</h4>
                <p className="text-sm">From crumbling ruins to spiritual sanctuary</p>
              </div>
            </div>
            <Link href="/our-work/kushinagar-temple">
              <Button className="px-6 py-3 border-2 border-white rounded-md font-bold hover:bg-white hover:text-[#9D2933] transition">
                Read Full Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStory;
