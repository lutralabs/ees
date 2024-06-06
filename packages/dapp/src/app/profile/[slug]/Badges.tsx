import type { GetProfileInfoQuery } from '@/__generated__/airstack/graphql';
import { MemoizedSVG } from '@/components/MemoizedSVG';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PLATFORM_DATA, PlatformType } from '@/utils';

type BadgesProps = {
  data: GetProfileInfoQuery;
};

const Badge = ({
  identity,
  platform,
}: { identity: string; platform: PlatformType }) => {
  const link = PLATFORM_DATA[platform].urlPrefix + identity;
  return (
    <a
      href={link}
      target="_blank"
      className={cn(
        'flex items-center gap-x-1 p-1 px-4 rounded-full w-min text-nowrap hover:opacity-80 animated-transition',
        platform === PlatformType.lens && 'bg-[#E2FFE5]',
        platform === PlatformType.farcaster && 'bg-[#F3E8FF]',
        platform === PlatformType.ens && 'bg-[#DBEDFF]'
      )}
      rel="noreferrer"
    >
      <MemoizedSVG
        fill={PLATFORM_DATA[platform].color}
        src={PLATFORM_DATA[platform].icon as string}
        width={20}
        height={20}
        loader={<Skeleton className="w-5 h-5 bg-gray-400" />}
      />
      {identity}
    </a>
  );
};

export const Badges = ({
  data: { Wallet, farcasterSocials, lensSocials },
}: BadgesProps) => {
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1.5 justify-center mt-4">
      {/* ENS */}
      {Wallet?.primaryDomain?.name && (
        <Badge
          identity={Wallet.primaryDomain.name}
          platform={PlatformType.ens}
        />
      )}
      {/* Lens */}
      {lensSocials?.Social?.map((item) => {
        if (!item.profileHandle) return null;

        return (
          <Badge
            key={item.profileHandle}
            identity={item.profileHandle}
            platform={PlatformType.lens}
          />
        );
      })}
      {/* Farcaster */}
      {farcasterSocials?.Social?.map((item) => {
        if (!item.profileHandle) return null;

        return (
          <Badge
            key={item.profileHandle}
            identity={item.profileHandle}
            platform={PlatformType.farcaster}
          />
        );
      })}
    </div>
  );
};
