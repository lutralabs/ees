// app/components/ThemeSwitcher.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    // <Switch
    //   checked={theme === 'dark'}
    //   color="primary"
    //   // startContent={<MoonIcon />}
    //   // endContent={<SunIcon />}
    //   onCheckedChange={(e) => setTheme(e ? 'dark' : 'light')}
    // />
    <Button
      variant="outline"
      size="icon"
      onMouseDown={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
