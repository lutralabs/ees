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

  // Global state
  const { changeDisplayValue, changePlatform, changeAddress } =
    useEndorsementStore((state) => ({
      changeDisplayValue: state.changeDisplayValue,
      changePlatform: state.changePlatform,
      changeAddress: state.changeAddress,
    }));

  // Reads search params and updates global store
  useEffect(() => {
    const account = searchParams.get('account');
    const platform = account
      ? validateOrGetDefaultPlatform(searchParams.get('platform'))
      : null;

    changeDisplayValue(account ?? null);
    changePlatform(platform);
    changeAddress(address);
  }, [searchParams, address]);

  return null;
};
