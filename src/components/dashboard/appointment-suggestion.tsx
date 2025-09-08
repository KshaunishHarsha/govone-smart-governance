import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarCheck } from 'lucide-react';

export function AppointmentSuggestion() {
  return (
    <Card className="bg-accent/20 border-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-base">
          <CalendarCheck className="h-5 w-5 text-accent" />
          AI Appointment Suggestion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          Your passport is expiring in 30 days. It's a good time to book a
          renewal appointment.
        </p>
        <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/appointments">Book Renewal</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
