import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import PeepalLeaf from '@/assets/icons/PeepalLeaf';
import { Separator } from '@/components/ui/separator';

// Registration form schema
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name is required"),
  donationAmount: z.string().min(1, "Donation amount is required"),
  donationFrequency: z.enum(["monthly", "quarterly", "annually"], {
    required_error: "Please select a donation frequency",
  }),
  membershipLevel: z.enum(["bronze", "silver", "gold", "platinum"], {
    required_error: "Please select a membership level",
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function MemberRegister() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Form setup
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      fullName: "",
      donationAmount: "",
      donationFrequency: "monthly",
      membershipLevel: "bronze"
    }
  });
  
  // Register user mutation
  const registerMutation = useMutation({
    mutationFn: async (formData: Omit<RegisterFormValues, 'confirmPassword'>) => {
      // First register the user
      const { donationAmount, donationFrequency, membershipLevel, ...userRegistrationData } = formData;
      
      const userResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userRegistrationData)
      });
      
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || "Failed to register user");
      }
      
      const userResponseData = await userResponse.json();
      
      // Then login the user
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: userRegistrationData.username, 
          password: userRegistrationData.password 
        })
      });
      
      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || "Failed to login after registration");
      }
      
      const loginData = await loginResponse.json();
      
      // Then create the member profile
      const membershipData = {
        userId: loginData.user.id,
        membershipLevel,
        donationAmount,
        donationFrequency,
        startDate: new Date().toISOString().split('T')[0],
        renewalDate: new Date(Date.now() + (
          donationFrequency === 'monthly' ? 30 * 24 * 60 * 60 * 1000 :
          donationFrequency === 'quarterly' ? 90 * 24 * 60 * 60 * 1000 :
          365 * 24 * 60 * 60 * 1000
        )).toISOString().split('T')[0],
        membershipStatus: 'active'
      };
      
      const memberResponse = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(membershipData)
      });
      
      if (!memberResponse.ok) {
        const errorData = await memberResponse.json();
        throw new Error(errorData.message || "Failed to create member profile");
      }
      
      const memberData = await memberResponse.json();
      
      return { user: loginData.user, member: memberData.member };
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Welcome to Buddha Dhaam Member Portal!",
        variant: "default"
      });
      setLocation('/member-dashboard');
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong during registration",
        variant: "destructive"
      });
    }
  });
  
  // Form submission handler
  function onSubmit(values: RegisterFormValues) {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registrationData } = values;
    registerMutation.mutate(registrationData);
  }
  
  // Helper to show membership level information
  function getMembershipLevelInfo(level: string) {
    switch (level) {
      case "bronze":
        return "Bronze level includes basic benefits like monthly newsletter and exclusive content.";
      case "silver":
        return "Silver level includes Bronze benefits plus quarterly digital meetings with monks.";
      case "gold":
        return "Gold level includes Silver benefits plus annual private blessing ceremony.";
      case "platinum":
        return "Platinum level includes Gold benefits plus personalized meditation guidance from senior monks.";
      default:
        return "";
    }
  }
  
  // Watch the membership level to update the description
  const watchedMembershipLevel = form.watch("membershipLevel");
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <PeepalLeaf size={60} color="#E86A33" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-orange-900 mb-2">
            Become a Member
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Join our community of recurring donors and gain access to exclusive spiritual benefits and resources.
          </p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-orange-800">Member Registration</CardTitle>
            <CardDescription className="text-center">
              Create your account and set up your recurring donation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="donationAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Amount</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Amount" {...field} />
                        </FormControl>
                        <FormDescription>
                          Amount in USD you wish to donate recurringly
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="donationFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How often you would like to donate
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="membershipLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bronze">Bronze</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="platinum">Platinum</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {getMembershipLevelInfo(watchedMembershipLevel)}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Creating Account..." : "Create Member Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardContent className="pt-0 border-t">
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            
            <a href="/api/auth/google" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              Sign up with Google
            </a>
            <p className="mt-4 text-xs text-center text-gray-500">
              Google Sign-up will create your account and prompt for donation details.
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t p-4">
            <div className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/member-login" className="text-orange-600 hover:text-orange-800 font-medium">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}