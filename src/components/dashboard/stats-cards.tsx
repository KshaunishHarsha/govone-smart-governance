import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Calendar, Wallet } from 'lucide-react';
import { mockComplaints, mockAppointments, mockBills } from '@/lib/mock-data';

export function StatsCards() {
  const pendingComplaints = mockComplaints.filter(
    (c) => c.status === 'Pending' && c.userId === 'user123'
  ).length;
  const upcomingAppointments = mockAppointments.filter(
    (a) => a.status === 'Upcoming' && a.userId === 'user123'
  ).length;
  const unpaidBills = mockBills.filter(
    (b) => b.status === 'Pending' && b.userId === 'user123'
  ).length;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Complaints
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingComplaints}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting resolution
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Appointments
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingAppointments}</div>
          <p className="text-xs text-muted-foreground">Scheduled events</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unpaid Bills</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unpaidBills}</div>
          <p className="text-xs text-muted-foreground">Require payment</p>
        </CardContent>
      </Card>
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Community Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+5</div>
          <p className="text-xs text-primary-foreground/80">
            New public complaints in your area
          </p>
        </CardContent>
      </Card>
    </>
  );
}
