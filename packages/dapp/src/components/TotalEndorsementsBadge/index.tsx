'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useGlobalStatistics } from '@/hooks/useGlobalStatistics';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';

export const TotalEndorsementsBadge = () => {
  const { chainId } = useAccount();
  const { data, isLoading, error } = useGlobalStatistics(chainId);

  return (
    <div className="mt-1">
      <span className="inline-flex gap-x-1 items-center justify-center rounded-md px-2 py-1 ring-1 ring-inset ring-gray-500/10">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        {!error && (
          <>
            <span
              className={cn(
                'text-xs font-medium text-primary-400',
                isLoading && 'hidden'
              )}
            >
              {data?.totalEndorsements ?? '0'}
            </span>
            <Skeleton
              className={cn('w-8 h-3 bg-gray-300', !isLoading && 'hidden')}
            />
            <span className="text-xs text-gray-500">Endorsements</span>
          </>
        )}
        {error && (
          <span className="text-xs text-red-500">
            Failed to get total endorsements
          </span>
        )}
      </span>
    </div>
  );
};
