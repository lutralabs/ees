'use client';
import React from 'react';
import { ProfileAvatar } from '../ProfileAvatar';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { APP_URL, startsWithVowel } from '@/utils';
import Link from 'next/link';
import { MemoizedImage } from '../MemoizedImage';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';

type OverviewProps = {
  endorser: string;
  endorsementType: string;
  endorsee: string;
  endorseeAvatar: string;
  comment: string | null;
  endorserAvatar: any;
};

export const Overview = ({
  endorsementType,
  endorsee,
  endorseeAvatar,
  comment,
  endorserAvatar,
}: OverviewProps) => {
  const pathname = usePathname();
  const query = useSearchParams();

  const fullPath = `${APP_URL}${pathname}?${query.toString()}`;

  return (
    <div>
      <div className="p-6 flex flex-col justify-between bg-contain bg-no-repeat bg-share-bg md:w-[600px] md:h-[316px]">
        <div className="flex max-md:mb-2 items-center gap-x-2">
          <div className="font-medium text-xs sm:text-md md:text-lg">
            Endorsed by
          </div>
          {endorserAvatar}
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <div className="hidden sm:block">
              <ProfileAvatar
                avatar={endorseeAvatar}
                address={endorsee as `0x${string}`}
                size="lg"
              />
            </div>

            <div className="sm:hidden block">
              <ProfileAvatar
                avatar={endorseeAvatar}
                address={endorsee as `0x${string}`}
                size="sm"
              />
            </div>
            <div className="text-primary text-xs sm:text-md md:text-3xl font-semibold">
              {endorsee}
            </div>
          </div>
          <div className="font-medium text-xs sm:text-md md:text-2xl">for</div>
          <div className="text-xs sm:text-md md:text-3xl font-semibold text-primary">
            {endorsementType}
          </div>
        </div>
        <div className="mb-4 text-xs sm:text-md md:text-xl italic text-gray-700">
          {comment && <div>"{comment}"</div>}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex max-sm:flex-col gap-x-2 items-center">
          <div>Share this endorsement on</div>
          <div className="flex items-center gap-x-2 max-sm:pt-2">
            <TwitterShareButton
              url={fullPath}
              title={`I endorsed ${endorsee} as ${
                startsWithVowel(endorsementType.toLowerCase()) ? 'an' : 'a'
              } ${endorsementType} on @endorsedotfun!`}
              hashtags={['endorse', 'reputation']}
              className="flex items-center justify-center gap-x-2"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <Link
              prefetch={false}
              href={`https://hey.xyz/?text=${encodeURIComponent(
                `Check out ${endorsee}'s endorsement!\n ${fullPath}\n`
              )}&hashtags=${encodeURIComponent('reputation,endorse')}`}
              target="_blank"
            >
              <MemoizedImage
                src="/icons/hey_icon.png"
                alt="hey"
                width={32}
                height={32}
              />
            </Link>
            <Link
              prefetch={false}
              href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
                `Check out ${endorsee}'s endorsement!\n ${fullPath}\n`
              )}&embeds[]=${fullPath}`}
              target="_blank"
            >
              <MemoizedImage
                src="/icons/warpcast_icon.png"
                alt="warpcast"
                className="rounded-full"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-x-2">
          <Input value={fullPath} readOnly />
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigator.clipboard.writeText(fullPath)}
          >
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export const OverviewSkeleton = () => {
  return (
    <div>
      <Skeleton className="md:w-[600px] md:h-[316px] bg-gray-200 rounded-sm" />
      <Skeleton className="w-full mt-4 h-24 bg-gray-200 rounded-sm" />
    </div>
  );
};
