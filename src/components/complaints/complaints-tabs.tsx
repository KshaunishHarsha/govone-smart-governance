import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { YourComplaints } from './your-complaints';
import { FileNewComplaint } from './file-new-complaint';
import { CommunityComplaints } from './community-complaints';

export function ComplaintsTabs() {
  return (
    <Tabs defaultValue="your-complaints" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="your-complaints">Your Complaints</TabsTrigger>
        <TabsTrigger value="file-new">File New Complaint</TabsTrigger>
        <TabsTrigger value="community">Community Complaints</TabsTrigger>
      </TabsList>
      <TabsContent value="your-complaints">
        <YourComplaints />
      </TabsContent>
      <TabsContent value="file-new">
        <FileNewComplaint />
      </TabsContent>
      <TabsContent value="community">
        <CommunityComplaints />
      </TabsContent>
    </Tabs>
  );
}
