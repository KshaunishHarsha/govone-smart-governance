import type { NavItem } from './types';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Wallet,
  ScrollText,
} from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Citizen Complaints',
    href: '/complaints',
    icon: FileText,
  },
  {
    title: 'Service Appointments',
    href: '/appointments',
    icon: Calendar,
  },
  {
    title: 'Document Requests',
    href: '/documents',
    icon: ScrollText,
  },
  {
    title: 'Bill Payments',
    href: '/bills',
    icon: Wallet,
  },
];
