'use client';

import { useEffect, useState } from 'react';
import { getAIAlerts } from '@/app/actions';
import { mockComplaints, mockUser } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Info } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function AIAlerts() {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      const res = await getAIAlerts({
        location: mockUser.location,
        complaints: mockComplaints,
      });
      setAlerts(res.alerts);
      setLoading(false);
    };

    fetchAlerts();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Location-Based AI Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ) : alerts.length > 0 ? (
          <ul className="space-y-3">
            {alerts.map((alert, index) => (
              <li key={index} className="flex items-start gap-3">
                <Info className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                <p className="text-sm">{alert}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No high-priority issues detected in your area currently.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
