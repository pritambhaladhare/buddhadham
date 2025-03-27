import { Link } from 'wouter';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-white" 
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1560942485-b2a11cc13456?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
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
        
        <div className="mt-16">
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
