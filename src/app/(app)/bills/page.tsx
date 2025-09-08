'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockBills, mockUser, mockComplaints } from '@/lib/mock-data';
import type { Bill } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { analyzeBill } from '@/app/actions';

const billSchema = z.object({
  utility: z.string({ required_error: 'Please select a utility.' }),
  consumerId: z.string().min(5, 'Consumer ID is required.'),
});

export default function BillsPage() {
  const { toast } = useToast();
  const [fetchedBill, setFetchedBill] = useState<Bill | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{flagForReview: boolean; reason: string} | null>(null);

  const form = useForm<z.infer<typeof billSchema>>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      utility: '',
      consumerId: '',
    },
  });

  async function onSubmit(values: z.infer<typeof billSchema>) {
    setFetchedBill(null);
    setAnalysisResult(null);

    const bill = mockBills.find(
      (b) =>
        b.utility.startsWith(values.utility) &&
        b.consumerId === values.consumerId
    );

    if (bill) {
      setFetchedBill(bill);
      toast({ title: 'Bill Fetched Successfully' });

      // AI Analysis
      const communityComplaintVolume = mockComplaints.filter(c => c.category === 'Utility Services' && c.location.includes(bill.serviceArea)).length;
      const result = await analyzeBill({
          utilityType: bill.utility,
          consumerId: bill.consumerId,
          billingArea: bill.serviceArea,
          complaintDescription: "High bill amount",
          communityComplaintVolume,
      });
      setAnalysisResult(result);

    } else {
      toast({ variant: 'destructive', title: 'Bill Not Found' });
    }
  }

  const handlePayment = () => {
    if (fetchedBill) {
      toast({
        title: 'Payment Successful',
        description: `₹${fetchedBill.amount} paid for ${fetchedBill.utility}.`,
      });
      setFetchedBill({ ...fetchedBill, status: 'Paid' });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Pay Utility Bill</CardTitle>
          <CardDescription>
            Fetch your bill using your consumer ID.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="utility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a utility service" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Electricity">Electricity - BESCOM</SelectItem>
                        <SelectItem value="Water">Water - BWSSB</SelectItem>
                        <SelectItem value="Property Tax">Property Tax - BBMP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consumerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumer ID</FormLabel>
                    <FormControl><Input placeholder="Enter your consumer ID" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Fetch Bill</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {fetchedBill && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Bill Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResult?.flagForReview && (
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>AI Flagged for Review</AlertTitle>
                    <AlertDescription>{analysisResult.reason}</AlertDescription>
                </Alert>
            )}
            <div className="border p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{fetchedBill.utility}</p>
                <Badge variant={fetchedBill.status === 'Paid' ? 'secondary' : 'destructive'}>{fetchedBill.status}</Badge>
              </div>
              <div>
                <p className="text-3xl font-bold">₹{fetchedBill.amount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Due by: {fetchedBill.dueDate}</p>
              </div>
               <p className="text-sm text-muted-foreground">Consumer ID: {fetchedBill.consumerId}</p>
               <p className="text-sm text-muted-foreground">Service Area: {fetchedBill.serviceArea}</p>
              
              {fetchedBill.status === 'Pending' && (
                <Button onClick={handlePayment} className="w-full">Pay Now</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
