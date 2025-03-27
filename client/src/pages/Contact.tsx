import { useState } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const Contact = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="bg-[#F5F0E3]">
      <div className="pt-32 pb-16 bg-[#3A2718]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="font-accent text-xl text-[#D4AF37] max-w-3xl mx-auto">
              Reach out for inquiries, support, and collaboration opportunities
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-6">Get In Touch</h2>
              <p className="mb-8">
                We welcome your questions, feedback, and inquiries about our work in preserving Buddhist heritage and supporting monastic communities. Please fill out the form, and our team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-[#3A2718] mb-1">Full Name*</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-[#3A2718] mb-1">Email Address*</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-[#3A2718] mb-1">Subject</Label>
                  <Input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-[#3A2718] mb-1">Message*</Label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-3 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-[#F5F0E3] flex items-center justify-center">
                    <i className='bx bxs-map text-2xl text-[#E67E22]'></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-1">Main Office</h3>
                    <p>
                      Buddha Dhaam Foundation<br />
                      123 Dharma Path, Bodhgaya<br />
                      Bihar, India 824231
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-[#F5F0E3] flex items-center justify-center">
                    <i className='bx bxs-phone text-2xl text-[#E67E22]'></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-1">Phone</h3>
                    <p>+91 1234 567 890</p>
                    <p>+91 9876 543 210 (For donations)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-[#F5F0E3] flex items-center justify-center">
                    <i className='bx bxs-envelope text-2xl text-[#E67E22]'></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-1">Email</h3>
                    <p>info@buddhadhaam.org</p>
                    <p>donations@buddhadhaam.org</p>
                    <p>volunteer@buddhadhaam.org</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-[#F5F0E3] flex items-center justify-center">
                    <i className='bx bxs-time text-2xl text-[#E67E22]'></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-1">Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-heading font-bold text-lg text-[#3A2718] mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#F5F0E3] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-[#3A2718]" aria-label="Facebook">
                    <i className='bx bxl-facebook'></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#F5F0E3] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-[#3A2718]" aria-label="Instagram">
                    <i className='bx bxl-instagram'></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#F5F0E3] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-[#3A2718]" aria-label="Twitter">
                    <i className='bx bxl-twitter'></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#F5F0E3] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-[#3A2718]" aria-label="YouTube">
                    <i className='bx bxl-youtube'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Locations" 
            subtitle="Visit us at any of our sacred sites across India and Nepal"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#F5F0E3] rounded-lg overflow-hidden shadow-md">
              <div className="h-48 w-full">
                <div 
                  className="w-full h-full" 
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1590992155694-2f1284eed93e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  role="img"
                  aria-label="Bodhgaya, Bihar"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">Bodhgaya, Bihar</h3>
                <p className="flex items-start mb-2">
                  <i className='bx bxs-map text-[#E67E22] mr-2 mt-1'></i>
                  <span>123 Dharma Path, Near Mahabodhi Temple, Bodhgaya, Bihar 824231</span>
                </p>
                <p className="flex items-center">
                  <i className='bx bxs-phone text-[#E67E22] mr-2'></i>
                  <span>+91 1234 567 890</span>
                </p>
              </div>
            </div>
            
            <div className="bg-[#F5F0E3] rounded-lg overflow-hidden shadow-md">
              <div className="h-48 w-full">
                <div 
                  className="w-full h-full" 
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1602152316903-f667fdc939fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  role="img"
                  aria-label="Varanasi, Uttar Pradesh"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">Varanasi, Uttar Pradesh</h3>
                <p className="flex items-start mb-2">
                  <i className='bx bxs-map text-[#E67E22] mr-2 mt-1'></i>
                  <span>45 Ganga View Road, Near Sarnath, Varanasi, UP 221007</span>
                </p>
                <p className="flex items-center">
                  <i className='bx bxs-phone text-[#E67E22] mr-2'></i>
                  <span>+91 9876 543 210</span>
                </p>
              </div>
            </div>
            
            <div className="bg-[#F5F0E3] rounded-lg overflow-hidden shadow-md">
              <div className="h-48 w-full">
                <div 
                  className="w-full h-full" 
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1588097261233-8be2a23a88f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  role="img"
                  aria-label="Lumbini, Nepal"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">Lumbini, Nepal</h3>
                <p className="flex items-start mb-2">
                  <i className='bx bxs-map text-[#E67E22] mr-2 mt-1'></i>
                  <span>Buddha Birthplace Road, Lumbini Gardens, Lumbini, Nepal</span>
                </p>
                <p className="flex items-center">
                  <i className='bx bxs-phone text-[#E67E22] mr-2'></i>
                  <span>+977 71 580124</span>
                </p>
              </div>
            </div>
            
            <div className="bg-[#F5F0E3] rounded-lg overflow-hidden shadow-md">
              <div className="h-48 w-full">
                <div 
                  className="w-full h-full" 
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1552206092-d02a2644c752?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  role="img"
                  aria-label="Kushinagar, Uttar Pradesh"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">Kushinagar, Uttar Pradesh</h3>
                <p className="flex items-start mb-2">
                  <i className='bx bxs-map text-[#E67E22] mr-2 mt-1'></i>
                  <span>78 Mahaparinirvana Path, Near Nirvana Stupa, Kushinagar, UP 274403</span>
                </p>
                <p className="flex items-center">
                  <i className='bx bxs-phone text-[#E67E22] mr-2'></i>
                  <span>+91 5564 273890</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-[#3A2718] mb-4">Frequently Asked Questions</h2>
            <p className="mb-8">Find answers to commonly asked questions about Buddha Dhaam and our work.</p>
            
            <div className="space-y-6 text-left">
              <div className="border-b border-[#3A2718]/10 pb-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">How can I donate to Buddha Dhaam?</h3>
                <p>You can donate through our website's Support Us page, by bank transfer, or by sending a check to our main office in Bodhgaya. All donations are tax-deductible.</p>
              </div>
              
              <div className="border-b border-[#3A2718]/10 pb-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">Can I volunteer if I don't have a Buddhist background?</h3>
                <p>Absolutely! We welcome volunteers from all backgrounds and faiths who share our commitment to preserving Buddhist heritage and supporting monastic communities.</p>
              </div>
              
              <div className="border-b border-[#3A2718]/10 pb-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">How are donations utilized?</h3>
                <p>Donations directly support our programs, including food and medical aid for monks, monastery restoration projects, tree planting initiatives, and educational resources. Our annual reports provide detailed breakdowns of fund allocation.</p>
              </div>
              
              <div className="border-b border-[#3A2718]/10 pb-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">Can my organization partner with Buddha Dhaam?</h3>
                <p>Yes, we welcome partnerships with organizations that share our values. Please contact us at partnerships@buddhadhaam.org to discuss potential collaboration opportunities.</p>
              </div>
              
              <div>
                <h3 className="font-heading text-xl font-bold text-[#3A2718] mb-2">Do you offer tours of Buddhist sites?</h3>
                <p>While we don't directly organize tours, we can provide recommendations and resources for visiting sacred Buddhist sites. Our staff at each location can also offer guidance to visitors.</p>
              </div>
            </div>
            
            <p className="mt-8 text-[#9D2933] font-medium">
              Have another question? <a href="#" className="underline">Contact us</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
