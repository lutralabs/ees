'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { NextUIProvider } from '@nextui-org/react';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { type State, WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi/config';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export const Providers = ({
  children,
  initialState,
}: { children: ReactNode; initialState: State | undefined }) => {
  return (
    <NextUIProvider className="h-full w-full">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <WagmiProvider config={config} initialState={initialState}>
          <QueryClientProvider client={queryClient}>
            <div className="rainbowkit-wrapper h-full w-full">
              <RainbowKitProvider
                theme={lightTheme({
                  accentColor: '#008DDA',
                  accentColorForeground: 'white',
                })}
              >
                {children}
              </RainbowKitProvider>
            </div>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};
