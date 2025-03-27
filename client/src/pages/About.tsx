import { Link } from 'wouter';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="bg-[#F5F0E3]">
      <div className="pt-32 pb-16 bg-[#3A2718]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">About Buddha Dhaam</h1>
            <p className="font-accent text-xl text-[#D4AF37] max-w-3xl mx-auto">
              Our vision, legacy, and the transformative work of preserving Buddhist heritage
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-6">Our Vision</h2>
              <p className="text-lg mb-6 leading-relaxed">
                Buddha Dhaam envisions a world where the sacred teachings of Buddhism are preserved, honored, and accessible to all. We believe that by supporting monastic communities and protecting the physical heritage of Buddhism, we help ensure that the wisdom of the Buddha continues to illuminate minds for generations to come.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Our organization is dedicated to creating a global network of engaged Buddhists who work together to safeguard traditions while adapting to the needs of contemporary society.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1629196914448-38c164ca958b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Buddha statue in meditation pose" 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-6">Our History</h2>
              <p className="text-lg mb-6 leading-relaxed">
                Buddha Dhaam was founded in 2010 by a group of dedicated Buddhist practitioners and scholars who witnessed the deterioration of important sacred sites and the struggles faced by monastic communities. What began as a small initiative to provide meals for monks in Bodhgaya has grown into a comprehensive organization operating across multiple sacred sites in India and Nepal.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Over the years, our work has expanded from direct support to monks to include preservation of physical heritage, environmental initiatives, and educational programs. We are proud to have restored 12 monasteries, planted over 500 sacred Peepal trees, and provided support to more than 1,000 monks each month.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1533669955142-6a73332af4db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Ancient Buddhist monastery" 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Team" 
            subtitle="Dedicated individuals working to preserve Buddhist heritage"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1596075780750-81249df16d19?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Venerable Dhammajoti" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-1">Venerable Dhammajoti</h3>
              <p className="text-[#9D2933] mb-3">Founder & Spiritual Director</p>
              <p className="text-sm max-w-xs mx-auto">
                A respected Buddhist monk with over 30 years of devotion to preserving Dharma teachings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Dr. Amita Sharma" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-1">Dr. Amita Sharma</h3>
              <p className="text-[#9D2933] mb-3">Executive Director</p>
              <p className="text-sm max-w-xs mx-auto">
                An archaeologist and scholar leading our preservation and restoration initiatives.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Rajesh Patel" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-1">Rajesh Patel</h3>
              <p className="text-[#9D2933] mb-3">Director of Operations</p>
              <p className="text-sm max-w-xs mx-auto">
                A dedicated manager overseeing our support programs and day-to-day activities.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/our-team">
              <Button className="px-6 py-3 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition">
                Meet Our Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-[#F5F0E3]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-6">Join Our Mission</h2>
          <p className="text-lg mb-8">
            Buddha Dhaam welcomes individuals and organizations who share our commitment to preserving Buddhist heritage. Whether through donations, volunteering, or partnerships, there are many ways to contribute to this sacred work.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/support">
              <Button className="px-6 py-3 bg-[#E67E22] text-[#271A10] font-bold rounded-md hover:bg-[#C26B1D] transition">
                Support Our Work
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button className="px-6 py-3 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition">
                Volunteer With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
