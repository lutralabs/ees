import { getMinimalProfileFromAddress } from '@/lib/airstack/getMinimalProfileFromAddress';
import { formatAddress } from '@/utils';
import { ProfileAvatar } from '../ProfileAvatar';
import Link from 'next/link';

export const EndorsementViewAvatar = async ({
  address,
  size,
}: { address: `0x${string}`; size: 'sm' | 'md' | 'lg' }) => {
  const data = await getMinimalProfileFromAddress(address);
  const displayName = data.displayName ?? formatAddress(address);
  const avatar = data.avatar;

  return (
    <Link
      href={`/profile/${address}?platform=ethereum`}
      prefetch={false}
      className="flex items-center overflow-hidden cursor-pointer"
    >
      <ProfileAvatar avatar={avatar} address={address} size={size} />
      <div className="ml-2 max-w-32">
        <div className="font-medium sm:text-md md:text-lg text-xs text-primary-500 animated-transition max-md:truncate hover:underline hover:text-primary-600">
          {displayName}
        </div>
      </div>
    </Link>
  );
};
