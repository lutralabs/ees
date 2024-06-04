'use client';

import { useEffect, useMemo } from 'react';
import { EndorseeDialog } from './EndorseeDialog';
import { useEndorsementStore } from '@/stores';
import { EndorseeBadge } from './EndorseeBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { useNameService } from '@/hooks';
import { PlatformType } from '@/utils/platform';

export const Endorsee = () => {
  const searchParams = useSearchParams();
  const intro = !!searchParams.get('intro');

  // Global state
  const { platform, displayValue, changeAddress } = useEndorsementStore(
    (state) => ({
      platform: state.platform,
      displayValue: state.displayValue,
      changeAddress: state.changeAddress,
    })
  );

  // Hooks
  const { data, error, isLoading } = useNameService({
    platform,
    value: displayValue,
    enabled: displayValue !== null && platform !== null && !intro,
  });

  const isValidAccount = useMemo(() => !!data?.address, [data]);

  useEffect(() => {
    if (data?.address) {
      changeAddress(data.address as `0x${string}`);
    }
  }, [data]);

  if (intro) {
    return (
      <div className="sm:pt-4 sm:pl-2 sm:pr-6 flex space-x-4 items-center w-full justify-start">
        <EndorseeBadge
          type={PlatformType.farcaster}
          value="pseudobun"
          avatar="/images/pseudobun.png"
          address="0x32b1172e786a31a65b46710cd946b2521e13ac96"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="sm:pt-4 sm:pl-2 sm:pr-6 flex space-x-4 items-center w-full justify-start">
        <Skeleton className="w-[68px] h-[68px] rounded-full bg-primary-200" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-[160px] h-[32px] rounded-full bg-primary-200" />
          <Skeleton className="w-[112px] h-[16px] rounded-full bg-primary-200" />
        </div>
      </div>
    );
  }

  if (data && isValidAccount) {
    return (
      <div className="sm:pt-4 sm:pl-2 sm:pr-6 flex space-x-4 items-center w-full justify-start">
        <EndorseeBadge
          type={platform!}
          value={displayValue!}
          avatar={data.avatar}
          address={data.address}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <EndorseeDialog />
      <div className="absolute mt-2 w-[200px] text-xs font-semibold text-red-500">
        {error?.message}
      </div>
    </div>
  );
};
