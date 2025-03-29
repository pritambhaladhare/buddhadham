import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import InteractiveMap from '@/components/shared/InteractiveMap';
import { FadeInSection, SlideInSection } from '@/components/animation/AnimatedSection';
import ScrollRevealContainer from '@/components/animation/ScrollRevealContainer';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Pilgrimage sites data
const PILGRIMAGE_SITES = [
  {
    id: 'lumbini',
    name: 'Lumbini',
    description: 'Birthplace of Lord Buddha',
    significance: 'This is where Prince Siddhartha was born to Queen Maya Devi in 563 BCE. The sacred garden and Maya Devi Temple mark the exact birthplace. A visit here connects you directly with the beginning of Buddha\'s journey.',
    bestTimeToVisit: 'October to May, avoiding the monsoon season. Buddha Jayanti (May) is a special time to visit.',
    nearbyAccommodation: 'Several monasteries offer basic accommodation for pilgrims. Hotels like Buddha Maya Garden and Lumbini Hotel Kasai provide comfortable stays.',
    travelTips: [
      'Visit the Ashoka Pillar which confirmed this as Buddha\'s birthplace',
      'Allow time to visit the World Peace Pagoda',
      'Bring modest clothing suitable for temple visits',
      'Many monasteries built by different Buddhist nations can be toured in a single day'
    ],
    imageSrc: '/src/assets/images/lumbini.jpg',
    focusAreas: ['Environmental Preservation', 'Monastic Support'],
    spiritualPractices: 'Meditation in the sacred garden, circumambulation of the Maya Devi Temple, paying respects at the birthplace marker stone.'
  },
  {
    id: 'bodhgaya',
    name: 'Bodhgaya',
    description: 'Where Buddha attained enlightenment',
    significance: 'The most sacred site for Buddhists worldwide, where Prince Siddhartha meditated under the Bodhi Tree for 49 days and attained enlightenment, becoming Buddha. The Mahabodhi Temple Complex is a UNESCO World Heritage site.',
    bestTimeToVisit: 'November to February offers pleasant weather. The Kagyu Monlam prayer festival (December/January) is a powerful time to visit.',
    nearbyAccommodation: 'Many international Buddhist monasteries offer accommodation for pilgrims. Hotels like Hotel Bodhgaya Regency and Oaks Bodhgaya provide comfortable stays nearby.',
    travelTips: [
      'Meditate under the Bodhi Tree, a descendant of the original tree',
      'Circumambulate the Mahabodhi Temple, especially at sunrise or sunset',
      'Visit the Giant Buddha statue and surrounding gardens',
      'Explore the international monasteries built in various national architectural styles'
    ],
    imageSrc: '/src/assets/images/bodhgaya.jpg',
    focusAreas: ['Heritage Preservation', 'Spiritual Practices'],
    spiritualPractices: 'Meditation under the Bodhi Tree, circumambulation of the Mahabodhi Temple, offering prayers at the Diamond Throne (Vajrasana).'
  },
  {
    id: 'sarnath',
    name: 'Sarnath',
    description: 'Where Buddha delivered his first sermon',
    significance: 'After attaining enlightenment, Buddha came to Sarnath to deliver his first teaching on the Four Noble Truths. This event is known as "turning the wheel of Dharma" and marks the foundation of Buddhist teachings.',
    bestTimeToVisit: 'October to March for pleasant weather. The Dhammachakra Day celebrations (July/August) commemorate Buddha\'s first sermon.',
    nearbyAccommodation: 'The Thai Monastery and Tibetan Monastery offer pilgrim accommodation. Budget hotels are available in Varanasi city.',
    travelTips: [
      'Visit the Dhamek Stupa, marking where Buddha taught the Four Noble Truths',
      'The Archaeological Museum houses the famous lion capital of the Ashoka Pillar',
      'Arrange a local guide to understand the historical significance of the ruins',
      'Varanasi is only 10km away - many pilgrims combine these two sacred destinations'
    ],
    imageSrc: '/src/assets/images/sarnath.jpg',
    focusAreas: ['Community Support', 'Food & Medical Aid'],
    spiritualPractices: 'Circumambulation of the Dhamek Stupa, meditation in the Deer Park, contemplation on the Four Noble Truths.'
  },
  {
    id: 'kushinagar',
    name: 'Kushinagar',
    description: 'Where Buddha attained Mahaparinirvana',
    significance: 'The place where Buddha attained Mahaparinirvana (left his physical body) at the age of 80. The Mahaparinirvana Temple houses a 6-meter long reclining Buddha statue depicting his final moments.',
    bestTimeToVisit: 'October to March for comfortable weather. Buddha Purnima (May) sees special ceremonies at the Mahaparinirvana Temple.',
    nearbyAccommodation: 'The Japanese Temple and other monasteries offer pilgrim accommodation. Lotus Nikko Hotel and Hotel Skyland provide comfortable stays.',
    travelTips: [
      'Visit the Ramabhar Stupa marking the cremation site of Lord Buddha',
      'Spend time in quiet contemplation at the Mahaparinirvana Temple',
      'Explore the meditation parks surrounding the main temple',
      'Visit the Mathakuar shrine where Buddha delivered his final sermon'
    ],
    imageSrc: '/src/assets/images/kushinagar.jpg',
    focusAreas: ['Monk Welfare', 'Sacred Ceremonies'],
    spiritualPractices: 'Silent meditation before the reclining Buddha statue, circumambulation of the Mahaparinirvana Temple, prayer at the cremation stupa.'
  }
];

const SacredMap = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle anchor links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setSelectedSite(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Check hash on load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8EA]">
      <Helmet>
        <title>Sacred Pilgrimage Guide - Buddha Dhaam</title>
        <meta name="description" content="A pilgrimage guide to Buddha's sacred sites: Lumbini, Bodhgaya, Sarnath, and Kushinagar. Plan your spiritual journey with travel tips, accommodation advice, and spiritual practices." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#F5F0E3] to-[#FFF8EA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#3A2718] mb-6">
                Sacred Pilgrimage Guide
              </h1>
              <p className="text-xl text-[#5C4033] mb-8 max-w-2xl mx-auto">
                Journey to the four most sacred sites in Buddhism where Lord Buddha's life unfolded. A complete travel guide for spiritual seekers.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-3 py-1 bg-[#D2691E]/20 text-[#8B4513] rounded-full text-sm font-medium">Travel Tips</span>
                <span className="px-3 py-1 bg-[#D2691E]/20 text-[#8B4513] rounded-full text-sm font-medium">Accommodation</span>
                <span className="px-3 py-1 bg-[#D2691E]/20 text-[#8B4513] rounded-full text-sm font-medium">Spiritual Practices</span>
                <span className="px-3 py-1 bg-[#D2691E]/20 text-[#8B4513] rounded-full text-sm font-medium">Best Times to Visit</span>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollRevealContainer effect="fade-up">
              <div className="bg-[#FFF8EA] p-6 rounded-lg border-l-4 border-[#D2691E]">
                <h2 className="text-2xl font-heading font-bold text-[#3A2718] mb-4">Why Every Buddhist Should Visit These Sites</h2>
                <p className="text-[#5C4033] mb-4">
                  Lord Buddha himself encouraged his followers to visit the four main places of his life: his birthplace (Lumbini), 
                  the place of his enlightenment (Bodhgaya), where he first taught (Sarnath), and where he attained 
                  Mahaparinirvana (Kushinagar). He said these places would inspire faith and understanding in his followers.
                </p>
                <p className="text-[#5C4033]">
                  "After I am gone, O Ananda, men of faith will visit with feelings of reverence to the 
                  places where the Tathagata was born, where he attained enlightenment, where he first taught, 
                  and where he finally passed away. And whoever dies with a peaceful mind while on pilgrimage to these 
                  shrines will be reborn in a heavenly world."
                </p>
                <div className="mt-4 text-right italic text-[#8B4513]">
                  - From the Mahaparinibbana Sutta
                </div>
              </div>
            </ScrollRevealContainer>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="The Four Sacred Sites" 
            subtitle="Interactive map of Buddha's life journey"
          />
          
          <div className="max-w-5xl mx-auto mt-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <i className='bx bx-info-circle text-xl text-orange-600'></i>
                <h3 className="font-medium text-orange-900">How to use this interactive map:</h3>
              </div>
              <p className="text-sm text-orange-700">
                Click on the markers to learn about each sacred location and see travel information. 
                Use the scroll wheel to zoom in/out. Click and drag to move around the map.
                Click "View Travel Guide" for detailed pilgrimage information.
              </p>
            </div>
            <InteractiveMap className="mb-12" />
          </div>
        </div>
      </section>

      {/* Pilgrimage Guides Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Complete Pilgrimage Guides" 
            subtitle="Detailed information for each sacred site"
          />
          
          <div className="max-w-5xl mx-auto mt-8">
            <Tabs defaultValue={selectedSite || "lumbini"} className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-2">
                <TabsList className="bg-orange-100">
                  {PILGRIMAGE_SITES.map(site => (
                    <TabsTrigger 
                      key={site.id} 
                      value={site.id} 
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                      onClick={() => setSelectedSite(site.id)}
                    >
                      {site.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {PILGRIMAGE_SITES.map(site => (
                <TabsContent key={site.id} value={site.id} className="mt-0">
                  <div id={site.id} className="scroll-mt-32">
                    <ScrollRevealContainer effect="fade-up">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-[#D2691E] to-[#E6BF83] text-white p-4">
                          <h2 className="text-2xl font-heading font-bold">{site.name}</h2>
                          <p className="opacity-90">{site.description}</p>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex flex-col lg:flex-row gap-8 mb-8">
                            <div className="lg:w-1/2">
                              <img 
                                src={site.imageSrc} 
                                alt={site.name} 
                                className="rounded-lg w-full h-64 object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/src/assets/images/buddha-placeholder.jpg';
                                }}
                              />
                            </div>
                            
                            <div className="lg:w-1/2">
                              <h3 className="text-xl font-heading font-semibold text-[#A0522D] mb-3">Spiritual Significance</h3>
                              <p className="text-gray-700 mb-6">{site.significance}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {site.focusAreas.map((area, index) => (
                                  <span key={index} className="px-3 py-1 bg-[#D2691E]/10 text-[#8B4513] rounded-full text-sm">
                                    {area}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex items-center mt-4">
                                <div className="text-orange-500 mr-2">
                                  <i className='bx bxs-heart-circle text-xl'></i>
                                </div>
                                <span className="text-[#8B4513] text-sm">
                                  Every Buddhist should visit this sacred site at least once in their lifetime
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-[#FFF8EA] p-4 rounded-lg">
                              <h3 className="text-lg font-heading font-medium text-[#A0522D] mb-2 flex items-center">
                                <i className='bx bx-calendar text-xl mr-2 text-orange-500'></i>
                                Best Time to Visit
                              </h3>
                              <p className="text-gray-700">{site.bestTimeToVisit}</p>
                            </div>
                            
                            <div className="bg-[#FFF8EA] p-4 rounded-lg">
                              <h3 className="text-lg font-heading font-medium text-[#A0522D] mb-2 flex items-center">
                                <i className='bx bx-hotel text-xl mr-2 text-orange-500'></i>
                                Accommodation Options
                              </h3>
                              <p className="text-gray-700">{site.nearbyAccommodation}</p>
                            </div>
                          </div>
                          
                          <div className="mb-8">
                            <h3 className="text-lg font-heading font-medium text-[#A0522D] mb-3 flex items-center">
                              <i className='bx bx-bulb text-xl mr-2 text-orange-500'></i>
                              Pilgrim Travel Tips
                            </h3>
                            <ul className="space-y-2 ml-6">
                              {site.travelTips.map((tip, index) => (
                                <li key={index} className="text-gray-700 flex items-start">
                                  <span className="text-orange-500 mr-2">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-[#F8F4E3] p-4 rounded-lg border-l-4 border-[#D2691E]">
                            <h3 className="text-lg font-heading font-medium text-[#A0522D] mb-2 flex items-center">
                              <i className='bx bx-spa text-xl mr-2 text-orange-500'></i>
                              Spiritual Practices
                            </h3>
                            <p className="text-gray-700">{site.spiritualPractices}</p>
                          </div>
                          
                          <div className="mt-8 text-center">
                            <p className="text-gray-600 mb-4">
                              Buddha Dhaam provides support to monks and pilgrims at {site.name}. 
                              Your donations help preserve this sacred site.
                            </p>
                            <Link href="/support">
                              <Button className="bg-[#D2691E] hover:bg-[#A0522D] text-white px-6 py-2 rounded-md">
                                Support Our Work at {site.name}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </ScrollRevealContainer>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Planning Your Pilgrimage */}
      <section className="py-12 bg-[#FFF8EA]">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Planning Your Pilgrimage" 
            subtitle="Practical advice for spiritual travelers"
          />
          
          <div className="max-w-4xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollRevealContainer effect="fade-right">
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="text-orange-500 text-3xl mb-3">
                    <i className='bx bx-route'></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#A0522D] mb-2">Recommended Route</h3>
                  <p className="text-gray-700 mb-3">
                    The most efficient pilgrimage route usually follows Buddha's life chronologically:
                  </p>
                  <ol className="space-y-2 ml-5 list-decimal">
                    <li className="text-gray-700">Start at Lumbini (birth)</li>
                    <li className="text-gray-700">Continue to Bodhgaya (enlightenment)</li>
                    <li className="text-gray-700">Visit Sarnath (first teaching)</li>
                    <li className="text-gray-700">End at Kushinagar (passing)</li>
                  </ol>
                  <p className="text-gray-700 mt-3">
                    This journey typically takes 10-14 days to complete with adequate time at each site.
                  </p>
                </div>
              </ScrollRevealContainer>
              
              <ScrollRevealContainer effect="fade-left">
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="text-orange-500 text-3xl mb-3">
                    <i className='bx bx-time-five'></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#A0522D] mb-2">Seasonal Considerations</h3>
                  <p className="text-gray-700 mb-3">
                    The ideal seasons for pilgrimage to all four sites are:
                  </p>
                  <ul className="space-y-2 ml-5">
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <strong>October-November:</strong> Pleasant weather after monsoon, lush landscapes
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <strong>January-February:</strong> Cool weather, major Buddhist festivals
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <strong>Avoid:</strong> June-September (monsoon) makes travel difficult
                    </li>
                  </ul>
                </div>
              </ScrollRevealContainer>
              
              <ScrollRevealContainer effect="fade-right">
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="text-orange-500 text-3xl mb-3">
                    <i className='bx bx-book-open'></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#A0522D] mb-2">Spiritual Preparation</h3>
                  <p className="text-gray-700 mb-3">
                    To make your pilgrimage more meaningful:
                  </p>
                  <ul className="space-y-2 ml-5">
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Read about the historical significance of each site before visiting
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Practice meditation daily before your journey
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Consider observing the Five Precepts during your pilgrimage
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Bring offerings for monasteries (flowers, incense, candles)
                    </li>
                  </ul>
                </div>
              </ScrollRevealContainer>
              
              <ScrollRevealContainer effect="fade-left">
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="text-orange-500 text-3xl mb-3">
                    <i className='bx bx-list-check'></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#A0522D] mb-2">Practical Essentials</h3>
                  <p className="text-gray-700 mb-3">
                    Don't forget these practical items:
                  </p>
                  <ul className="space-y-2 ml-5">
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Modest clothing that covers shoulders and knees
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Comfortable shoes that are easy to remove at temples
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      A respectful head covering for sun protection
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      Simple first aid kit and any necessary medications
                    </li>
                    <li className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      A journal to record your experiences and reflections
                    </li>
                  </ul>
                </div>
              </ScrollRevealContainer>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SlideInSection className="py-16 bg-gradient-to-b from-[#FFF8EA] to-[#F5F0E3]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-[#3A2718] mb-6">
            Begin Your Sacred Journey
          </h2>
          <p className="text-xl text-[#5C4033] mb-8 max-w-2xl mx-auto">
            Every Buddhist should visit these sacred sites at least once in their lifetime. Let Buddha Dhaam help support your pilgrimage and the preservation of these sacred places.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/support">
              <Button className="bg-[#D2691E] hover:bg-[#A0522D] text-white px-8 py-3 rounded-md font-bold">
                Support Sacred Sites
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#D2691E] text-[#D2691E] hover:bg-[#D2691E]/10 px-8 py-3 rounded-md font-bold">
                Contact for Pilgrimage Advice
              </Button>
            </Link>
          </div>
        </div>
      </SlideInSection>
    </div>
  );
};

export default SacredMap;