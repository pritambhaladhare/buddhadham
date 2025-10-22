import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  title: string;
  path: string;
}

interface DropdownMenuProps {
  trigger: string;
  items: DropdownItem[];
  isActive?: boolean;
}

const DropdownMenu = ({ trigger, items, isActive = false }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const navLinkVariants = {
    initial: { y: 0 },
    hover: { y: -2 }
  };

  return (
    <div ref={dropdownRef} className="relative py-2">
      <motion.div
        className="cursor-pointer relative flex items-center"
        variants={navLinkVariants}
        initial="initial"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`nav-link font-body font-medium ${
          isActive ? 'text-orange-500' : 'text-orange-800'
        }`}>
          {trigger}
        </span>
        <i className={`bx ${isOpen ? 'bx-chevron-up' : 'bx-chevron-down'} ml-1 text-xs transition-transform duration-200`}></i>
        
        {/* Active indicator line */}
        {isActive && (
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-orange-500 rounded-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-2 min-w-[200px] z-50 border border-orange-100"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {items.map((item, index) => (
              <Link key={index} href={item.path}>
                <div 
                  className="block px-4 py-2 text-sm text-orange-800 hover:bg-orange-50 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;