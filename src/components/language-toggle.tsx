'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'HI' : 'EN'));
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      {language}
    </Button>
  );
}
