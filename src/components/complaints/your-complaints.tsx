import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockComplaints, mockUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

export function YourComplaints() {
  const userComplaints = mockComplaints.filter(
    (c) => c.userId === mockUser.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Submitted Complaints</CardTitle>
        <CardDescription>
          Here is a list of all complaints you have filed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {userComplaints.length > 0 ? (
          userComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="border p-4 rounded-lg space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{complaint.subcategory}</p>
                  <p className="text-sm text-muted-foreground">
                    {complaint.category}
                  </p>
                </div>
                <Badge
                  className={cn(
                    complaint.status === 'Resolved' &&
                      'bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30',
                    complaint.status === 'In Progress' &&
                      'bg-yellow-500/20 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/30',
                    complaint.status === 'Pending' &&
                      'bg-red-500/20 text-red-700 border-red-500/30 hover:bg-red-500/30'
                  )}
                >
                  {complaint.status}
                </Badge>
              </div>
              <p className="text-sm">{complaint.description}</p>
              <div className="text-xs text-muted-foreground">
                <span>ID: {complaint.id}</span> |{' '}
                <span>
                  Filed on:{' '}
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
              {complaint.response && (
                <div className="bg-secondary p-3 rounded-md mt-2">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Government Response
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {complaint.response}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            You have not filed any complaints yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
