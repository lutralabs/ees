import { PLATFORM_DATA, PlatformType } from '@/utils/platform';
import { cn } from '@/lib/utils';
import { formatAddress } from '@/utils';
import { MemoizedSVG } from '@/components/MemoizedSVG';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { CopyIcon } from '@/components/CopyIcon';

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
  switch (type) {
    case PlatformType.ens:
    case PlatformType.lens:
    case PlatformType.farcaster:
    case PlatformType.ethereum: {
      return (
        <>
          <div className="relative sm:mt-3">
            <ProfileAvatar avatar={avatar} address={address} size="2xl" />
            <div className={'absolute -bottom-2 -right-2'}>
              <MemoizedSVG
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
            <div className="text-xl sm:text-3xl font-semibold max-lg:text-center">
              {handle}
            </div>
            <div className="flex items-center text-sm sm:text-md text-gray-600 font-normal max-lg:justify-center gap-x-1">
              {formatAddress(address)}
              <CopyIcon value={address} />
            </div>
          </div>
        </>
      );
    }
    default:
      return <></>;
  }
};
