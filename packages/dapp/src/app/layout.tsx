import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { Navbar } from '@/components/Navbar';
import { Providers } from '@/components/Providers';
import { cookieToInitialState } from '@/lib/wagmi/cookieToInitialState';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Endorse - Ethereum Endorsement Service',
  robots: {
    // FIXME: Update for production release
    index: false,
    follow: false,
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  // Initial state used by Wagmi
  const initialState = cookieToInitialState(headers().get('cookie'));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased')}>
        <div className="h-full w-full overflow-hidden">
          <Providers initialState={initialState}>
            <Navbar />
            <main className="h-full w-full overflow-auto pb-32">
              {props.children}
            </main>
            <Toaster />
          </Providers>
        </div>
      </body>
    </html>
  );
}
