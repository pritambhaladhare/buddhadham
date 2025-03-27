import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  return (
    <div 
      ref={menuRef}
      className={`absolute w-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'transform translate-y-0' : 'transform -translate-y-full hidden'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
        {NAV_LINKS.map((link, index) => (
          <Link key={index} href={link.path}>
            <div 
              className={`font-body font-medium py-2 border-b border-orange-100 cursor-pointer ${
                location === link.path ? 'text-orange-500 font-bold' : 'text-orange-800 hover:text-orange-500'
              } transition`}
              onClick={onClose}
            >
              {link.title}
            </div>
          </Link>
        ))}
        
        <Link href="/support">
          <div
            className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition shadow-md text-center cursor-pointer"
            onClick={onClose}
          >
            Donate Now
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
