import { StatsCards } from '@/components/dashboard/stats-cards';
import { AIAlerts } from '@/components/dashboard/ai-alerts';
import { AppointmentSuggestion } from '@/components/dashboard/appointment-suggestion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AIAlerts />
        </div>
        <div className="space-y-6">
          <AppointmentSuggestion />
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/complaints">File a New Complaint</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/bills">Pay Utility Bill</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
