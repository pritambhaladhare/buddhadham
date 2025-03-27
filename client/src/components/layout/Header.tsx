import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';
import MobileMenu from './MobileMenu';
import PeepalLeaf from '@/assets/icons/PeepalLeaf';

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative bg-white border-b border-orange-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <div className="w-12 h-12 flex items-center justify-center">
                <PeepalLeaf color="#f97316" size={36} />
              </div>
            </Link>
            <div>
              <h1 className="font-heading text-2xl font-bold text-orange-900">Buddha Dhaam</h1>
              <p className="text-xs text-orange-600 italic">Serving Monks, Preserving Dharma</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link, index) => (
              <Link key={index} href={link.path}>
                <span className={`nav-link font-body font-medium text-orange-800 hover:text-orange-500 transition cursor-pointer
                  ${location === link.path ? 'text-orange-500 font-bold' : ''}
                  relative`}>
                  {link.title}
                </span>
              </Link>
            ))}
          </nav>
          
          <button 
            className="md:hidden text-orange-800" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className='bx bx-menu text-2xl'></i>
          </button>
          
          <Link href="/support">
            <span className="hidden md:block px-5 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition shadow-md cursor-pointer">
              Donate Now
            </span>
          </Link>
        </div>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
