import Image from 'next/image';
import { useMemo, useState } from 'react';
import SVG from 'react-inlinesvg';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { PLATFORM_DATA, PlatformType } from '@/utils/platform';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type EndorseeBadgeProps = {
  type: PlatformType;
  value: string;
  avatar: string | null;
  address: string;
};

export const EndorseeBadge = ({
  type,
  value,
  avatar,
  address,
}: EndorseeBadgeProps) => {
  const [avatarLoading, setAvatarLoading] = useState(true);

  const Avatar = useMemo(() => {
    if (!avatar) {
      return (
        <div className="w-[100px] h-[100px] flex items-center justify-center text-3xl font-semibold bg-primary-200 text-primary-800 rounded-full">
          {value[0].toUpperCase()}
        </div>
      );
    }

    return (
      <div>
        <Image
          className={cn('rounded-full', avatarLoading && 'fixed left-[-100px]')}
          src={avatar}
          alt={address}
          width={100}
          height={100}
          onLoadingComplete={() => setAvatarLoading(false)}
        />
        <Skeleton
          className={cn(
            'w-[68px] h-[68px] rounded-full bg-primary-200',
            !avatarLoading && 'hidden'
          )}
        />
      </div>
    );
  }, [avatar, avatarLoading, value]);

  switch (type) {
    case PlatformType.ethereum: {
      return (
        <div className="text-xl sm:text-3xl font-semibold flex items-center gap-x-1">
          {`${value.slice(0, 6)}...${value.slice(-4)}`}
          <button
            className="ml-1 hover:opacity-80"
            type="button"
            onMouseDown={() => {
              navigator.clipboard.writeText(value);
            }}
          >
            <DocumentDuplicateIcon className="w-6 h-6" />
          </button>
        </div>
      );
    }
    case PlatformType.ens:
    case PlatformType.lens:
    case PlatformType.farcaster: {
      return (
        <>
          <div className="relative">
            {Avatar}
            <div className={'absolute -bottom-2 -right-2'}>
              <SVG
                fill={PLATFORM_DATA[type].color as string}
                className={cn(
                  'p-1 rounded-full',
                  type === PlatformType.lens && 'bg-green-100',
                  type === PlatformType.farcaster && 'bg-purple-100',
                  type === PlatformType.ens && 'bg-blue-100'
                )}
                src={PLATFORM_DATA[type].icon as string}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="text-xl sm:text-3xl font-semibold">{value}</div>
            <div className="flex items-center text-sm sm:text-md text-gray-600 font-normal">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
              <button
                className="ml-1 hover:opacity-80"
                type="button"
                onMouseDown={() => {
                  navigator.clipboard.writeText(address);
                }}
              >
                <DocumentDuplicateIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      );
    }
    default:
      return <></>;
  }
};
