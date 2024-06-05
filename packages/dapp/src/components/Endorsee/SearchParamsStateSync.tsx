'use client';

import { useEndorsementStore } from '@/stores';
import { validateOrGetDefaultPlatform } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const SearchParamsStateSync = ({
  address,
}: {
  address: `0x${string}` | null;
}) => {
  const searchParams = useSearchParams();
  const account = searchParams.get('account');
  const platform = validateOrGetDefaultPlatform(searchParams.get('platform'));

  // Global state
  const { changeDisplayValue, changePlatform, changeAddress } =
    useEndorsementStore((state) => ({
      changeAddress: state.changeAddress,
      changePlatform: state.changePlatform,
      changeDisplayValue: state.changeDisplayValue,
    }));

  // Reads search params and updates global store
  useEffect(() => {
    changeDisplayValue(account);
    changePlatform(platform);
    changeAddress(address);
  }, [account, platform, address]);

  return null;
};
