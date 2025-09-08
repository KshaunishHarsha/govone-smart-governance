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
import { mockDocumentRequests, mockUser } from '@/lib/mock-data';
import { Download, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const documentSchema = z.object({
  category: z.string({ required_error: 'Please select a category.' }),
  subcategory: z.string({ required_error: 'Please select a document type.'}),
  name: z.string(),
  aadhaarId: z.string(),
});

export default function DocumentsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockDocumentRequests);

  const form = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      name: mockUser.name,
      aadhaarId: mockUser.aadhaarId,
    },
  });

  function onSubmit(values: z.infer<typeof documentSchema>) {
    const newRequest = {
      id: `DOC${Math.floor(Math.random() * 900 + 100)}`,
      userId: mockUser.id,
      category: values.category,
      subcategory: values.subcategory,
      status: 'Pending' as const,
      createdAt: new Date().toISOString(),
    };
    setRequests([newRequest, ...requests]);

    toast({
      title: 'Document Request Submitted',
      description: `Your request for ${values.subcategory} is being processed.`,
    });
    
    // Simulate processing
    setTimeout(() => {
        setRequests(prev => prev.map(r => r.id === newRequest.id ? {...r, status: 'Resolved', fileUrl: '/mock-document.pdf'} : r));
        toast({
            title: "Document Ready",
            description: `Your ${values.subcategory} is ready for download.`
        });
    }, 5000);

    form.reset({ name: mockUser.name, aadhaarId: mockUser.aadhaarId });
  }

  const handleDownload = (fileName: string) => {
    toast({
        title: "Download Started",
        description: `Downloading ${fileName}...`
    });
  }

  const categories = ['Identity Documents', 'Property Documents', 'Educational Documents'];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Request a Document</CardTitle>
            <CardDescription>
              Your details are auto-filled from your mock DigiLocker profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-muted"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="aadhaarId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar ID</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-muted"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="e.g., Birth Certificate, Voter ID" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="Birth Certificate">Birth Certificate</SelectItem>
                            <SelectItem value="Voter ID">Voter ID</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Request Document</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Document Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.filter(r => r.userId === mockUser.id).map(req => (
              <div key={req.id} className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold">{req.subcategory}</p>
                  <p className="text-sm text-muted-foreground">{req.category}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    {req.status === 'Resolved' ? <CheckCircle className="w-3 h-3 mr-1 text-green-500"/> : <Clock className="w-3 h-3 mr-1 text-yellow-500" />}
                    <span>Status: {req.status}</span>
                  </div>
                </div>
                {req.status === 'Resolved' && req.fileUrl && (
                  <Button variant="outline" size="icon" onClick={() => handleDownload(req.subcategory)}>
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
