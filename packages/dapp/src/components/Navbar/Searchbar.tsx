'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import SVG from 'react-inlinesvg';
import { isAddress } from 'viem';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { PLATFORM_DATA, PlatformType } from '@/utils/platform';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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

export const Searchbar = () => {
  // Local state
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEthereumAddress, setIsEthereumAddres] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Functions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (isAddress(event.target.value)) {
      setIsEthereumAddres(true);
    } else if (isEthereumAddress) {
      setIsEthereumAddres(false);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('dropdown');
    const input = document.getElementById('input');

    if (
      dropdown &&
      !dropdown.contains(target) &&
      input &&
      !input.contains(target)
    ) {
      setShowDropdown(false);
    }
  };

  // Hooks
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const DropdownContent = useMemo(() => {
    return (
      <>
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
              <Link
                key={account.value}
                onClick={() => {
                  setShowDropdown(false);
                  setModalOpen(false);
                }}
                href={`/profile/${account.value}?platform=${account.platform}`}
                className="w-full justify-start gap-x-2 hover:bg-gray-100 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
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
              </Link>
            );
          })}
        </div>
        <div className={cn('w-full', query === '' && 'hidden')}>
          {isEthereumAddress ? (
            <Link
              onClick={() => {
                setShowDropdown(false);
                setModalOpen(false);
              }}
              href={`/profile/${query}?platform=${PlatformType.ethereum}`}
              className="w-full justify-start gap-x-2 hover:bg-gray-100 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
            >
              <SVG
                fill={PLATFORM_DATA[PlatformType.ethereum].color}
                src={PLATFORM_DATA[PlatformType.ethereum].icon}
                width={20}
                height={20}
              />
              {query}
            </Link>
          ) : (
            <div className="w-full p-2 bg-white rounded-2xl">
              <div className="text-thin mb-2 text-gray-600 text-sm">
                Results
              </div>
              <Link
                onClick={() => {
                  setShowDropdown(false);
                  setModalOpen(false);
                }}
                href={`/profile/${query}.eth?platform=${PlatformType.ens}`}
                className="w-full justify-start gap-x-2 hover:bg-gray-100 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
              >
                <SVG
                  fill={PLATFORM_DATA[PlatformType.ens].color}
                  src={PLATFORM_DATA[PlatformType.ens].icon}
                  width={20}
                  height={20}
                />
                {query}.eth
              </Link>
              <Link
                onClick={() => {
                  setShowDropdown(false);
                  setModalOpen(false);
                }}
                href={`/profile/${query}.lens?platform=${PlatformType.lens}`}
                className="w-full justify-start gap-x-2 hover:bg-gray-100 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
              >
                <SVG
                  fill={PLATFORM_DATA[PlatformType.lens].color}
                  src={PLATFORM_DATA[PlatformType.lens].icon}
                  width={20}
                  height={20}
                />
                {query}.lens
              </Link>
              <Link
                onClick={() => {
                  setShowDropdown(false);
                  setModalOpen(false);
                }}
                href={`/profile/${query}?platform=${PlatformType.farcaster}`}
                className="w-full justify-start gap-x-2 hover:bg-gray-100 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
              >
                <SVG
                  fill={PLATFORM_DATA[PlatformType.farcaster].color}
                  src={PLATFORM_DATA[PlatformType.farcaster].icon}
                  width={20}
                  height={20}
                />
                @{query}
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }, [query]);

  return (
    <>
      <Button
        onMouseDown={() => setModalOpen(true)}
        size="icon"
        className="h-10 w-10 bg-white text-gray-900 hover:bg-white hover:scale-105 transition-all duration-200 lg:hidden shadow-lg"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </Button>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[525px] lg:hidden">
          <div className="sm:max-w-[525px]">
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search for Ethereum (ENS), Farcaster, Lens..."
                value={query}
                onChange={handleInputChange}
                className="pl-8 rounded-b-none"
              />
            </div>
            {DropdownContent}
          </div>
        </DialogContent>
      </Dialog>
      <div className="relative w-full max-lg:hidden">
        <div className="relative w-full flex justify-center">
          <div
            id="input"
            className="relative flex flex-1 md:max-w-md xl:max-w-2xl"
          >
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search for Ethereum (ENS), Farcaster, Lens..."
              value={query}
              isSearchbar={true}
              onChange={handleInputChange}
              className="pl-8"
              onFocus={() => setShowDropdown(true)}
            />
          </div>
        </div>
        <div className="relative w-full flex justify-center">
          <div
            id="dropdown"
            className={cn(
              'absolute w-full md:max-w-md xl:max-w-2xl mt-1 p-2 bg-white rounded-2xl shadow-lg border-1 border-blue-100',
              !showDropdown && 'hidden'
            )}
          >
            {DropdownContent}
          </div>
        </div>
      </div>
    </>
  );
};
