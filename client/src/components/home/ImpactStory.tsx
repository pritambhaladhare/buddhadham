import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const ImpactStory = () => {
  return (
    <section className="py-20 bg-[#9D2933]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <img 
              src="/src/assets/images/buddha-shrine.jpg" 
              alt="Buddha statue in shrine" 
              className="rounded-lg shadow-lg" 
            />
          </div>
          <div className="md:w-1/2 text-white">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Sacred Shrine Conservation</h2>
            <p className="text-lg mb-6">
              Our conservation team works tirelessly to preserve and protect the sacred Buddha shrines found throughout the holy sites. These spiritual treasures represent the living heritage of Buddhist traditions.
            </p>
            <p className="text-lg mb-6">
              Through careful restoration and regular maintenance, these precious Buddha statues continue to inspire devotion and meditation for monks and pilgrims who visit these sacred spaces.
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <i className='bx bxs-temple text-2xl text-[#3A2718]'></i>
              </div>
              <div>
                <h4 className="font-heading font-bold">Spiritual Preservation</h4>
                <p className="text-sm">Maintaining the sacred essence of Buddhist tradition</p>
              </div>
            </div>
            <Link href="/our-work">
              <Button className="px-6 py-3 border-2 border-white rounded-md font-bold hover:bg-white hover:text-[#9D2933] transition">
                Explore Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStory;
