'use client';

import { useDonationBalance } from '@/hooks/useDonationBalance';
import { DEFAULT_CHAIN_ID } from '@/lib/contracts';
import { cn } from '@/lib/utils';
import { GiftIcon } from '@heroicons/react/24/outline';
import { Circle, Dot } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';

export const ClaimNavigationLink = () => {
  const { address, chainId } = useAccount();

  const { data } = useDonationBalance(
    chainId ?? DEFAULT_CHAIN_ID,
    address!,
    !!address
  );

  const nonZeroBalance = useMemo(() => {
    if (!data || data.toString() === '0') return false;
    return true;
  }, [data]);

  return (
    <Link
      href="/claim"
      prefetch={false}
      className="relative p-2 min-w-10 min-h-10 h-10 w-10 bg-white text-gray-900 hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg rounded-xl"
    >
      <GiftIcon className="text-primary" />
      <Circle
        className={cn(
          'text-red-500 h-3 w-3 absolute top-1 -right-1 -translate-y-1/2',
          !nonZeroBalance && 'hidden'
        )}
        fill="currentColor"
      />
    </Link>
  );
};
