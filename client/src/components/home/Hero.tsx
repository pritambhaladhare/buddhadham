import { Link } from 'wouter';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-white" 
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1617652756418-b701caa63da6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Preserving the Sacred Legacy <br/>of Buddhism
        </h1>
        <p className="font-accent text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Supporting monastic communities and safeguarding Dharma throughout sacred Buddhist sites
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/support">
            <a className="px-8 py-4 bg-[#E67E22] hover:bg-[#C26B1D] text-[#271A10] font-bold rounded-md transition duration-300 shadow-lg">
              Support Our Mission
            </a>
          </Link>
          <Link href="/our-work">
            <a className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded-md transition duration-300">
              Explore Our Work
            </a>
          </Link>
        </div>
        
        <div className="mt-12">
          <div className="flex items-center justify-center space-x-3">
            <span className="h-px w-12 bg-[#D4AF37]"></span>
            <span className="text-[#D4AF37]"><i className='bx bxs-down-arrow'></i></span>
            <span className="h-px w-12 bg-[#D4AF37]"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
