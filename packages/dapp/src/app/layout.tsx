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
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ees-eosin.vercel.app'),
  title: 'Endorse - Ethereum Endorsement Service',
  description: '', // FIXME: Add description
  robots: {
    // FIXME: Update for production release
    index: false,
    follow: false,
  },
  openGraph: {
    description: 'TODO', // FIXME: Add description
    siteName: 'Endorse.fun',
    title: 'Endorse - Ethereum Endorsement Service', // FIXME: Add description
    type: 'article',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endorse - Ethereum Endorsement Service', // FIXME: Add description
    description: 'TODO', // FIXME: Add description
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  // Initial state used by Wagmi
  const initialState = cookieToInitialState(headers().get('cookie'));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased')}>
        <div className="h-full w-full overflow-hidden bg-gradient-radial from-blue-50 via-blue-50 to-blue-200">
          <Providers initialState={initialState}>
            <Navbar />
            <main className="h-full w-full overflow-auto pb-32">
              {props.children}
            </main>
            <Toaster />
          </Providers>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
