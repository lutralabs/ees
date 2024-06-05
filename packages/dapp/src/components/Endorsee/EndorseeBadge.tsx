'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import SVG from 'react-inlinesvg';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import {
  PLATFORM_DATA,
  PlatformType,
  validateOrGetDefaultPlatform,
} from '@/utils/platform';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { formatAddress } from '@/utils';
import { Check } from 'lucide-react';

type EndorseeBadgeProps = {
  type: PlatformType;
  avatar: string | null;
  handle: string | null;
  address: `0x${string}`;
};

export const EndorseeBadge = ({
  type,
  avatar,
  handle,
  address,
}: EndorseeBadgeProps) => {
  // Local state
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // Hooks
  const Avatar = useMemo(() => {
    if (!avatar) {
      return (
        <div className="h-[80px] w-[80px] flex items-center justify-center text-3xl font-semibold bg-primary-200 text-primary-800 rounded-full">
          {/* FIXME: First leter of handle if it exists */}TODO
        </div>
      );
    }

    return (
      <div className="relative h-[80px] w-[80px]">
        <Image
          className={cn('absolute rounded-full')}
          src={avatar}
          alt="Avatar"
          width={80}
          height={80}
          onLoad={() => setAvatarLoading(false)}
        />
        <Skeleton
          className={cn(
            'absolute h-[80px] w-[80px] rounded-full bg-primary-200',
            !avatarLoading && 'hidden'
          )}
        />
      </div>
    );
  }, [avatar, avatarLoading, handle]);

  // Functions
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  switch (type) {
    case PlatformType.ens:
    case PlatformType.lens:
    case PlatformType.farcaster:
    case PlatformType.ethereum: {
      return (
        <>
          <div className="relative sm:mt-3">
            {Avatar}
            <div className={'absolute -bottom-2 -right-2'}>
              <SVG
                fill={PLATFORM_DATA[type].color as string}
                className={cn(
                  'p-1 rounded-full',
                  type === PlatformType.lens && 'bg-green-100',
                  type === PlatformType.farcaster && 'bg-purple-100',
                  type === PlatformType.ens ||
                    (type === PlatformType.ethereum && 'bg-blue-100')
                )}
                src={PLATFORM_DATA[type].icon as string}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="w-full sm:ml-4">
            <div className="text-xl sm:text-3xl font-semibold max-sm:text-center">
              {handle}
            </div>
            <div className="flex items-center text-sm sm:text-md text-gray-600 font-normal max-sm:justify-center gap-x-1">
              {formatAddress(address)}
              <DocumentDuplicateIcon
                className={cn(
                  'w-4 h-4 cursor-pointer hover:text-primary-400',
                  isCopied && 'hidden'
                )}
                onMouseDown={handleCopy}
              />
              <Check
                className={cn(
                  'w-4 h-4 cursor-pointer hover:text-primary-400',
                  !isCopied && 'hidden'
                )}
              />
            </div>
          </div>
        </>
      );
    }
    default:
      return <></>;
  }
};
