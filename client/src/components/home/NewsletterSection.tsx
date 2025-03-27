import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  interests: {
    monasteryRestoration: boolean;
    monkSupport: boolean;
    sacredEvents: boolean;
    volunteerOpportunities: boolean;
  }
}

const NewsletterSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    interests: {
      monasteryRestoration: false,
      monkSupport: false,
      sacredEvents: false,
      volunteerOpportunities: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: keyof typeof formState.interests) => {
    setFormState(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [name]: !prev.interests[name]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.firstName || !formState.lastName || !formState.email) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/newsletter/subscribe', formState);
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for joining our newsletter.",
      });
      
      // Reset form
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        interests: {
          monasteryRestoration: false,
          monkSupport: false,
          sacredEvents: false,
          volunteerOpportunities: false
        }
      });
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#F5F0E3]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-[#9D2933] p-6 text-white flex flex-col justify-center">
              <h3 className="font-heading text-2xl font-bold mb-3">Stay Connected</h3>
              <p className="mb-4">Join our community of supporters and receive updates on our work and upcoming events.</p>
              <div className="hidden md:block">
                <i className='bx bx-envelope text-6xl opacity-20'></i>
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-medium text-[#3A2718] mb-1">First Name*</Label>
                    <Input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={formState.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-medium text-[#3A2718] mb-1">Last Name*</Label>
                    <Input 
                      type="text" 
                      id="lastName"
                      name="lastName" 
                      className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      value={formState.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-[#3A2718] mb-1">Email Address*</Label>
                  <Input 
                    type="email" 
                    id="email"
                    name="email" 
                    className="w-full px-3 py-2 border border-[#3A2718]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-[#3A2718] mb-1">Interests (optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="monasteryRestoration" 
                        checked={formState.interests.monasteryRestoration}
                        onCheckedChange={() => handleCheckboxChange('monasteryRestoration')}
                      />
                      <Label htmlFor="monasteryRestoration">Monastery Restoration</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="monkSupport" 
                        checked={formState.interests.monkSupport}
                        onCheckedChange={() => handleCheckboxChange('monkSupport')}
                      />
                      <Label htmlFor="monkSupport">Monk Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sacredEvents" 
                        checked={formState.interests.sacredEvents}
                        onCheckedChange={() => handleCheckboxChange('sacredEvents')}
                      />
                      <Label htmlFor="sacredEvents">Sacred Events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="volunteerOpportunities" 
                        checked={formState.interests.volunteerOpportunities}
                        onCheckedChange={() => handleCheckboxChange('volunteerOpportunities')}
                      />
                      <Label htmlFor="volunteerOpportunities">Volunteer Opportunities</Label>
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-3 bg-[#E67E22] text-white font-bold rounded-md hover:bg-[#C26B1D] transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
