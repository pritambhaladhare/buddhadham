import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollRevealContainer } from '@/components/animation/ScrollRevealContainer';
import { useToast } from '@/hooks/use-toast';
import PeepalLeaf from '@/assets/icons/PeepalLeaf';
import { useTranslation } from 'react-i18next';

export default function MemberDashboard() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Current user query
  const { data: userData, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    }
  });

  // Member data query (depends on user data)
  const { data: memberData, isLoading: memberLoading, error: memberError } = useQuery({
    queryKey: ['/api/members/user', userData?.user?.id],
    queryFn: async () => {
      if (!userData?.user?.id) return null;
      
      const response = await fetch(`/api/members/user/${userData.user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch member data');
      }
      return response.json();
    },
    enabled: !!userData?.user?.id
  });

  // Member benefits query (depends on member data)
  const { data: benefitsData, isLoading: benefitsLoading } = useQuery({
    queryKey: ['/api/member-benefits', memberData?.member?.membershipLevel],
    queryFn: async () => {
      if (!memberData?.member?.membershipLevel) return null;
      
      const response = await fetch(`/api/member-benefits/${memberData.member.membershipLevel}`);
      if (!response.ok) {
        throw new Error('Failed to fetch benefits data');
      }
      return response.json();
    },
    enabled: !!memberData?.member?.membershipLevel
  });
  
  // Member recurring donations query
  const { data: donationsData, isLoading: donationsLoading } = useQuery({
    queryKey: ['/api/members/donations', memberData?.member?.id],
    queryFn: async () => {
      if (!memberData?.member?.id) return null;
      
      const response = await fetch(`/api/members/${memberData.member.id}/donations`);
      if (!response.ok) {
        throw new Error('Failed to fetch donations data');
      }
      return response.json();
    },
    enabled: !!memberData?.member?.id
  });
  
  // Member payment history query
  const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
    queryKey: ['/api/members/payments', memberData?.member?.id],
    queryFn: async () => {
      if (!memberData?.member?.id) return null;
      
      const response = await fetch(`/api/members/${memberData.member.id}/payments`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment history');
      }
      return response.json();
    },
    enabled: !!memberData?.member?.id
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out of your account.",
        variant: "default"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      setLocation('/member-login');
    }
  });

  // Check if user is logged in
  useEffect(() => {
    if (userError) {
      toast({
        title: "Authentication Error",
        description: "Please log in to access the member dashboard.",
        variant: "destructive"
      });
      setLocation('/member-login');
    }
  }, [userError, setLocation, toast]);

  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Loading state
  if (userLoading || memberLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <PeepalLeaf size={60} color="#E86A33" className="animate-pulse" />
          <h2 className="text-xl font-medium mt-4 text-orange-900">Loading your member dashboard...</h2>
        </div>
      </div>
    );
  }

  // Member data
  const member = memberData?.member;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col max-w-5xl mx-auto">
        <ScrollRevealContainer effect="fade-down" threshold={0.1}>
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <PeepalLeaf size={60} color="#E86A33" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-orange-900 mb-2">
              {t('memberPortal.dashboard.welcome', { name: userData?.user?.fullName || userData?.user?.username })}
            </h1>
            <p className="text-gray-600">
              Thank you for your ongoing support of our sacred mission.
            </p>
          </div>
        </ScrollRevealContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScrollRevealContainer effect="fade-up" delay={0.1} threshold={0.1}>
            <Card>
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-lg text-orange-900">Membership</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Level:</span>
                  <Badge variant="outline" className="capitalize bg-orange-50 text-orange-900 border-orange-200">
                    {member?.membershipLevel || 'Basic'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Status:</span>
                  <Badge variant={member?.membershipStatus === 'active' ? 'default' : 'secondary'} className="capitalize">
                    {member?.membershipStatus || 'Inactive'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Start Date:</span>
                  <span className="text-gray-900">{formatDate(member?.startDate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Next Renewal:</span>
                  <span className="text-gray-900">{formatDate(member?.renewalDate)}</span>
                </div>
              </CardContent>
            </Card>
          </ScrollRevealContainer>

          <ScrollRevealContainer effect="fade-up" delay={0.2} threshold={0.1}>
            <Card>
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-lg text-orange-900">Active Donation</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {donationsLoading ? (
                  <div className="flex justify-center py-4">
                    <p className="text-gray-500">Loading donation details...</p>
                  </div>
                ) : donationsData?.donations?.some((d: any) => d.status === 'active') ? (
                  // Show the first active donation
                  (() => {
                    const activeDonation = donationsData.donations.find((d: any) => d.status === 'active');
                    if (!activeDonation) return null;
                    
                    // Calculate next payment date
                    let nextPaymentDate = '';
                    try {
                      const startDate = new Date(activeDonation.startDate);
                      const today = new Date();
                      
                      // Simple next payment date calculation based on frequency
                      if (activeDonation.frequency === 'monthly') {
                        const nextMonth = new Date(today);
                        nextMonth.setMonth(today.getMonth() + 1);
                        nextMonth.setDate(startDate.getDate());
                        nextPaymentDate = nextMonth.toISOString();
                      } else if (activeDonation.frequency === 'quarterly') {
                        const nextQuarter = new Date(today);
                        nextQuarter.setMonth(today.getMonth() + 3);
                        nextQuarter.setDate(startDate.getDate());
                        nextPaymentDate = nextQuarter.toISOString();
                      } else if (activeDonation.frequency === 'yearly') {
                        const nextYear = new Date(today);
                        nextYear.setFullYear(today.getFullYear() + 1);
                        nextYear.setDate(startDate.getDate());
                        nextPaymentDate = nextYear.toISOString();
                      }
                    } catch (e) {
                      nextPaymentDate = 'Date not available';
                    }
                    
                    return (
                      <>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700">Amount:</span>
                          <span className="text-xl font-semibold text-orange-900">${activeDonation.amount}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700">Frequency:</span>
                          <span className="text-gray-900 capitalize">{activeDonation.frequency}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700">Since:</span>
                          <span className="text-gray-900">{formatDate(activeDonation.startDate)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-700">Next Payment:</span>
                          <span className="text-gray-900">{formatDate(nextPaymentDate)}</span>
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                          <Button variant="outline" className="flex-1">
                            Update Payment
                          </Button>
                          <Button variant="outline" className="flex-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                            Pause
                          </Button>
                        </div>
                      </>
                    );
                  })()
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">No active recurring donation found.</p>
                    <Button variant="default" className="w-full">
                      Set Up Monthly Donation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollRevealContainer>

          <ScrollRevealContainer effect="fade-up" delay={0.3} threshold={0.1}>
            <Card>
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-lg text-orange-900">Account</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Username:</span>
                  <span className="text-gray-900">{userData?.user?.username}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Email:</span>
                  <span className="text-gray-900">{userData?.user?.email || 'Not set'}</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                    {t('memberPortal.dashboard.logoutButton')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollRevealContainer>
        </div>

        <ScrollRevealContainer effect="fade-up" delay={0.4} threshold={0.1}>
          <Tabs defaultValue="benefits" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="benefits">Member Benefits</TabsTrigger>
              <TabsTrigger value="donations">Donation History</TabsTrigger>
            </TabsList>
            <TabsContent value="benefits" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('memberPortal.dashboard.benefitsTitle')}</CardTitle>
                  <CardDescription>
                    Exclusive benefits available to {member?.membershipLevel || 'basic'} level members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {benefitsLoading ? (
                    <div className="flex justify-center py-8">
                      <p className="text-gray-500">Loading benefits...</p>
                    </div>
                  ) : benefitsData?.benefits?.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {benefitsData.benefits.map((benefit: any, index: number) => (
                        <AccordionItem key={benefit.id} value={`benefit-${benefit.id}`}>
                          <AccordionTrigger className="text-left">
                            {benefit.benefitName}
                          </AccordionTrigger>
                          <AccordionContent>
                            {benefit.benefitDescription}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">No specific benefits found for your membership level.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button variant="outline" className="w-full">View All Benefits</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="donations" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('memberPortal.dashboard.donationHistory')}</CardTitle>
                  <CardDescription>
                    Record of your recurring donations to Buddha Dhaam
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Recurring Donations</h3>
                      {donationsLoading ? (
                        <div className="flex justify-center py-8">
                          <p className="text-gray-500">Loading donations...</p>
                        </div>
                      ) : donationsData?.donations?.length > 0 ? (
                        <div className="rounded-md border">
                          <div className="grid grid-cols-4 py-3 px-4 font-medium bg-muted/50">
                            <div>Amount</div>
                            <div>Frequency</div>
                            <div>Start Date</div>
                            <div>Status</div>
                          </div>
                          
                          {donationsData.donations.map((donation: any) => (
                            <div key={donation.id} className="grid grid-cols-4 py-3 px-4 border-t">
                              <div>${donation.amount}</div>
                              <div className="capitalize">{donation.frequency}</div>
                              <div>{formatDate(donation.startDate)}</div>
                              <div>
                                <Badge 
                                  variant={donation.status === 'active' ? 'default' : 'secondary'} 
                                  className="capitalize"
                                >
                                  {donation.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center border rounded-md bg-muted/10">
                          <p className="text-gray-500">No recurring donations set up yet.</p>
                          <Button variant="outline" className="mt-2">Set Up Monthly Donation</Button>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Payment History</h3>
                      {paymentsLoading ? (
                        <div className="flex justify-center py-8">
                          <p className="text-gray-500">Loading payment history...</p>
                        </div>
                      ) : paymentsData?.payments?.length > 0 ? (
                        <div className="rounded-md border">
                          <div className="grid grid-cols-5 py-3 px-4 font-medium bg-muted/50">
                            <div>Date</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div>Method</div>
                            <div>Receipt</div>
                          </div>
                          
                          {paymentsData.payments.map((payment: any) => (
                            <div key={payment.id} className="grid grid-cols-5 py-3 px-4 border-t">
                              <div>{formatDate(payment.paymentDate)}</div>
                              <div>${payment.amount}</div>
                              <div>
                                <Badge 
                                  variant={payment.status === 'completed' ? 'outline' : 'secondary'} 
                                  className={`capitalize ${payment.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}`}
                                >
                                  {payment.status}
                                </Badge>
                              </div>
                              <div className="capitalize">{payment.paymentMethod}</div>
                              <div>
                                {payment.receiptUrl ? (
                                  <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                      <path d="M12 2v8L22 8v12H2V8l10 2V2z" />
                                    </svg>
                                    Download
                                  </Button>
                                ) : (
                                  <span className="text-gray-400 text-sm">-</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center border rounded-md bg-muted/10">
                          <p className="text-gray-500">No payment records found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <div className="w-full text-center">
                    <p className="text-sm text-gray-500 mb-3">Thank you for your generous support of our sacred mission!</p>
                    <p className="text-sm text-orange-700">Your contributions help preserve Buddhist sites and support monks throughout Asia.</p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollRevealContainer>

        <ScrollRevealContainer effect="fade-up" delay={0.5} threshold={0.1}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upcoming Events for Members</CardTitle>
              <CardDescription>
                Special gatherings and ceremonies available to members
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border hover:bg-orange-50 transition-colors">
                <h3 className="font-medium text-orange-900 mb-1">Annual Tripitak Chanting</h3>
                <p className="text-sm text-gray-600 mb-2">December 15, 2024 - Saranath, Varanasi</p>
                <p className="text-sm">Join monks from across Asia for this sacred chanting ceremony.</p>
              </div>
              <div className="p-4 rounded-lg border hover:bg-orange-50 transition-colors">
                <h3 className="font-medium text-orange-900 mb-1">Sacred Tree Planting Ceremony</h3>
                <p className="text-sm text-gray-600 mb-2">September 10, 2024 - Bodhgaya</p>
                <p className="text-sm">Help plant sacred Bodhi trees at important pilgrimage sites.</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="outline" className="w-full">View All Events</Button>
            </CardFooter>
          </Card>
        </ScrollRevealContainer>
      </div>
    </div>
  );
}