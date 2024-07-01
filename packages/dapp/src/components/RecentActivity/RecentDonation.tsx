import type { RecentDonationType } from '@/lib/ees';
import {
  ProfileAvatar,
  ProfileAvatarSkeleton,
} from '@/components/ProfileAvatar';
import { CHAIN_ID_TO_NETWORK_NAME, formatAddress } from '@/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { DEFAULT_CHAIN_ID } from '@/lib/contracts';
import { formatEther } from 'viem';
import { Skeleton } from '@/components/ui/skeleton';

dayjs.extend(relativeTime);

type RecentDonationProps = RecentDonationType & {
  chainId: number;
};

export const RecentDonation = ({
  createdAtTimestamp,
  amount,
  from,
  to,
  chainId,
}: RecentDonationProps) => {
  let network = CHAIN_ID_TO_NETWORK_NAME[chainId ?? DEFAULT_CHAIN_ID];
  network = network ?? CHAIN_ID_TO_NETWORK_NAME[DEFAULT_CHAIN_ID];

  return (
    <div className="grid grid-cols-10 justify-between items-center max-h-24">
      <div className="py-4 col-span-3 ">
        <Link
          className="flex flex-col w-full gap-y-1 justify-center items-center overflow-hidden hover:underline"
          prefetch={false}
          href={`/profile/${from.address}?platform=ethereum&network=${network}`}
        >
          <ProfileAvatar
            address={from.address as `0x${string}`}
            avatar={from.avatar}
            size="lg"
          />
          <div className="w-full text-center text-sm font-semibold line-clamp-1">
            {from.displayName ?? formatAddress(from.address as `0x${string}`)}
          </div>
        </Link>
      </div>
      <div className="py-4 px-4 col-span-4 flex flex-col gap-y-0.5 justify-center items-center text-center w-full overflow-hidden">
        <div className="text-sm font-semibold truncate text-primary-500">
          {formatEther(BigInt(Number(amount)) ?? BigInt(0))} ETH
        </div>
        <div className="text-xs text-muted-foreground">
          {dayjs.unix(Number(createdAtTimestamp)).fromNow()}
        </div>
      </div>

      <div className="py-4 col-span-3">
        <Link
          className="flex flex-col w-full gap-y-1 justify-center items-center overflow-hidden hover:underline"
          prefetch={false}
          href={`/profile/${to.address}?platform=ethereum&network=${network}`}
        >
          <ProfileAvatar
            address={to.address as `0x${string}`}
            avatar={to.avatar}
            size="lg"
          />
          <div className="w-full text-center text-sm font-semibold line-clamp-1">
            {to.displayName ?? formatAddress(to.address as `0x${string}`)}
          </div>
        </Link>
      </div>
    </div>
  );
};

export const RecentDonationSkeleton = () => {
  return (
    <div className="grid grid-cols-10 justify-between items-center max-h-24">
      <div className="py-4 col-span-3 ">
        <div className="flex flex-col w-full gap-y-1 justify-center items-center overflow-hidden">
          <ProfileAvatarSkeleton size="lg" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>
      <div className="py-4 px-4 col-span-4 flex flex-col gap-y-1 justify-center items-center text-center w-full overflow-hidden">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-3 w-24 rounded-full" />
      </div>

      <div className="py-4 col-span-3">
        <div className="flex flex-col w-full gap-y-1 justify-center items-center overflow-hidden">
          <ProfileAvatarSkeleton size="lg" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
};
