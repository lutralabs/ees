import { EndorseeDialog } from './EndorseeDialog';
import { EndorseeBadge } from './EndorseeBadge';
import { PlatformType } from '@/utils/platform';
import { getMinimalProfileInfoByPlatform } from '@/lib/airstack';
import { SearchParamsStateSync } from './SearchParamsStateSync';
import { Skeleton } from '@/components/ui/skeleton';
import { getMinimalProfileFromAddress } from '@/lib/airstack/getMinimalProfileFromAddress';
import { ProfileAvatarSkeleton } from '@/components/ProfileAvatar';

type EndorseeProps = {
  platform: PlatformType;
  displayValue: string | null;
  intro: boolean;
};

export const Endorsee = async ({
  platform,
  displayValue,
  intro,
}: EndorseeProps) => {
  let address: `0x${string}` | null;
  let avatar;
  let displayName = displayValue;

  if (intro) {
    return (
      <>
        <EndorseeBadge
          type={platform}
          handle={''}
          avatar={null}
          address={'0x'}
          intro={true}
        />
      </>
    );
  }

  const result =
    platform === PlatformType.ethereum
      ? await getMinimalProfileFromAddress(displayValue as `0x${string}`)
      : await getMinimalProfileInfoByPlatform(platform, displayValue);

  displayName = result.displayName;
  address = result.address;
  avatar = result.avatar;
  const error = result.error;

  if (address) {
    return (
      <>
        <EndorseeBadge
          type={platform}
          handle={displayName}
          avatar={avatar}
          address={address}
        />
        <SearchParamsStateSync address={address} />
      </>
    );
  }

  return (
    <div className="w-full">
      <EndorseeDialog />
      {error && (
        <div className="absolute mt-2 w-[200px] text-xs font-semibold text-red-500">
          {error}
        </div>
      )}
      <SearchParamsStateSync address={address} />
    </div>
  );
};

export const EndorseeSkeleton = () => {
  return (
    <>
      <div className="sm:mt-3">
        <ProfileAvatarSkeleton size="2xl" />
      </div>
      <div className="flex flex-col w-full lg:ml-4 gap-y-2 max-lg:items-center">
        <Skeleton className="w-[160px] h-[32px] rounded-full bg-primary-200" />
        <Skeleton className="w-[112px] h-[16px] rounded-full bg-primary-200" />
      </div>
    </>
  );
};
