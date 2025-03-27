import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative bg-[#F5F0E3]">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D4AF37]">
                <span className="text-[#271A10] text-xl"><i className='bx bxs-leaf'></i></span>
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-[#3A2718]">Buddha Dhaam</h1>
                <p className="text-xs text-[#9D2933] italic">Serving Monks, Preserving Dharma</p>
              </div>
            </a>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            {NAV_LINKS.map((link, index) => (
              <Link key={index} href={link.path}>
                <a className={`nav-link font-body font-medium text-[#3A2718] hover:text-[#9D2933] transition
                  ${location === link.path ? 'after:w-full' : 'after:w-0'}
                  relative after:content-[''] after:block after:h-0.5 after:bg-[#D4AF37] after:transition-all after:duration-300`}>
                  {link.title}
                </a>
              </Link>
            ))}
          </nav>
          
          <button 
            className="md:hidden text-[#3A2718]" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className='bx bx-menu text-2xl'></i>
          </button>
          
          <Link href="/support">
            <a className="hidden md:block px-5 py-2 bg-[#9D2933] text-white font-medium rounded-md hover:bg-[#7D1F29] transition shadow-md">
              Donate Now
            </a>
          </Link>
        </div>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
