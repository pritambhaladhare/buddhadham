import { Link } from 'wouter';

const Hero = () => {
  return (
    <section className="min-h-screen bg-orange-50 text-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="mb-4 inline-block">
              <div className="text-orange-500 text-4xl">
                <i className='bx bxs-lotus'></i>
              </div>
            </div>
            
            <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
              Serving monks and<br/>preserving dhamma
            </h1>
            
            <p className="text-xl max-w-xl mx-auto lg:mx-0 mb-8 text-gray-600">
              Feel like your best self with meditations, stress-relieving exercises, sleep resources, and beyond.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Link href="/get-involved">
                <div className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 shadow-md cursor-pointer">
                  Get Involved
                </div>
              </Link>
              <a href="#" className="px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-lg transition duration-300 shadow-md cursor-pointer">
                Try Free Meditation
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              <a href="#" className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg transition">
                <i className='bx bxl-apple text-2xl mr-2'></i>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg transition">
                <i className='bx bxl-play-store text-2xl mr-2'></i>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Right content - Phone mockups */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Main phone */}
              <div className="w-72 mx-auto lg:mx-0 lg:ml-auto relative z-10">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-gray-100">
                  <div className="bg-orange-500 h-16 flex items-center justify-center">
                    <span className="text-white font-bold">Buddha Dhaam</span>
                  </div>
                  <div className="p-4">
                    <div className="bg-orange-100 rounded-lg p-3 mb-3">
                      <h4 className="font-bold text-sm mb-1">Morning Meditation</h4>
                      <p className="text-xs text-gray-700">15 minutes of guided practice</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 mb-3">
                      <h4 className="font-bold text-sm mb-1">Mindful Breathing</h4>
                      <p className="text-xs text-gray-700">10 minutes to center yourself</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <h4 className="font-bold text-sm mb-1">Evening Relaxation</h4>
                      <p className="text-xs text-gray-700">Prepare for restful sleep</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 rounded-full opacity-70 -mr-8 -mt-8 hidden lg:block"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-300 rounded-full opacity-70 -ml-10 -mb-10 hidden lg:block"></div>
              <div className="absolute top-1/4 left-0 w-8 h-8 bg-pink-300 rounded-full opacity-70 -ml-4 hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
