import { Card } from '@/components/ui/card';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { getMinimalProfileFromAddress } from '@/lib/airstack/getMinimalProfileFromAddress';
import { formatAddress } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatEther } from 'viem';
import Link from 'next/link';

type UserBadgeProps = {
  address: `0x${string}`;
  donationAmount?: string;
};

export const UserBadge = async ({
  address,
  donationAmount,
}: UserBadgeProps) => {
  const data = await getMinimalProfileFromAddress(address);

  const value = `${Number(formatEther(BigInt(donationAmount ?? '0'))).toFixed(
    4
  )} ETH`;

  return (
    <Link
      className="cursor-pointer"
      prefetch={false}
      href={`/profile/${address}?platform=ethereum`}
    >
      <div className="flex justify-center items-center">
        <div className="w-[128px] h-[120px] relative">
          <div className="w-full flex justify-center">
            <ProfileAvatar avatar={data.avatar} address={address} size="3xl" />
          </div>
          <Card className="absolute h-18 text-sm w-full bottom-[-16px] p-2 hover:bg-gray-50 animated-transition overflow-hidden text-nowrap">
            <div className="w-full flex flex-col justify-center items-center font-medium">
              <div className="pb-1">
                {data.displayName ?? formatAddress(address)}
              </div>
              {donationAmount && (
                <>
                  <div className="font-normal text-primary text-center text-xs">
                    Tips
                  </div>
                  <div className="font-normal text-primary text-center text-xs">
                    {value}
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Link>
  );
};

export const UserBadgeSkeleton = ({
  isEndorsementBadge,
}: { isEndorsementBadge: boolean }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[128px] h-[120px] relative">
        <div className="w-full flex justify-center">
          <Skeleton
            className={cn(
              'absolute rounded-full bg-primary-200',
              'w-[96px] h-[96px]'
            )}
          />
        </div>
        <Card className="absolute h-18 text-sm w-full bottom-[-16px] p-2 hover:bg-gray-50 animated-transition">
          <div className="w-full flex flex-col gap-y-2 justify-center items-center font-medium">
            <Skeleton className="w-24 h-4 pb-1 rounded-full bg-primary-200" />
            {!isEndorsementBadge && (
              <>
                <Skeleton className="w-20 h-3 rounded-full bg-primary-200" />
                <Skeleton className="w-12 h-3 rounded-full bg-primary-200" />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
