import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import InteractiveMap from '@/components/shared/InteractiveMap';
import { FadeInSection, SlideInSection } from '@/components/animation/AnimatedSection';
import ScrollRevealContainer from '@/components/animation/ScrollRevealContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const SacredMap = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8EA]">
      <Helmet>
        <title>Sacred Map - Buddha Dhaam</title>
        <meta name="description" content="Explore the sacred sites where Buddha Dhaam is working to preserve and support the teaching of lord buddha." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#F5F0E3] to-[#FFF8EA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#3A2718] mb-6">
                Sacred Journey Map
              </h1>
              <p className="text-xl text-[#5C4033] mb-8 max-w-2xl mx-auto">
                Explore the sacred places where Lord Buddha walked and where Buddha Dhaam continues his legacy of compassion and wisdom.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <i className='bx bx-info-circle text-xl text-orange-600'></i>
              <h3 className="font-medium text-orange-900">How to use this interactive map:</h3>
            </div>
            <p className="text-sm text-orange-700">
              Click on the markers to learn about our initiatives at each sacred location. 
              Use the scroll wheel or pinch gesture to zoom in/out. 
              Click and drag to move around the map.
            </p>
          </div>
          <InteractiveMap className="mb-16" />
        </div>
      </section>

      {/* Sacred Sites Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="The Four Sacred Sites" 
            subtitle="The places most significant in Lord Buddha's life journey"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <ScrollRevealContainer effect="fade-right" className="bg-[#FFF8EA] rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-[#D2691E] mb-3">Lumbini</h3>
                <p className="text-[#5C4033] mb-4">
                  Lumbini, located in present-day Nepal, is the birthplace of Lord Buddha. Here, Queen Maya Devi gave birth to Prince Siddhartha under a sal tree. Buddha Dhaam supports tree planting initiatives and monastery development in this sacred area.
                </p>
                <div className="flex items-center space-x-2 text-[#8B4513]">
                  <span className="font-medium">Our Focus:</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Environmental Preservation</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Monastic Support</span>
                </div>
              </div>
            </ScrollRevealContainer>

            <ScrollRevealContainer effect="fade-left" className="bg-[#FFF8EA] rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-[#D2691E] mb-3">Bodhgaya</h3>
                <p className="text-[#5C4033] mb-4">
                  Bodhgaya is where Prince Siddhartha attained enlightenment under the Bodhi tree after 49 days of meditation, becoming Buddha. Our organization focuses on stupa restoration and supporting the sacred Tripitaka chanting ceremonies.
                </p>
                <div className="flex items-center space-x-2 text-[#8B4513]">
                  <span className="font-medium">Our Focus:</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Heritage Preservation</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Spiritual Practices</span>
                </div>
              </div>
            </ScrollRevealContainer>

            <ScrollRevealContainer effect="fade-right" className="bg-[#FFF8EA] rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-[#D2691E] mb-3">Sarnath</h3>
                <p className="text-[#5C4033] mb-4">
                  Sarnath is where Buddha gave his first sermon, setting in motion the wheel of Dharma. Here he taught the Four Noble Truths and the Middle Way. Buddha Dhaam provides food, medical aid, and clean water to monks and local communities.
                </p>
                <div className="flex items-center space-x-2 text-[#8B4513]">
                  <span className="font-medium">Our Focus:</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Community Support</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Humanitarian Aid</span>
                </div>
              </div>
            </ScrollRevealContainer>

            <ScrollRevealContainer effect="fade-left" className="bg-[#FFF8EA] rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-[#D2691E] mb-3">Kushinagar</h3>
                <p className="text-[#5C4033] mb-4">
                  Kushinagar is where Buddha attained Mahaparinirvana (left his physical body) at the age of 80. Our organization supports the monks who maintain this sacred site and helps organize ceremonies commemorating Buddha's teachings.
                </p>
                <div className="flex items-center space-x-2 text-[#8B4513]">
                  <span className="font-medium">Our Focus:</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Monk Welfare</span>
                  <span className="px-3 py-1 bg-[#FFE4C4] rounded-full text-sm">Sacred Ceremonies</span>
                </div>
              </div>
            </ScrollRevealContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SlideInSection className="py-20 bg-gradient-to-b from-[#FFF8EA] to-[#F5F0E3]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-[#3A2718] mb-6">
            Support Our Sacred Work
          </h2>
          <p className="text-xl text-[#5C4033] mb-8 max-w-2xl mx-auto">
            Help us continue our mission of preserving these sacred sites and supporting the monks who maintain them for future generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/support">
              <Button className="bg-[#D2691E] hover:bg-[#A0522D] text-white px-8 py-6 rounded-md font-bold text-lg">
                Make a Donation
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button variant="outline" className="border-[#D2691E] text-[#D2691E] hover:bg-[#D2691E]/10 px-8 py-6 rounded-md font-bold text-lg">
                Volunteer With Us
              </Button>
            </Link>
          </div>
        </div>
      </SlideInSection>
    </div>
  );
};

export default SacredMap;