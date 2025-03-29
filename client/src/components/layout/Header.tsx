import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '@/lib/constants';
import MobileMenu from './MobileMenu';
import PeepalLeaf from '@/assets/icons/PeepalLeaf';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AnimatedButton from '@/components/animation/AnimatedButton';
import SimplifiedMantraText from '@/components/animation/SimplifiedMantraText';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerScale = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["0px 0px 0px rgba(0, 0, 0, 0)", "0px 5px 15px rgba(0, 0, 0, 0.05)"]
  );

  // Monitor scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Animation variants
  const logoVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: [0, 15, 0, -15, 0], 
      transition: { 
        duration: 1,
        ease: "easeInOut"
      }
    }
  };
  
  const navLinkVariants = {
    initial: { y: 0 },
    hover: { y: -2 }
  };
  
  const activeIndicatorVariants = {
    initial: { width: 0, opacity: 0 },
    active: { 
      width: '100%', 
      opacity: 1,
      transition: { duration: 0.3 } 
    }
  };
  
  const mobileMenuButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 10 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative">
      {/* Mantra banner */}
      <div className="bg-orange-100 py-2">
        <SimplifiedMantraText 
          text="Buddham saranam gacchami, dhammam saranam gacchami, sangham saranam gacchami"
          color="#ea580c"
          className="text-lg font-medium"
        />
      </div>
    
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 bg-white/95 backdrop-blur-sm' : 'py-3 bg-white'
        } border-b border-orange-100`}
        style={{ 
          opacity: headerOpacity,
          scale: headerScale,
          boxShadow: headerShadow
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer"
                initial="initial"
                whileHover="hover"
              >
                <motion.div 
                  className="w-12 h-12 flex items-center justify-center"
                  variants={logoVariants}
                >
                  <PeepalLeaf color="#f97316" size={36} />
                </motion.div>
                <div>
                  <motion.h1 
                    className="font-heading text-2xl font-bold text-orange-900"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {t('common.siteTitle')}
                  </motion.h1>
                  <motion.p 
                    className="text-xs text-orange-600 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {t('common.tagline')}
                  </motion.p>
                </div>
              </motion.div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {NAV_LINKS.map((link, index) => (
                <Link key={index} href={link.path}>
                  <motion.div
                    className="cursor-pointer relative py-2"
                    variants={navLinkVariants}
                    initial="initial"
                    whileHover="hover"
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className={`nav-link font-body font-medium ${
                      location === link.path ? 'text-orange-500' : 'text-orange-800'
                    }`}>
                      {link.title}
                    </span>
                    
                    {/* Active indicator line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-orange-500 rounded-full"
                      initial="initial"
                      animate={location === link.path ? "active" : "initial"}
                      variants={activeIndicatorVariants}
                    />
                  </motion.div>
                </Link>
              ))}
            </nav>
            
            <motion.button 
              className="md:hidden text-orange-800" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              variants={mobileMenuButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <i className='bx bx-menu text-2xl'></i>
            </motion.button>
            
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              
              <Link href="/member-login">
                <div>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    <span className="flex items-center">
                      <i className='bx bxs-user-circle text-lg mr-1'></i> {t('common.buttons.memberPortal')}
                    </span>
                  </AnimatedButton>
                </div>
              </Link>
              
              <Link href="/support">
                <div>
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    className="shadow-orange-200/50"
                  >
                    <span className="flex items-center">
                      <i className='bx bxs-heart text-lg mr-1'></i> {t('common.buttons.donate')}
                    </span>
                  </AnimatedButton>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default Header;