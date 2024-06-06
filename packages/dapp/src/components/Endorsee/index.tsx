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
  let error;
  let displayName = displayValue;

  if (intro) {
    address = '0x32b1172e786a31a65b46710cd946b2521e13ac96';
    avatar =
      'https://assets.airstack.xyz/v2/image/social/10/8GnKRP2z0DZmg1H4wesg4o9fmVVND1rhv9clPqF6y7sq7Dx5tYx7WfqYTbq3h4GtIJl8mNHSB7vBZyBkgRnAH8RZ3RK3pMKhg/liZlFLAwk2GndPk43U0vfTP/UBOqmmxBfJnOwWplobI3v1icOprrTz8fcWJ64YecoWETk1eLhwevNHdV450lUnYFBnqAvv2rB4wGXz7cACQh5X9kqcrLtceCiCf9ZQt8Cf184ePEE=/small.jpg';
    error = null;
  } else {
    const result =
      platform === PlatformType.ethereum
        ? await getMinimalProfileFromAddress(displayValue as `0x${string}`)
        : await getMinimalProfileInfoByPlatform(platform, displayValue);

    displayName = result.displayName;
    address = result.address;
    avatar = result.avatar;
    error = result.error;
  }

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
      <div className="flex flex-col w-full sm:ml-4 gap-y-2 max-sm:items-center">
        <Skeleton className="w-[160px] h-[32px] rounded-full bg-primary-200" />
        <Skeleton className="w-[112px] h-[16px] rounded-full bg-primary-200" />
      </div>
    </>
  );
};
