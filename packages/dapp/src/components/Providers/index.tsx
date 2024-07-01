'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { NextUIProvider } from '@nextui-org/react';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { type State, WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi/config';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 15 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export const Providers = ({
  children,
  initialState,
}: { children: ReactNode; initialState: State | undefined }) => {
  const queryClient = getQueryClient();

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
            {/* FIXME[Martin]: Devtools fails to serialize Bigint (that is why we are not using it) */}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};
