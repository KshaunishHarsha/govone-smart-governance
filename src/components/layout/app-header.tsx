'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { NAV_ITEMS } from '@/lib/constants';

export function AppHeader() {
  const pathname = usePathname();
  const currentPage =
    NAV_ITEMS.find((item) => pathname.startsWith(item.href))?.title ||
    'GovOne';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-headline font-semibold">{currentPage}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
