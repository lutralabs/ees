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
import { APP_URL } from '@/utils';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'endorse.fun - Ethereum Endorsement Service',
  description: 'The next upgrade for Web3 social layer.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    description: 'The next upgrade for Web3 social layer.',
    siteName: 'endorse.fun',
    title: 'endorse.fun - Ethereum Endorsement Service',
    type: 'article',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'endorse.fun - Ethereum Endorsement Service',
    description: 'The next upgrade for Web3 social layer.',
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  // Initial state used by Wagmi
  const initialState = cookieToInitialState(headers().get('cookie'));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased')}>
        <Providers initialState={initialState}>
          <main className="bg-slate-50 flex flex-col min-h-[calc(100dvh)]">
            <Navbar />
            <div className="flex-1">{props.children}</div>
            <Footer />
          </main>
          <Toaster />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
