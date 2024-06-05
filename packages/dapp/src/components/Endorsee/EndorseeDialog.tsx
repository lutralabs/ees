'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import SVG from 'react-inlinesvg';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { isAddress } from 'viem';
import { useEndorsementStore } from '@/stores';
import { PLATFORM_DATA, PlatformType } from '@/utils/platform';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const SUGGESTED_ACCOUNTS: { platform: PlatformType; value: string }[] = [
  {
    platform: PlatformType.ens,
    value: 'vitalik.eth',
  },
  {
    platform: PlatformType.lens,
    value: 'stani.lens',
  },
  {
    platform: PlatformType.farcaster,
    value: 'pseudobun',
  },
];

export function EndorseeDialog() {
  const router = useRouter();

  // Global state
  const { changePlatform, changeDisplayValue } = useEndorsementStore(
    (state) => ({
      changePlatform: state.changePlatform,
      changeDisplayValue: state.changeDisplayValue,
    })
  );

  // Local state
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [isEthereumAddress, setIsEthereumAddres] = useState(false);

  // Functions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (isAddress(event.target.value)) {
      setIsEthereumAddres(true);
    } else if (isEthereumAddress) {
      setIsEthereumAddres(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold text-lg max-sm:w-full" size="lg">
          Who to Endorse?
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <div className="max-w-[525px] overflow-hidden max-sm:max-w-full">
          <div className="relative flex items-center">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search for Ethereum (ENS), Farcaster, Lens..."
              value={query}
              onChange={handleInputChange}
              className="pl-8 rounded-b-none"
            />
          </div>
          <div
            className={cn(
              'w-full p-2 bg-white rounded-2xl',
              query !== '' && 'hidden'
            )}
          >
            <div className="text-thin mb-2 text-gray-600 text-sm">
              Suggested Accounts
            </div>
            {SUGGESTED_ACCOUNTS.map((account) => {
              return (
                <Button
                  key={account.value}
                  onMouseDown={() => {
                    changePlatform(account.platform);
                    changeDisplayValue(account.value);
                    router.push(
                      `/?platform=${account.platform}&account=${account.value}`
                    );
                    setOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <div className="flex gap-x-2 items-center">
                    <SVG
                      fill={PLATFORM_DATA[account.platform].color}
                      src={PLATFORM_DATA[account.platform].icon}
                      width={20}
                      height={20}
                    />
                    {account.value}
                  </div>
                </Button>
              );
            })}
          </div>
          <div
            className={cn(
              'w-full p-2 bg-white rounded-2xl',
              query === '' && 'hidden'
            )}
          >
            <div className="text-thin mb-2 text-gray-600 text-sm">Results</div>
            <div className="w-full">
              {isEthereumAddress ? (
                <Button
                  onMouseDown={() => {
                    changePlatform(PlatformType.ethereum);
                    changeDisplayValue(query);
                    router.push(
                      `/?platform=${PlatformType.ethereum}&account=${query}`
                    );
                    setOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <div className="flex gap-x-2 items-center">
                    <SVG
                      fill={PLATFORM_DATA[PlatformType.ethereum].color}
                      src={PLATFORM_DATA[PlatformType.ethereum].icon}
                      width={20}
                      height={20}
                    />
                    {query}
                  </div>
                </Button>
              ) : (
                <>
                  <Button
                    onMouseDown={() => {
                      changePlatform(PlatformType.ens);
                      changeDisplayValue(`${query}.eth`);
                      router.push(
                        `/?platform=${PlatformType.ens}&account=${query}.eth`
                      );
                      setOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <div className="flex gap-x-2 items-center">
                      <SVG
                        fill={PLATFORM_DATA[PlatformType.ens].color}
                        src={PLATFORM_DATA[PlatformType.ens].icon}
                        width={20}
                        height={20}
                      />
                      {query}.eth
                    </div>
                  </Button>
                  <Button
                    onMouseDown={() => {
                      changePlatform(PlatformType.lens);
                      changeDisplayValue(`${query}.lens`);
                      router.push(
                        `/?platform=${PlatformType.lens}&account=${query}.lens`
                      );
                      setOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <div className="flex gap-x-2 items-center">
                      <SVG
                        fill={PLATFORM_DATA[PlatformType.lens].color}
                        src={PLATFORM_DATA[PlatformType.lens].icon}
                        width={20}
                        height={20}
                      />
                      {query}.lens
                    </div>
                  </Button>
                  <Button
                    onMouseDown={() => {
                      changePlatform(PlatformType.farcaster);
                      changeDisplayValue(query);
                      router.push(
                        `/?platform=${PlatformType.farcaster}&account=${query}`
                      );
                      setOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <div className="flex gap-x-2 items-center">
                      <SVG
                        fill={PLATFORM_DATA[PlatformType.farcaster].color}
                        src={PLATFORM_DATA[PlatformType.farcaster].icon}
                        width={20}
                        height={20}
                      />
                      @{query}
                    </div>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
