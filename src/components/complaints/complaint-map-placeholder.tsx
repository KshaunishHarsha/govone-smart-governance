'use client';

import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Complaint } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '../ui/badge';

type ComplaintMapPlaceholderProps = {
  complaints: Complaint[];
};


const pinPositions = [
  { top: '30%', left: '40%' },
  { top: '55%', left: '60%' },
  { top: '65%', left: '25%' },
  { top: '42%', left: '75%' },
];

export function ComplaintMapPlaceholder({
  complaints,
}: ComplaintMapPlaceholderProps) {
  return (
    <TooltipProvider>
      <div className="relative h-full w-full overflow-hidden rounded-lg border">
        <Image
          src="/images/image1.jpg"
          alt="Map placeholder"
          data-ai-hint="map satellite"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        {complaints.slice(0, 4).map((complaint, index) => (
          <Popover key={complaint.id}>
            <PopoverTrigger asChild>
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={pinPositions[index]}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full ring-2 ring-white shadow-lg animate-pulse',
                        complaint.status === 'Resolved' && 'bg-green-500',
                        complaint.status === 'In Progress' && 'bg-yellow-500',
                        complaint.status === 'Pending' && 'bg-red-500'
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{complaint.subcategory}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium leading-none">
                      {complaint.subcategory}
                    </h4>
                    <Badge
                      variant="outline"
                      className={cn(
                        complaint.status === 'Resolved' && 'border-green-500 text-green-700',
                        complaint.status === 'In Progress' && 'border-yellow-500 text-yellow-700',
                        complaint.status === 'Pending' && 'border-red-500 text-red-700'
                      )}
                    >
                      {complaint.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {complaint.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" /> {complaint.upvotes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                   {complaint.upvotes > 10 && <Badge className="bg-destructive hover:bg-destructive/80">Escalated</Badge>}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
        
        <div className="absolute bottom-2 right-2 bg-background/80 p-2 rounded-md backdrop-blur-sm text-xs">
          <p className="font-semibold">Map Legend:</p>
          <div className="flex items-center gap-2 mt-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Pending</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div> In Progress</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Resolved</div>
        </div>

      </div>
    </TooltipProvider>
  );
}
