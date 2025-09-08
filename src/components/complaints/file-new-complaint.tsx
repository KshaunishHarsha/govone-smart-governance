'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const complaintSchema = z.object({
  type: z.enum(['Private', 'Public'], {
    required_error: 'You need to select a complaint type.',
  }),
  category: z.string({ required_error: 'Please select a category.' }),
  subcategory: z.string().min(2, 'Subcategory is too short.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  location: z.string().min(5, 'Please provide a specific location.'),
  file: z.any().optional(),
});

export function FileNewComplaint() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      subcategory: '',
      description: '',
      location: '',
    },
  });

  function onSubmit(values: z.infer<typeof complaintSchema>) {
    console.log(values);
    toast({
      title: 'Complaint Filed Successfully',
      description: `Your complaint (ID: COMP${Math.floor(
        Math.random() * 900 + 100
      )}) has been submitted.`,
    });
    form.reset();
  }

  const categories = [
    'Civic & Municipal',
    'Utility Services',
    'Transport',
    'Health Services',
    'Ration Card Issues',
    'Other',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">File a New Complaint</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Complaint Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Private" />
                        </FormControl>
                        <FormLabel className="font-normal">Private (Only visible to you and the authorities)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Public" />
                        </FormControl>
                        <FormLabel className="font-normal">Public (Visible to the community on the map)</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a complaint category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
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
                  <FormLabel>Subcategory / Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Potholes, Garbage not collected" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the issue."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Near MG Road Metro Station, Bengaluru" {...field} />
                  </FormControl>
                   <FormDescription>
                    Be as specific as possible for faster resolution.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Proof (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormDescription>
                    Upload an image or document as evidence.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Submit Complaint</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
