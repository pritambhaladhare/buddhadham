import { useState, useEffect } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';

const Contact = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact/send', contactForm);
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      
      // Reset form
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Message not sent",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-[#F5F0E3]">
      <div className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-r from-[#4A3620] to-[#3A2718]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full opacity-5">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              {Array.from({ length: 10 }).map((_, i) => (
                <path
                  key={i}
                  d={`M0,${i * 10} L100,${i * 10}`}
                  stroke="white"
                  strokeWidth="0.2"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <path
                  key={i + 10}
                  d={`M${i * 10},0 L${i * 10},100`}
                  stroke="white"
                  strokeWidth="0.2"
                />
              ))}
            </svg>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container relative mx-auto px-4 z-10"
        >
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="font-accent text-xl text-[#D4AF37] max-w-3xl mx-auto">
              Reach out for inquiries, support, and collaboration opportunities
            </p>
          </div>
        </motion.div>
      </div>
      
      <section id="contact-form" className="py-16 relative">
        <div className="absolute -top-10 left-0 right-0 h-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNGNUYwRTMiPjxwYXRoIGQ9Ik0xMjgwIDBIMFYxNDBMMTI4MCAxNDBWMFoiLz48L2c+PC9zdmc+')]"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#D4AF37] to-[#9D2933]" />
              
              <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-6">Get In Touch</h2>
              <p className="mb-8 text-[#5C4033]">
                We welcome your questions, feedback, and inquiries about our work in preserving Buddhist heritage and supporting monastic communities. Please fill out the form, and our team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="name" className="block text-sm font-medium text-[#3A2718] mb-1">Full Name*</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="email" className="block text-sm font-medium text-[#3A2718] mb-1">Email Address*</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="subject" className="block text-sm font-medium text-[#3A2718] mb-1">Subject</Label>
                  <Input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="message" className="block text-sm font-medium text-[#3A2718] mb-1">Message*</Label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full py-3 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[#D4AF37] to-[#9D2933]" />
              
              <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-8">Connect With Us</h2>
              
              <div className="space-y-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start space-x-5"
                >
                  <div className="h-14 w-14 rounded-full bg-[#FFF8EA] flex items-center justify-center shadow-md">
                    <i className='bx bxl-whatsapp text-3xl text-[#D4AF37]'></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-1">WhatsApp Us</h3>
                    <p className="text-[#5C4033]">+91 1234 567 890</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start space-x-5"
                >
                  <div className="h-14 w-14 rounded-full bg-[#FFF8EA] flex items-center justify-center shadow-md">
                    <i className='bx bxs-envelope text-3xl text-[#D4AF37]'></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-1">Email</h3>
                    <p className="text-[#5C4033]">info@buddhadhaam.org</p>
                  </div>
                </motion.div>
                
                <div className="mt-12">
                  <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-4">Follow Us</h3>
                  <div className="flex space-x-5">
                    <motion.a 
                      whileHover={{ y: -5, scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      href="#" 
                      className="h-12 w-12 rounded-full bg-[#FFF8EA] flex items-center justify-center shadow-md hover:bg-[#D4AF37] hover:text-white transition-all text-[#3A2718]" 
                      aria-label="Facebook"
                    >
                      <i className='bx bxl-facebook text-xl'></i>
                    </motion.a>
                    <motion.a 
                      whileHover={{ y: -5, scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      href="#" 
                      className="h-12 w-12 rounded-full bg-[#FFF8EA] flex items-center justify-center shadow-md hover:bg-[#D4AF37] hover:text-white transition-all text-[#3A2718]" 
                      aria-label="Instagram"
                    >
                      <i className='bx bxl-instagram text-xl'></i>
                    </motion.a>
                    <motion.a 
                      whileHover={{ y: -5, scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      href="#" 
                      className="h-12 w-12 rounded-full bg-[#FFF8EA] flex items-center justify-center shadow-md hover:bg-[#D4AF37] hover:text-white transition-all text-[#3A2718]" 
                      aria-label="Twitter"
                    >
                      <i className='bx bxl-twitter text-xl'></i>
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -5, scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      href="#" 
                      className="h-12 w-12 rounded-full bg-[#FFF8EA] flex items-center justify-center shadow-md hover:bg-[#D4AF37] hover:text-white transition-all text-[#3A2718]" 
                      aria-label="YouTube"
                    >
                      <i className='bx bxl-youtube text-xl'></i>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      

      
      <section className="py-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="container mx-auto px-4 max-w-4xl"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#9D2933]"></div>
            
            <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-4">Frequently Asked Questions</h2>
            <p className="mb-10 text-[#5C4033]">Find answers to commonly asked questions about Buddha Dhaam and our work.</p>
            
            <div className="space-y-4 text-left">
              {[
                {
                  question: "How can I donate to Buddha Dhaam?",
                  answer: "You can donate through our website's Support Us page, by online payment or bank transfer. All donations are tax-deductible."
                },
                {
                  question: "Can I volunteer if I don't have a Buddhist background?",
                  answer: "Absolutely! We welcome volunteers from all backgrounds and faiths who share our commitment to preserving Buddhist heritage and supporting monastic communities."
                },
                {
                  question: "How are donations utilized?",
                  answer: "Donations directly support our programs, including food and medical aid for monks, monastery preservation projects, tree planting initiatives, and educational resources. Our annual reports provide detailed breakdowns of fund allocation."
                },
                {
                  question: "Can my organization partner with Buddha Dhaam?",
                  answer: "Yes, we welcome partnerships with organizations that share our values. Please contact us at info@buddhadhaam.org to discuss potential collaboration opportunities."
                },
                {
                  question: "Do you offer tours of Buddhist sites?",
                  answer: "While we don't directly organize tours, we can provide recommendations and resources for visiting sacred Buddhist sites. Our staff at each location can also offer guidance to visitors."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="border border-[#3A2718]/10 rounded-lg overflow-hidden bg-[#FFF8EA]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-[#FFF8EA] transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="font-heading text-xl font-bold text-[#3A2718]">
                      {faq.question}
                    </h3>
                    <div className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                      <i className='bx bx-chevron-down text-2xl text-[#D4AF37]'></i>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeFaq === index ? 'auto' : 0,
                      opacity: activeFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-[#3A2718]/10">
                      <p className="text-[#5C4033]">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              className="mt-10 text-[#9D2933] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Have another question? <a href="#contact-form" className="underline hover:text-[#D4AF37] transition-colors">Contact us</a>
            </motion.p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
