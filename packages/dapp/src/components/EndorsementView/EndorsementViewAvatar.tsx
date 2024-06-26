import { getMinimalProfileFromAddress } from '@/lib/airstack/getMinimalProfileFromAddress';
import { formatAddress } from '@/utils';
import { ProfileAvatar } from '../ProfileAvatar';
import Link from 'next/link';

export const EndorsementViewAvatar = async ({
  address,
}: { address: `0x${string}` }) => {
  const data = await getMinimalProfileFromAddress(address);

  return (
    <Link
      href={`/profile/${address}?platform=ethereum`}
      prefetch={false}
      className="flex items-center overflow-hidden cursor-pointer"
    >
      <ProfileAvatar avatar={data.avatar} address={address} size="lg" />
      <div className="ml-2 max-w-32">
        <div className="font-medium text-md text-primary-500 truncate hover:underline hover:text-primary-600">
          {data.displayName ?? formatAddress(address)}
        </div>
      </div>
    </Link>
  );
};
