import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WORK_CATEGORIES } from '@/lib/constants';
import PeepalLeaf from '@/assets/icons/PeepalLeaf';
import ScrollRevealContainer from '@/components/animation/ScrollRevealContainer';
import { FadeInSection, SlideInSection, ScaleUpSection } from '@/components/animation/AnimatedSection';
import { motion } from 'framer-motion';
import ParallaxEffect from '@/components/animation/ParallaxEffect';

const OurWork = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories for navigation
  const categories = ['all', 'monks', 'sites', 'traditions'];

  return (
    <div className="bg-orange-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-orange-600 text-white">
        <div className="container mx-auto px-4 pt-32 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">Our Sacred Work</h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Buddha Dhaam's initiatives focus on serving monks, preserving sacred sites, 
              and ensuring the flourishing of teaching of lord buddha
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-10">
              <ScrollRevealContainer effect="fade-up" threshold={0.1}>
                <h2 className="font-heading text-3xl font-bold text-orange-900 mb-6">
                  Buddha Dhaam's Vision
                </h2>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Buddha Dhaam is a non-profit organization dedicated to serving 
                  monks and preserving the sacred teachings of lord buddha. We provide 
                  food, shelter, and medical aid to monks across revered pilgrimage sites 
                  like Bodhgaya, Varanasi, Lumbini, and Kushinagar, ensuring their well-being 
                  while upholding sacred traditions.
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Beyond humanitarian aid, we focus on restoring ancient monasteries and 
                  stupas, planting sacred trees, and organizing Tripitaka chanting 
                  ceremonies to protect heritage of teaching of lord buddha. Our initiatives also include 
                  environmental sustainability, pilgrim support, and global engagement with 
                  the teaching of lord buddha.
                </p>

                <div className="flex items-center">
                  <motion.div 
                    className="text-orange-500 mt-1"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <PeepalLeaf color="#f97316" size={24} />
                  </motion.div>
                  <p className="text-lg text-orange-700 font-medium ml-2">
                    Join us in serving monks, preserving heritage, and sharing wisdom.
                  </p>
                </div>
              </ScrollRevealContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-8">
              <ScrollRevealContainer effect="fade-right" delay={0.1} threshold={0.1}>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 h-full">
                  <h3 className="font-heading text-xl font-bold mb-2 text-orange-900">Our Mission</h3>
                  <p className="text-gray-700">
                    To preserve and protect heritage of teaching of lord buddha across sacred sites while 
                    providing essential support to the monastic community that maintains 
                    these traditions.
                  </p>
                </div>
              </ScrollRevealContainer>
              
              <ScrollRevealContainer effect="fade-left" delay={0.2} threshold={0.1}>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 h-full">
                  <h3 className="font-heading text-xl font-bold mb-2 text-orange-900">Our Approach</h3>
                  <p className="text-gray-700">
                    We take a holistic approach to our work, addressing both the immediate needs 
                    of monks and pilgrims while investing in the long-term preservation of sacred 
                    sites and traditions.
                  </p>
                </div>
              </ScrollRevealContainer>
            </div>
            
            <ParallaxEffect direction="up" speed={0.2} className="overflow-visible">
              <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-6 rounded-lg relative overflow-hidden mb-12 shadow-lg">
                <div className="relative z-10">
                  <h3 className="font-heading text-xl font-bold mb-2 text-orange-900">Our Impact</h3>
                  <p className="text-gray-700 mb-4">
                    Through our initiatives, we have supported over 2,500 monks, restored 6 ancient 
                    sites, and planted more than 108 sacred trees, creating a lasting impact on 
                    the heritage of teaching of lord buddha and the communities that preserve it.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <motion.span 
                      className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >2500+ Monks</motion.span>
                    <motion.span 
                      className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >6 Sacred Sites</motion.span>
                    <motion.span 
                      className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >108+ Trees</motion.span>
                  </div>
                </div>
                <motion.div 
                  className="absolute right-0 bottom-0 opacity-10"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1, 0.95, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <PeepalLeaf color="#000000" size={120} />
                </motion.div>
              </div>
            </ParallaxEffect>
          </div>
        </div>
      </section>

      {/* Work Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-2 text-gray-900">Our Key Initiatives</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-orange-100">
                  <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    All Initiatives
                  </TabsTrigger>
                  <TabsTrigger value="monks" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    Monk Support
                  </TabsTrigger>
                  <TabsTrigger value="sites" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    Sacred Sites
                  </TabsTrigger>
                  <TabsTrigger value="traditions" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    Traditions
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {WORK_CATEGORIES.map((category, index) => (
                    <ScrollRevealContainer 
                      key={index} 
                      effect="fade-up" 
                      delay={index * 0.1} 
                      threshold={0.1}
                    >
                      <div className="bg-orange-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={category.image} 
                            alt={category.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading text-xl font-bold mb-2 text-orange-900">{category.title}</h3>
                          <p className="text-gray-700 mb-4">{category.description}</p>
                          <motion.a 
                            href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-orange-500 font-medium hover:text-orange-600 flex items-center"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            Learn more
                            <i className='bx bx-right-arrow-alt ml-1'></i>
                          </motion.a>
                        </div>
                      </div>
                    </ScrollRevealContainer>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="monks" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {WORK_CATEGORIES.filter(c => 
                    c.title.includes('Food') || c.title.includes('Water') || c.title.includes('Welfare')
                  ).map((category, index) => (
                    <ScrollRevealContainer 
                      key={index} 
                      effect="fade-up" 
                      delay={index * 0.1} 
                      threshold={0.1}
                    >
                      <div className="bg-orange-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={category.image} 
                            alt={category.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading text-xl font-bold mb-2 text-orange-900">{category.title}</h3>
                          <p className="text-gray-700 mb-4">{category.description}</p>
                          <motion.a 
                            href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-orange-500 font-medium hover:text-orange-600 flex items-center"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            Learn more
                            <i className='bx bx-right-arrow-alt ml-1'></i>
                          </motion.a>
                        </div>
                      </div>
                    </ScrollRevealContainer>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="sites" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  
                  {WORK_CATEGORIES.filter(c => 
                    c.title.includes('Stupa') || c.title.includes('Tree') || c.title.includes('Sacred')
                  ).map((category, index) => (
                    <ScrollRevealContainer 
                      key={index} 
                      effect="fade-up" 
                      delay={(index + 1) * 0.1} 
                      threshold={0.1}
                    >
                      <div className="bg-orange-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={category.image} 
                            alt={category.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading text-xl font-bold mb-2 text-orange-900">{category.title}</h3>
                          <p className="text-gray-700 mb-4">{category.description}</p>
                          <motion.a 
                            href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-orange-500 font-medium hover:text-orange-600 flex items-center"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            Learn more
                            <i className='bx bx-right-arrow-alt ml-1'></i>
                          </motion.a>
                        </div>
                      </div>
                    </ScrollRevealContainer>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="traditions" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {WORK_CATEGORIES.filter(c => 
                    c.title.includes('Tripitaka') || c.title.includes('Meditation')
                  ).map((category, index) => (
                    <ScrollRevealContainer 
                      key={index} 
                      effect="fade-up" 
                      delay={index * 0.1} 
                      threshold={0.1}
                    >
                      <div className="bg-orange-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg h-full">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={category.image} 
                            alt={category.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading text-xl font-bold mb-2 text-orange-900">{category.title}</h3>
                          <p className="text-gray-700 mb-4">{category.description}</p>
                          <motion.a 
                            href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-orange-500 font-medium hover:text-orange-600 flex items-center"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            Learn more
                            <i className='bx bx-right-arrow-alt ml-1'></i>
                          </motion.a>
                        </div>
                      </div>
                    </ScrollRevealContainer>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Meditation App Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="font-heading text-3xl font-bold mb-4 text-orange-900">Our Meditation App</h2>
                <p className="text-gray-700 mb-6">
                  Buddha Dhaam helps you track your daily Vipassana practice, keeps you motivated to meditate every day, and is absolutely free to download and use. Experience the benefits of mindfulness through this simple yet powerful application.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="text-orange-500 mt-1 text-xl">
                      <i className='bx bxs-check-circle'></i>
                    </div>
                    <p className="text-gray-700">Guided meditations led by experienced monks</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-orange-500 mt-1 text-xl">
                      <i className='bx bxs-check-circle'></i>
                    </div>
                    <p className="text-gray-700">Daily tracking and progress visualization</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-orange-500 mt-1 text-xl">
                      <i className='bx bxs-check-circle'></i>
                    </div>
                    <p className="text-gray-700">Soothing meditation sounds and timers</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-orange-500 mt-1 text-xl">
                      <i className='bx bxs-check-circle'></i>
                    </div>
                    <p className="text-gray-700">Teachings based on lord buddha's wisdom</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2"
                  >
                    <i className='bx bxl-apple text-2xl'></i>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2"
                  >
                    <i className='bx bxl-play-store text-2xl'></i>
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </motion.button>
                </div>
              </div>
              
              <div className="md:w-1/2 h-96 md:h-auto">
                <img 
                  src="/src/assets/images/buddha-statue.jpg" 
                  alt="Buddha Dhaam Meditation App" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Work Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {WORK_CATEGORIES.map((category, index) => (
              <ScrollRevealContainer 
                key={index}
                effect={index % 2 === 0 ? "fade-right" : "fade-left"}
                delay={0.2}
                threshold={0.1}
              >
                <div 
                  id={category.title.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-16 scroll-mt-32"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <img 
                        src={category.image} 
                        alt={category.title} 
                        className="rounded-lg shadow-lg w-full h-80 object-cover"
                      />
                    </div>
                    
                    <div className="md:w-1/2">
                      <h2 className="font-heading text-2xl font-bold mb-4 text-orange-900">{category.title}</h2>
                      
                      <p className="text-gray-700 mb-4">{category.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <div className="text-orange-500 mt-1">
                            <i className='bx bxs-check-circle'></i>
                          </div>
                          <div className="text-gray-700">
                            {category.title.includes('Food') ? 
                              'Provides nutritious meals to over 500 monks daily' : 
                              category.title.includes('Water') ?
                              'Distributes over 1,000 water bottles daily to pilgrims and monks' :
                              category.title.includes('Stupa') ?
                              'Careful restoration of ancient structures using traditional techniques' :
                              category.title.includes('Tripitaka') ?
                              'Gatherings of hundreds of monks for traditional chanting ceremonies' :
                              category.title.includes('Tree') ?
                              'Planting and maintaining Bodhi trees at sacred sites' :
                              category.title.includes('Welfare') ?
                              'Providing robes, accommodations, and essentials to traveling monks' :
                              'Offering ancient wisdom through modern digital channels'
                            }
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="text-orange-500 mt-1">
                            <i className='bx bxs-check-circle'></i>
                          </div>
                          <div className="text-gray-700">
                            {category.title.includes('Food') ? 
                              'Healthcare support including medical camps and emergency services' : 
                              category.title.includes('Water') ?
                              'Cooling refreshments during hot summer months at pilgrimage sites' :
                              category.title.includes('Stupa') ?
                              'Documentation and preservation of ancient art and carvings related to teaching of lord buddha' :
                              category.title.includes('Tripitaka') ?
                              'Preservation of lord buddha\'s teachings through oral tradition' :
                              category.title.includes('Tree') ?
                              'Educational programs about the significance of sacred trees in teaching of lord buddha' :
                              category.title.includes('Welfare') ?
                              'Support for educational needs and study materials' :
                              'Guided meditations led by experienced monks dedicated to the teaching of lord buddha'
                            }
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="text-orange-500 mt-1">
                            <i className='bx bxs-check-circle'></i>
                          </div>
                          <div className="text-gray-700">
                            {category.title.includes('Food') ? 
                              'Special nutritional support for elderly monks with health concerns' : 
                              category.title.includes('Water') ?
                              'Sustainable practices including reusable bottles and water stations' :
                              category.title.includes('Stupa') ?
                              'Training local craftsmen in traditional restoration techniques' :
                              category.title.includes('Tripitaka') ?
                              'Recording and archiving chanting ceremonies for future generations' :
                              category.title.includes('Tree') ?
                              'Creating green spaces for meditation and reflection' :
                              category.title.includes('Welfare') ?
                              'Community building activities to strengthen monastic bonds' :
                              'Teaching mindfulness practices rooted in the tradition of lord buddha'
                            }
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                          {category.title.includes('Food') ? 'Daily Service' : 
                           category.title.includes('Water') ? 'Pilgrim Support' :
                           category.title.includes('Stupa') ? 'Heritage Preservation' :
                           category.title.includes('Tripitaka') ? 'Spiritual Tradition' :
                           category.title.includes('Tree') ? 'Environmental' :
                           category.title.includes('Welfare') ? 'Monastic Support' :
                           'Digital Dharma'}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                          {category.title.includes('Food') ? 'Monk Welfare' : 
                           category.title.includes('Water') ? 'Hydration' :
                           category.title.includes('Stupa') ? 'Conservation' :
                           category.title.includes('Tripitaka') ? 'Sacred Texts' :
                           category.title.includes('Tree') ? 'Sacred Geography' :
                           category.title.includes('Welfare') ? 'Accommodation' :
                           'Mindfulness'}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                          {category.title.includes('Food') ? 'Healthcare' : 
                           category.title.includes('Water') ? 'Compassion' :
                           category.title.includes('Stupa') ? 'Sacred Sites' :
                           category.title.includes('Tripitaka') ? 'Community' :
                           category.title.includes('Tree') ? 'Sustainability' :
                           category.title.includes('Welfare') ? 'Education' :
                           'Meditation'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollRevealContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">Support Our Sacred Work</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Your contributions help us continue our mission of serving monks, 
            preserving heritage of teaching of lord buddha, and maintaining sacred traditions. Join us 
            in making a lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved">
              <Button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
                Get Involved
              </Button>
            </Link>
            <Link href="/support">
              <Button className="px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition shadow-lg">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWork;