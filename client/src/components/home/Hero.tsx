import { Link } from 'wouter';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-white" 
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1598548346543-f2aa5df22527?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <div className="text-orange-400 text-5xl">
            <i className='bx bxs-leaf'></i>
          </div>
        </div>
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Preserving the Sacred <br/>Path of Dhamma
        </h1>
        <p className="font-accent text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-orange-100">
          Supporting monks and preserving Buddha's teachings across ancient sacred sites
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/support">
            <div className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 shadow-lg cursor-pointer">
              Support Our Mission
            </div>
          </Link>
          <Link href="/our-work">
            <div className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded-lg transition duration-300 cursor-pointer">
              Explore Our Work
            </div>
          </Link>
        </div>
        
        <div className="mt-12 p-4 bg-white/10 backdrop-blur-sm rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2">Free Meditation App</h3>
          <p className="mb-4 text-sm">Find peace with our guided Buddhist meditation app</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="flex items-center justify-center bg-black/80 hover:bg-black text-white py-2 px-4 rounded-lg transition">
              <i className='bx bxl-apple text-2xl mr-2'></i>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center justify-center bg-black/80 hover:bg-black text-white py-2 px-4 rounded-lg transition">
              <i className='bx bxl-play-store text-2xl mr-2'></i>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-center space-x-3">
            <span className="h-px w-12 bg-orange-300"></span>
            <span className="text-orange-300"><i className='bx bxs-down-arrow'></i></span>
            <span className="h-px w-12 bg-orange-300"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
