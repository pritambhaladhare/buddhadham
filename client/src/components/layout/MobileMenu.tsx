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
      className={`absolute w-full bg-[#F5F0E3] shadow-lg z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'transform translate-y-0' : 'transform -translate-y-full hidden'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
        {NAV_LINKS.map((link, index) => (
          <Link key={index} href={link.path}>
            <a 
              className={`font-body font-medium py-2 border-b border-[#3A2718]/10 ${
                location === link.path ? 'text-[#9D2933]' : 'text-[#3A2718] hover:text-[#9D2933]'
              } transition`}
              onClick={onClose}
            >
              {link.title}
            </a>
          </Link>
        ))}
        
        <Link href="/support">
          <a
            className="w-full py-3 bg-[#9D2933] text-white font-medium rounded-md hover:bg-[#7D1F29] transition shadow-md text-center"
            onClick={onClose}
          >
            Donate Now
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
