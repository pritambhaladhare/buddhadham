import { Link } from 'wouter';
import { NAV_LINKS, LOCATIONS } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="bg-[#3A2718] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/">
              <a className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D4AF37]">
                  <span className="text-[#271A10] text-xl"><i className='bx bxs-leaf'></i></span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">Buddha Dhaam</h3>
                  <p className="text-xs text-[#D4AF37] italic">Serving Monks, Preserving Dharma</p>
                </div>
              </a>
            </Link>
            <p className="mb-6 text-[#EAE0C9]">
              Dedicated to preserving Buddhist heritage and supporting monastic communities across sacred sites in India and Nepal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#5D4230] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition" aria-label="Facebook">
                <i className='bx bxl-facebook'></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#5D4230] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition" aria-label="Instagram">
                <i className='bx bxl-instagram'></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#5D4230] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition" aria-label="Twitter">
                <i className='bx bxl-twitter'></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#5D4230] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition" aria-label="YouTube">
                <i className='bx bxl-youtube'></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-[#D4AF37] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link, index) => (
                <li key={index}>
                  <Link href={link.path}>
                    <a className="text-[#F5F0E3] hover:text-[#D4AF37] transition">{link.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-[#D4AF37] mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className='bx bxs-map text-[#E67E22] mr-2 mt-1'></i>
                <span>
                  Buddha Dhaam Foundation<br />
                  123 Dharma Path, Bodhgaya<br />
                  Bihar, India 824231
                </span>
              </li>
              <li className="flex items-center">
                <i className='bx bxs-phone text-[#E67E22] mr-2'></i>
                <span>+91 1234 567 890</span>
              </li>
              <li className="flex items-center">
                <i className='bx bxs-envelope text-[#E67E22] mr-2'></i>
                <span>info@buddhadhaam.org</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-bold text-[#D4AF37] mb-6">Our Locations</h4>
            <ul className="space-y-3">
              {LOCATIONS.map((location, index) => (
                <li key={index} className="flex items-start">
                  <i className='bx bxs-location-plus text-[#E67E22] mr-2 mt-1'></i>
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#5D4230] text-center text-sm text-[#EAE0C9]">
          <p>&copy; {new Date().getFullYear()} Buddha Dhaam Foundation. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-[#D4AF37] transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-[#D4AF37] transition">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-[#D4AF37] transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
