'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Smartphone, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.match(/^\d{10}$/)) {
      setOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: 'An OTP has been sent to your mobile number.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number.',
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP verification
    if (otp === '123456') {
      toast({
        title: 'Login Successful',
        description: 'Welcome to GovOne Platform.',
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'The OTP you entered is incorrect.',
      });
    }
  };

  const handleKioskLogin = () => {
    toast({
      title: 'Kiosk Mode Activated',
      description: 'You are now using the platform in guest mode.',
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V3m0 0V3m0 0l-3.5 3.5M12 3l3.5 3.5M12 21a9 9 0 01-9-9M12 21a9 9 0 009-9" />
                </svg>
            </div>
            <h1 className="text-4xl font-headline font-bold text-foreground">GovOne</h1>
            <p className="text-muted-foreground mt-2">Your Unified Platform for Citizen Services</p>
        </div>
        
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User Login</TabsTrigger>
            <TabsTrigger value="kiosk">Kiosk Mode</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">User Login</CardTitle>
                <CardDescription>
                  Enter your phone number to receive an OTP, simulating DigiLocker authentication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Send OTP
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                       <p className="text-sm text-muted-foreground">Using test OTP: 123456</p>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="kiosk">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Kiosk Mode</CardTitle>
                <CardDescription>
                  Access public services and information without authentication. Some features will be limited.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleKioskLogin} className="w-full">
                  Enter as Guest
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
