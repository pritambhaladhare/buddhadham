import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import PeepalLeaf from '@/assets/icons/PeepalLeaf';

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function MemberLogin() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Form setup
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome back to Buddha Dhaam Member Portal!",
        variant: "default"
      });
      setLocation('/member-dashboard');
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password",
        variant: "destructive"
      });
    }
  });
  
  // Form submission handler
  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }
  
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex flex-col items-center max-w-md mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <PeepalLeaf size={60} color="#E86A33" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-orange-900 mb-2">
            {t('memberPortal.login.title')}
          </h1>
          <p className="text-gray-600">
            Access your exclusive member benefits and manage your recurring donation.
          </p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-orange-800">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('memberPortal.login.username')}</FormLabel>
                      <FormControl>
                        <Input placeholder="Your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('memberPortal.login.password')}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing In..." : t('memberPortal.login.loginButton')}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-sm text-center">
              <Link href="/forgot-password" className="text-orange-600 hover:text-orange-800">
                {t('memberPortal.login.forgotPassword')}
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <div className="text-sm text-gray-600">
              {t('memberPortal.login.noAccount')}{' '}
              <Link href="/member-register" className="text-orange-600 hover:text-orange-800 font-medium">
                {t('memberPortal.login.signUp')}
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need help with your account? <a href="/contact" className="text-orange-600 hover:text-orange-800">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}