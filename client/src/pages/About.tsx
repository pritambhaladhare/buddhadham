import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import mahabodhiTemple from '@assets/about_temple.jpg';
import namitaFounder from '@assets/about_namita.png';
import kumarHead from '@assets/about_kumar.png';

const About = () => {
  return (
    <div className="bg-orange-50 text-gray-800">
      {/* Hero Section with Banner */}
      <div className="bg-orange-600 text-white">
        <div className="container mx-auto px-4 pt-32 pb-12 text-center">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">Our Mission & Vision</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">Serving monks and preserving Buddhist heritage</p>
        </div>
      </div>
      
      {/* Main content section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            {/* Text content */}
            <div className="lg:w-1/2">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-8 leading-tight text-gray-900 flex items-center">
                <span className="text-orange-500 mr-2">
                  <i className='bx bxs-dharma-wheel text-3xl'></i>
                </span>
                Buddha Dhaam's Vision
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Buddha Dhaam is a non-profit organization dedicated to serving monks and preserving the sacred teachings of lord buddha. We provide food, shelter, and medical aid to monks across revered pilgrimage sites like Bodhgaya, Varanasi, Lumbini, and Kushinagar, ensuring their well-being while upholding sacred traditions.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  We focus on restoring ancient monasteries and stupas, planting sacred trees, and organizing Tripitaka chanting ceremonies to protect the heritage of teaching of lord buddha. Our initiatives also include environmental sustainability, pilgrim support, and global spiritual engagement.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  By donating, volunteering, or partnering with us, you become a part of a compassionate movement dedicated to ensuring the Buddha's wisdom flourishes for generations to come. Join us in serving monks, preserving Dharma, and making a lasting impact.
                </p>
                
                <div className="pt-6">
                  <Link href="/get-involved">
                    <Button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 shadow-md">
                      🌿 Support our mission today!
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="lg:w-1/2 relative mt-10 lg:mt-0">
              <img 
                src={mahabodhiTemple} 
                alt="Mahabodhi Temple - Buddha's Sacred Enlightenment Site" 
                className="rounded-2xl shadow-xl w-full object-cover z-10 relative"
                style={{ height: "560px" }}
              />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 rounded-full opacity-50 -mr-8 -mt-8 z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200 rounded-full opacity-70 z-0"></div>
              <div className="absolute top-1/3 -left-6 w-12 h-12 bg-pink-200 rounded-full opacity-60 z-0"></div>
              
              {/* Caption */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm z-20">
                Mahabodhi Temple, Bodhgaya - Site of Buddha's Enlightenment
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold mb-2 text-gray-900">Our Leadership</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          {/* Namita Bhaladhare - Founder */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className="md:w-1/3">
              <div className="relative">
                <img 
                  src={namitaFounder} 
                  alt="Namita Bhaladhare – Founder, Buddha Dhaam" 
                  className="rounded-lg shadow-lg mx-auto"
                />
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-orange-100 rounded-full opacity-70 -z-10"></div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="font-heading text-2xl font-bold mb-2 text-orange-900">Namita Bhaladhare – Founder, Buddha Dhaam</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  I feel deeply grateful to have the opportunity to serve the Buddha and support the monastic community. Buddha Dhaam is not just an initiative—it is a heartfelt devotion, a way for me to contribute to the preservation of the Dhamma and give back to those who dedicate their lives to spiritual practice.
                </p>
                <p>
                  With a humble commitment to this path, I strive to ensure that monks receive the care they need, sacred sites are protected, and Buddhist traditions continue to thrive. This work is only possible with the kindness and support of many, and I am honored to walk this journey alongside all those who share in this mission.
                </p>
                <div className="pt-4 flex space-x-4">
                  <a href="https://www.linkedin.com/in/namitabhaladhare/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
                    <i className='bx bxl-linkedin text-2xl'></i>
                  </a>
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <i className='bx bxl-twitter text-2xl'></i>
                  </a>
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <i className='bx bx-envelope text-2xl'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kumar Saurav Murti - Operations Head */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="md:w-1/3">
              <div className="relative">
                <img 
                  src={kumarHead} 
                  alt="Kumar Saurav Murti – Operations Head, Buddha Dhaam" 
                  className="rounded-lg shadow-lg mx-auto"
                />
                <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-orange-100 rounded-full opacity-70 -z-10"></div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="font-heading text-2xl font-bold mb-2 text-orange-900">Kumar Saurav Murti – Operations Head</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  I hold two master's degrees: an MSW from Central University of South Bihar and an MA in Sociology from the same institution. As a professional social worker, I possess a deep understanding of how to serve society with a positive approach.
                </p>
                <p>
                  I am grateful for the opportunity to serve the Buddhist monk community at Bodhgaya. My primary goal is to drive positive change in society and improve the lives of underprivileged communities near the Mahabodhi Temple. I am committed to making a meaningful impact through my work.
                </p>
                <div className="pt-4 flex space-x-4">
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <i className='bx bxl-linkedin text-2xl'></i>
                  </a>
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <i className='bx bx-envelope text-2xl'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Work Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold mb-2 text-gray-900">Our Sacred Work</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-gray-700 leading-relaxed">
              Our work is rooted in the Buddha's teachings of compassion and service, focusing exclusively on supporting 
              monks and preserving the sacred places where teaching of lord buddha flourishes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-orange-500 text-3xl mb-4 flex justify-center">
                <i className='bx bxs-bowl-rice'></i>
              </div>
              <h3 className="font-heading text-xl font-bold mb-2 text-orange-900 text-center">Food & Medical Aid</h3>
              <p className="text-gray-700 text-center">
                Providing daily nutritious meals, medicine, and healthcare support to resident and traveling monks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-orange-500 text-3xl mb-4 flex justify-center">
                <i className='bx bxs-droplet'></i>
              </div>
              <h3 className="font-heading text-xl font-bold mb-2 text-orange-900 text-center">Water Distribution</h3>
              <p className="text-gray-700 text-center">
                Offering clean water and refreshments to pilgrims and monks at Mahabodhi Temple.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-orange-500 text-3xl mb-4 flex justify-center">
                <i className='bx bxs-temple'></i>
              </div>
              <h3 className="font-heading text-xl font-bold mb-2 text-orange-900 text-center">Stupa Restoration</h3>
              <p className="text-gray-700 text-center">
                Preserving ancient stupas and monasteries to maintain sacred heritage of lord buddha.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-orange-500 text-3xl mb-4 flex justify-center">
                <i className='bx bxs-book-open'></i>
              </div>
              <h3 className="font-heading text-xl font-bold mb-2 text-orange-900 text-center">Tripitaka Chanting</h3>
              <p className="text-gray-700 text-center">
                Organizing large-scale recitations of sacred texts to preserve spiritual traditions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-orange-500 text-3xl mb-4 flex justify-center">
                <i className='bx bxs-tree'></i>
              </div>
              <h3 className="font-heading text-xl font-bold mb-2 text-orange-900 text-center">Sacred Tree Planting</h3>
              <p className="text-gray-700 text-center">
                Planting and caring for Bodhi trees while enhancing pilgrimage sites.
              </p>
            </div>
            
          </div>
          
          <div className="text-center mt-10">
            <Link href="/our-work">
              <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition shadow-md">
                Explore All Our Initiatives
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Join Our Mission Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">Become a part of our compassionate mission</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Whether through donations, volunteering, or partnerships, there are many ways to help preserve heritage of lord buddha and support those who dedicate their lives to following the path of dhamma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved">
              <Button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
                Get Involved Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
