import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ComplaintMapPlaceholder } from './complaint-map-placeholder';
import { mockComplaints } from '@/lib/mock-data';

export function CommunityComplaints() {
  const publicComplaints = mockComplaints.filter(c => c.type === 'Public');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Community Complaints Map</CardTitle>
        <CardDescription>
          View, upvote, and track public complaints in your community. Issues with more upvotes get prioritized.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bengaluru">Bengaluru</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="aspect-video w-full">
            <ComplaintMapPlaceholder complaints={publicComplaints} />
        </div>
      </CardContent>
    </Card>
  );
}
