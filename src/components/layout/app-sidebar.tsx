'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, MoreVertical } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { mockUser } from '@/lib/mock-data';

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-lg w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V3m0 0V3m0 0l-3.5 3.5M12 3l3.5 3.5M12 21a9 9 0 01-9-9M12 21a9 9 0 009-9" />
                </svg>
            </div>
          <div className="flex flex-col">
            <span className="text-lg font-headline font-semibold">GovOne</span>
            <span className="text-xs text-sidebar-foreground/70">
              Citizen Services
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                href={item.href}
                isActive={pathname.startsWith(item.href)}
                asChild
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-sidebar-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${mockUser.id}`} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{mockUser.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/70">
                  {mockUser.phone}
                </p>
              </div>
              <MoreVertical className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
