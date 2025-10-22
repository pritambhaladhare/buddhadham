import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import AnimatedButton from '@/components/animation/AnimatedButton';
import { StaggerContainer, StaggerItem } from '@/components/animation/AnimatedSection';
import { useTranslation } from 'react-i18next';


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const menuVariants = {
    hidden: { y: "-100%" },
    visible: { 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25
      }
    },
    exit: { 
      y: "-100%",
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  const decorationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.1, 
      scale: 1,
      transition: { delay: 0.2, duration: 0.5 }
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when menu is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          
          {/* Menu container */}
          <motion.div 
            ref={menuRef}
            className="absolute w-full bg-white shadow-xl z-50 border-b-4 border-orange-500 rounded-b-lg overflow-hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 rounded-full bg-orange-200 opacity-0 -ml-10 -mt-10"
              variants={decorationVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-orange-200 opacity-0 -mr-10 -mb-10"
              variants={decorationVariants}
              initial="hidden"
              animate="visible"
            />
            
            <div className="container mx-auto px-4 py-5 relative z-10">
              {/* Brand header */}
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={onClose}>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <img 
                        src="/logo.png"
                        alt="Buddha Dhaam Logo" 
                        className="w-full h-full object-contain"
                        width="40"
                        height="40"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </motion.div>
                    <h3 className="font-heading text-xl font-bold text-orange-900">
                      {t('common.siteTitle')}
                    </h3>
                  </div>
                </Link>
                <motion.button
                  className="text-orange-800"
                  onClick={onClose}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className='bx bx-x text-2xl'></i>
                </motion.button>
              </div>
              
              {/* Navigation links */}
              <StaggerContainer staggerDelay={0.1}>
                {NAV_LINKS.map((link, index) => (
                  <StaggerItem key={index}>
                    {link.hasDropdown ? (
                      <div>
                        <motion.div 
                          className={`font-body font-medium py-3 border-b border-orange-100 cursor-pointer flex items-center justify-between ${
                            location === link.path ? 'text-orange-500 font-bold' : 'text-orange-800'
                          }`}
                          whileHover={{ 
                            x: 5, 
                            color: "#f97316", 
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Link href={link.path} onClick={onClose}>
                            <span>{link.title}</span>
                          </Link>
                          <i className='bx bx-chevron-down text-lg text-orange-400'></i>
                        </motion.div>
                        
                        <div className="pl-4 bg-orange-50/50">
                          {link.dropdownItems?.map((item, idx) => (
                            <Link key={idx} href={item.path}>
                              <motion.div 
                                className={`font-body font-medium py-2 border-b border-orange-100/50 cursor-pointer flex items-center justify-between ${
                                  location === item.path ? 'text-orange-500' : 'text-orange-700'
                                }`}
                                onClick={onClose}
                                whileHover={{ 
                                  x: 5, 
                                  color: "#f97316", 
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {item.title}
                                {location === item.path && (
                                  <i className='bx bxs-circle text-xs text-orange-400'></i>
                                )}
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link href={link.path}>
                        <motion.div 
                          className={`font-body font-medium py-3 border-b border-orange-100 cursor-pointer flex items-center justify-between ${
                            location === link.path ? 'text-orange-500 font-bold' : 'text-orange-800'
                          }`}
                          onClick={onClose}
                          whileHover={{ 
                            x: 5, 
                            color: "#f97316", 
                            transition: { duration: 0.2 }
                          }}
                        >
                          {link.title}
                          {location === link.path && (
                            <i className='bx bxs-circle text-xs text-orange-400'></i>
                          )}
                        </motion.div>
                      </Link>
                    )}
                  </StaggerItem>
                ))}
                
                <StaggerItem className="mt-6">
                  <Link href="/member-login">
                    <AnimatedButton
                      variant="outline"
                      size="md"
                      className="w-full flex justify-center items-center space-x-2 border-orange-300 text-orange-700 mb-3"
                      onClick={onClose}
                    >
                      <i className='bx bxs-user-circle'></i>
                      <span>{t('common.buttons.memberPortal')}</span>
                    </AnimatedButton>
                  </Link>
                </StaggerItem>
                
                <StaggerItem>
                  <Link href="/support">
                    <AnimatedButton
                      variant="primary"
                      size="md"
                      className="w-full flex justify-center items-center space-x-2 shadow-orange-200/50"
                      onClick={onClose}
                    >
                      <i className='bx bxs-heart'></i>
                      <span>{t('common.buttons.donate')}</span>
                    </AnimatedButton>
                  </Link>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
