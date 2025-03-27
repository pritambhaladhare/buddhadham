import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="bg-orange-50 text-gray-800">
      {/* Hero Section with Navigation tabs */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 pt-32 pb-4">
          <div className="flex flex-wrap gap-8 text-sm font-medium">
            <div className="border-b-2 border-orange-500 pb-2 text-orange-500">About Us</div>
            <div className="pb-2 hover:text-orange-500 cursor-pointer">Leadership</div>
            <div className="pb-2 hover:text-orange-500 cursor-pointer">Our Impact</div>
            <div className="pb-2 hover:text-orange-500 cursor-pointer">Sacred Sites</div>
          </div>
        </div>
      </div>
      
      {/* Main content section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            {/* Text content */}
            <div className="lg:w-1/2">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-8 leading-tight text-gray-900">
                It's not about what we do.<br />
                It's about how we serve.
              </h1>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Buddha Dhaam is a non-profit organization dedicated to serving Buddhist monks and preserving the sacred teachings of the Dharma. We provide food, shelter, and medical aid to monks across revered pilgrimage sites like Bodhgaya, Varanasi, Lumbini, and Kushinagar, ensuring their well-being while upholding Buddhist traditions.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Beyond humanitarian aid, we focus on restoring ancient monasteries and stupas, planting sacred trees, and organizing Tripitaka chanting ceremonies to protect Buddhist heritage. Our initiatives also include environmental sustainability, pilgrim support, and global Buddhist engagement.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  By donating, volunteering, or partnering with us, you become a part of a compassionate movement dedicated to ensuring the Buddha's wisdom flourishes for generations to come. Join us in serving monks, preserving Dharma, and making a lasting impact.
                </p>
                
                <div className="pt-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <div className="text-orange-500 mt-1.5"><i className='bx bxs-leaf'></i></div>
                      <div>
                        <strong className="font-medium">Monks</strong>: By supporting 2500+ monks with food, shelter, healthcare, and education.
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="text-orange-500 mt-1.5"><i className='bx bxs-temple'></i></div>
                      <div>
                        <strong className="font-medium">Sacred Sites</strong>: Through preserving and restoring 6 ancient monasteries and sacred sites.
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="text-orange-500 mt-1.5"><i className='bx bxs-tree'></i></div>
                      <div>
                        <strong className="font-medium">Environment</strong>: With 108 plantation projects to protect the sacred landscapes.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Link href="/get-involved">
                    <Button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 shadow-md">
                      Support Our Mission 🌿
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="lg:w-1/2 relative mt-10 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1627040582828-096d87d6ec68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Buddhist monks at a monastery" 
                className="rounded-2xl shadow-xl w-full object-cover z-10 relative"
                style={{ height: "500px" }}
              />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 rounded-full opacity-50 -mr-8 -mt-8 z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200 rounded-full opacity-70 z-0"></div>
              <div className="absolute top-1/3 -left-6 w-12 h-12 bg-pink-200 rounded-full opacity-60 z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Mission Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">Become a part of our compassionate mission</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Whether through donations, volunteering, or partnerships, there are many ways to help preserve Buddhist heritage and support those who dedicate their lives to the Dharma.
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
