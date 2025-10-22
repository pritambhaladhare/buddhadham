import { useState } from 'react';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const GetInvolved = () => {
  const { toast } = useToast();
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    interests: {
      foodSupport: false,
      restoration: false,
      events: false,
      environmental: false,
      administrative: false
    },
    availability: "",
    experience: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: keyof typeof volunteerForm.interests) => {
    setVolunteerForm(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [name]: !prev.interests[name]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!volunteerForm.name || !volunteerForm.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/volunteer/apply', volunteerForm);
      
      toast({
        title: "Application submitted!",
        description: "Thank you for volunteering. We'll be in touch soon.",
      });
      
      // Reset form
      setVolunteerForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        interests: {
          foodSupport: false,
          restoration: false,
          events: false,
          environmental: false,
          administrative: false
        },
        availability: "",
        experience: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
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
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Get Involved</h1>
            <p className="font-accent text-xl text-[#D4AF37] max-w-3xl mx-auto">
              Join our mission to preserve Buddhist heritage and support monastic communities
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Ways to Get Involved" 
            subtitle="There are many ways you can contribute to our sacred mission"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-3 bg-[#E67E22]"></div>
              <div className="p-8">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#E67E22]/10 flex items-center justify-center">
                  <i className='bx bxs-hand-up text-3xl text-[#E67E22]'></i>
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4 text-center">Volunteer</h3>
                <p className="mb-6 text-center">Offer your time and skills to support our programs in sacred Buddhist sites.</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#E67E22] mr-2 mt-1'></i>
                    <span>Help with food distribution to monks</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#E67E22] mr-2 mt-1'></i>
                    <span>Assist with monastery preservation projects</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#E67E22] mr-2 mt-1'></i>
                    <span>Support sacred tree planting initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#E67E22] mr-2 mt-1'></i>
                    <span>Provide administrative assistance</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-3 bg-[#9D2933]"></div>
              <div className="p-8">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#9D2933]/10 flex items-center justify-center">
                  <i className='bx bxs-donate-heart text-3xl text-[#9D2933]'></i>
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4 text-center">Partner With Us</h3>
                <p className="mb-6 text-center">Establish a partnership between your organization and Buddha Dhaam.</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#9D2933] mr-2 mt-1'></i>
                    <span>Corporate sponsorship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#9D2933] mr-2 mt-1'></i>
                    <span>Co-branded water bottle initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#9D2933] mr-2 mt-1'></i>
                    <span>Event sponsorship</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#9D2933] mr-2 mt-1'></i>
                    <span>Site preservation project partnerships</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-3 bg-[#D4AF37]"></div>
              <div className="p-8">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <i className='bx bxs-megaphone text-3xl text-[#D4AF37]'></i>
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4 text-center">Spread Awareness</h3>
                <p className="mb-6 text-center">Help us share the message of Buddhist heritage preservation.</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#D4AF37] mr-2 mt-1'></i>
                    <span>Follow us on social media</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#D4AF37] mr-2 mt-1'></i>
                    <span>Share our content with your network</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#D4AF37] mr-2 mt-1'></i>
                    <span>Host awareness events in your community</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#D4AF37] mr-2 mt-1'></i>
                    <span>Participate in our social media campaigns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="volunteer" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
              <TabsTrigger value="partner">Partner With Us</TabsTrigger>
              <TabsTrigger value="awareness">Spread Awareness</TabsTrigger>
            </TabsList>
            
            <TabsContent value="volunteer" className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-6 text-center">Volunteer Application</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-[#3A2718] mb-1">Full Name*</Label>
                      <Input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        value={volunteerForm.name}
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
                        value={volunteerForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="block text-sm font-medium text-[#3A2718] mb-1">Phone (optional)</Label>
                      <Input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        value={volunteerForm.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="block text-sm font-medium text-[#3A2718] mb-1">City (optional)</Label>
                      <Input 
                        type="text" 
                        id="city" 
                        name="city"
                        className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        value={volunteerForm.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="country" className="block text-sm font-medium text-[#3A2718] mb-1">Country (optional)</Label>
                    <Input 
                      type="text" 
                      id="country" 
                      name="country"
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={volunteerForm.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-[#3A2718] mb-2">Areas of Interest</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="foodSupport" 
                          checked={volunteerForm.interests.foodSupport}
                          onCheckedChange={() => handleCheckboxChange('foodSupport')}
                        />
                        <Label htmlFor="foodSupport">Food & Medical Support</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="restoration" 
                          checked={volunteerForm.interests.restoration}
                          onCheckedChange={() => handleCheckboxChange('restoration')}
                        />
                        <Label htmlFor="restoration">Monastery Preservation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="events" 
                          checked={volunteerForm.interests.events}
                          onCheckedChange={() => handleCheckboxChange('events')}
                        />
                        <Label htmlFor="events">Spiritual Events</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="environmental" 
                          checked={volunteerForm.interests.environmental}
                          onCheckedChange={() => handleCheckboxChange('environmental')}
                        />
                        <Label htmlFor="environmental">Environmental Initiatives</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="administrative" 
                          checked={volunteerForm.interests.administrative}
                          onCheckedChange={() => handleCheckboxChange('administrative')}
                        />
                        <Label htmlFor="administrative">Administrative Support</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="availability" className="block text-sm font-medium text-[#3A2718] mb-1">Availability</Label>
                    <Input 
                      type="text" 
                      id="availability" 
                      name="availability"
                      placeholder="E.g., Weekends, 5 hours/week, Summer months, etc."
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={volunteerForm.availability}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience" className="block text-sm font-medium text-[#3A2718] mb-1">Relevant Experience (optional)</Label>
                    <textarea 
                      id="experience" 
                      name="experience"
                      rows={3}
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={volunteerForm.experience}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-[#3A2718] mb-1">Message (optional)</Label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={3}
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={volunteerForm.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 bg-[#E67E22] text-white font-bold rounded-md hover:bg-[#C26B1D] transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="partner" className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-6 text-center">Partnership Opportunities</h3>
                
                <div className="space-y-8">
                  <div className="bg-[#F5F0E3] p-6 rounded-lg">
                    <h4 className="font-heading text-xl font-bold text-[#3A2718] mb-3">Corporate Sponsorship</h4>
                    <p className="mb-4">Partner with Buddha Dhaam through financial or in-kind donations that support our mission while aligning with your organization's values and CSR objectives.</p>
                    <div className="flex justify-center">
                      <Button className="px-6 py-2 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition">
                        Request Partnership Information
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-[#F5F0E3] p-6 rounded-lg">
                    <h4 className="font-heading text-xl font-bold text-[#3A2718] mb-3">Co-branded Water Bottle Initiative</h4>
                    <p className="mb-4">Join our initiative to provide clean drinking water to monks and pilgrims with branded water bottles that showcase your organization's commitment to supporting monastic communities.</p>
                    <div className="flex justify-center">
                      <Button className="px-6 py-2 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition">
                        Learn About Water Bottle Sponsorship
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-[#F5F0E3] p-6 rounded-lg">
                    <h4 className="font-heading text-xl font-bold text-[#3A2718] mb-3">Event Sponsorship</h4>
                    <p className="mb-4">Sponsor spiritual gatherings, chanting ceremonies, or tree planting events. Your organization will be recognized in all event materials and communications.</p>
                    <div className="flex justify-center">
                      <Button className="px-6 py-2 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition">
                        View Upcoming Sponsorship Opportunities
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="mb-4 font-medium">For detailed information about partnership opportunities, please contact our partnership coordinator:</p>
                  <p className="text-[#9D2933]">partnerships@buddhadhaam.org</p>
                  <p>+91 9876 543 210</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="awareness" className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-6 text-center">Spread Awareness</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-[#3A2718] mb-4">Follow & Share</h4>
                    <p className="mb-4">Help us reach more people by following our social media accounts and sharing our content with your network.</p>
                    <div className="flex space-x-4 mb-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-[#3A2718] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-white" aria-label="Facebook">
                        <i className='bx bxl-facebook'></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#3A2718] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-white" aria-label="Instagram">
                        <i className='bx bxl-instagram'></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#3A2718] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-white" aria-label="Twitter">
                        <i className='bx bxl-twitter'></i>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#3A2718] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#3A2718] transition text-white" aria-label="YouTube">
                        <i className='bx bxl-youtube'></i>
                      </a>
                    </div>
                    <Button className="w-full bg-[#D4AF37] text-[#271A10] font-bold rounded-md hover:bg-[#B29025] transition">
                      Share Our Mission
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-heading text-xl font-bold text-[#3A2718] mb-4">Host an Awareness Event</h4>
                    <p className="mb-4">Organize an event in your community to raise awareness about the importance of preserving Buddhist heritage and supporting monastic communities.</p>
                    <ul className="mb-4 space-y-2">
                      <li className="flex items-start">
                        <i className='bx bx-check-circle text-[#D4AF37] mr-2 mt-1'></i>
                        <span>Educational presentations about Buddhist sites</span>
                      </li>
                      <li className="flex items-start">
                        <i className='bx bx-check-circle text-[#D4AF37] mr-2 mt-1'></i>
                        <span>Meditation gatherings</span>
                      </li>
                      <li className="flex items-start">
                        <i className='bx bx-check-circle text-[#D4AF37] mr-2 mt-1'></i>
                        <span>Fundraising events</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-[#D4AF37] text-[#271A10] font-bold rounded-md hover:bg-[#B29025] transition">
                      Request Event Kit
                    </Button>
                  </div>
                </div>
                
                <div className="bg-[#F5F0E3] p-6 rounded-lg text-center">
                  <h4 className="font-heading text-xl font-bold text-[#3A2718] mb-3">Download Resources</h4>
                  <p className="mb-4">Access our collection of educational materials, presentation slides, and social media graphics to help spread awareness about Buddhist heritage preservation.</p>
                  <Button className="px-6 py-2 bg-[#D4AF37] text-[#271A10] font-bold rounded-md hover:bg-[#B29025] transition">
                    Download Resources
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="py-16 bg-[#3A2718] text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Together, we can make a significant impact in preserving Buddhist heritage and supporting monastic communities across sacred sites.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button className="px-8 py-4 bg-[#E67E22] text-[#271A10] font-bold rounded-md hover:bg-[#C26B1D] transition shadow-lg">
              Volunteer Today
            </Button>
            <Button className="px-8 py-4 bg-white text-[#3A2718] font-bold rounded-md hover:bg-[#EAE0C9] transition shadow-lg">
              Become a Partner
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
