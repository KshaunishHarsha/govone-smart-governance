'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockAppointments, mockUser } from '@/lib/mock-data';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const appointmentSchema = z.object({
  category: z.string({ required_error: 'Please select a category.' }),
  subcategory: z.string().min(2, 'Subcategory is too short.'),
  date: z.date({
    required_error: 'A date for the appointment is required.',
  }),
  time: z.string({ required_error: 'Please select a time slot.' }),
  location: z.string({ required_error: 'Please select a location.' }),
});

export default function AppointmentsPage() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(mockAppointments);

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
  });

  function onSubmit(values: z.infer<typeof appointmentSchema>) {
    const newAppointment = {
      id: `APPT${Math.floor(Math.random() * 900 + 100)}`,
      userId: mockUser.id,
      status: 'Upcoming' as const,
      ...values,
    };
    setAppointments([newAppointment, ...appointments]);
    toast({
      title: 'Appointment Booked Successfully',
      description: `Your appointment for ${values.subcategory} is confirmed.`,
    });
    form.reset();
  }

  const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const categories = ['Identity & Certificates', 'Transport', 'Property', 'Health'];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Book a Service Appointment</CardTitle>
            <CardDescription>
              Select a service and time slot to book an appointment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a service category" /></SelectTrigger></FormControl>
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
                      <FormLabel>Subcategory</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="e.g., Aadhaar Update, Passport Renewal" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="Aadhaar Update">Aadhaar Update</SelectItem>
                            <SelectItem value="Passport Renewal">Passport Renewal</SelectItem>
                            <SelectItem value="Driver's License Test">Driver's License Test</SelectItem>
                        </SelectContent>
                      </Select>
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
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a center" /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="Passport Seva Kendra, Lalbagh">Passport Seva Kendra, Lalbagh</SelectItem>
                            <SelectItem value="RTO, Koramangala">RTO, Koramangala</SelectItem>
                            <SelectItem value="Aadhaar Seva Kendra, Jayanagar">Aadhaar Seva Kendra, Jayanagar</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Slot</FormLabel>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(slot => (
                          <Button 
                            key={slot} 
                            type="button"
                            variant={field.value === slot ? 'default' : 'outline'}
                            onClick={() => field.onChange(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Book Appointment</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.filter(a => a.userId === mockUser.id).map(app => (
              <div key={app.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="font-semibold">{app.subcategory}</p>
                   <Badge variant={app.status === 'Upcoming' ? 'default' : 'secondary'}>{app.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{app.category}</p>
                <div className="text-sm mt-2 space-y-1">
                  <div className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-muted-foreground" /> {format(app.date, 'PPP')}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> {app.time}</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{app.location}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
