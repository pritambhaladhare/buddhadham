import SectionTitle from '@/components/shared/SectionTitle';
import DonationCard from '@/components/shared/DonationCard';
import { DONATION_OPTIONS, OTHER_SUPPORT_OPTIONS } from '@/lib/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const Support = () => {
  const { toast } = useToast();
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customAmount || !donorInfo.name || !donorInfo.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/donations/custom', {
        amount: parseFloat(customAmount),
        ...donorInfo
      });
      
      toast({
        title: "Thank you for your support!",
        description: "Your donation will help us preserve Buddhist heritage.",
      });
      
      // Reset form
      setCustomAmount("");
      setDonorInfo({
        name: "",
        email: "",
        address: "",
        city: "",
        country: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Donation failed",
        description: "There was an error processing your donation. Please try again.",
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
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Support Our Mission</h1>
            <p className="font-accent text-xl text-[#D4AF37] max-w-3xl mx-auto">
              Your contribution helps preserve Buddhist heritage and support monastic communities
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Make a Difference" 
            subtitle="Choose the giving option that works best for you"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {DONATION_OPTIONS.map((option, index) => (
              <DonationCard key={index} option={option} />
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-6 text-center">Custom Donation</h3>
            <Tabs defaultValue="one-time" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="one-time">One-Time Donation</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Donation</TabsTrigger>
              </TabsList>
              <TabsContent value="one-time" className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <Label htmlFor="custom-amount" className="block text-sm font-medium text-[#3A2718] mb-1">Donation Amount*</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A2718]">$</span>
                      <Input 
                        type="text" 
                        id="custom-amount" 
                        className="w-full pl-8 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          // Only allow numbers and decimal point
                          const re = /^[0-9]*\.?[0-9]*$/;
                          if (e.target.value === '' || re.test(e.target.value)) {
                            setCustomAmount(e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-[#3A2718] mb-1">Full Name*</Label>
                      <Input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        value={donorInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-[#3A2718] mb-1">Email Address*</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        name="email"
                        className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        value={donorInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="address" className="block text-sm font-medium text-[#3A2718] mb-1">Address (optional)</Label>
                    <Input 
                      type="text" 
                      id="address" 
                      name="address"
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={donorInfo.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city" className="block text-sm font-medium text-[#3A2718] mb-1">City (optional)</Label>
                      <Input 
                        type="text" 
                        id="city" 
                        name="city"
                        className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        value={donorInfo.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="block text-sm font-medium text-[#3A2718] mb-1">Country (optional)</Label>
                      <Input 
                        type="text" 
                        id="country" 
                        name="country"
                        className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                        value={donorInfo.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="message" className="block text-sm font-medium text-[#3A2718] mb-1">Message (optional)</Label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={donorInfo.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 bg-[#E67E22] text-white font-bold rounded-md hover:bg-[#C26B1D] transition"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Make Donation'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="monthly" className="space-y-4">
                <div className="bg-[#F5F0E3] p-6 rounded-lg text-center">
                  <h4 className="font-heading text-xl font-bold text-[#3A2718] mb-4">Become a Monthly Supporter</h4>
                  <p className="mb-6">
                    Join our circle of sustaining supporters by making a monthly contribution. Your recurring donation provides consistent funding for our ongoing work.
                  </p>
                  <Button className="px-6 py-3 bg-[#9D2933] text-white font-bold rounded-md hover:bg-[#7D1F29] transition">
                    Set Up Monthly Giving
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="font-heading text-2xl font-bold text-[#3A2718] mb-4 text-center">Other Ways to Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OTHER_SUPPORT_OPTIONS.map((option, index) => (
                <div key={index} className="text-center p-4">
                  <div className={`h-16 w-16 mx-auto mb-4 rounded-full bg-${option.icon === 'bxs-donate-heart' ? '[#E67E22]' : option.icon === 'bxs-hand-up' ? '[#9D2933]' : '[#D4AF37]'}/10 flex items-center justify-center`}>
                    <i className={`bx ${option.icon} text-3xl text-${option.icon === 'bxs-donate-heart' ? '[#E67E22]' : option.icon === 'bxs-hand-up' ? '[#9D2933]' : '[#D4AF37]'}`}></i>
                  </div>
                  <h4 className="font-heading font-bold mb-2">{option.title}</h4>
                  <p className="text-sm mb-4">{option.description}</p>
                  <Button variant="outline" className="text-[#3A2718] border-[#3A2718]">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-[#9D2933] text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold mb-4">Your Impact</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Every contribution makes a meaningful difference in our work to preserve Buddhist heritage and support monastic communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <div className="text-[#D4AF37] text-3xl font-bold mb-2">$25</div>
              <p>Provides meals for a monk for one month</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <div className="text-[#D4AF37] text-3xl font-bold mb-2">$100</div>
              <p>Plants 5 sacred Peepal trees at Buddhist sites</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg text-center">
              <div className="text-[#D4AF37] text-3xl font-bold mb-2">$500</div>
              <p>Supports the restoration of monastery artwork</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="italic font-accent text-lg mb-4">
              "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you." — Buddha
            </p>
            <Button className="px-6 py-3 bg-white text-[#9D2933] font-bold rounded-md hover:bg-[#EAE0C9] transition">
              Donate Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
