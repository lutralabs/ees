'use client';

import { PLATFORM_DATA, PlatformType } from '@/utils/platform';
import { cn } from '@/lib/utils';
import { formatAddress } from '@/utils';
import { MemoizedSVG } from '@/components/MemoizedSVG';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { CopyIcon } from '@/components/CopyIcon';
import { useEffect, useMemo, useState } from 'react';
import { useEndorsementStore } from '@/stores';
import { ENDORSEMENT_OPTIONS } from '../EndorseForm/EndorseeCard';

type EndorseeBadgeProps = {
  type: PlatformType;
  avatar: string | null;
  handle: string | null;
  address: `0x${string}`;
  intro?: boolean;
};

const introEndorsees = [
  {
    type: PlatformType.ens,
    avatar: '/images/kersic_eth.jpg',
    handle: 'kersic.eth',
    address: '0x7c0d681098a9d46bd34637870c3afa4bfc9ec720',
  },
  {
    type: PlatformType.ens,
    avatar: '/images/pseudobun_eth.jpg',
    handle: 'pseudobun.eth',
    address: '0x32b1172e786a31a65b46710cd946b2521e13ac96',
  },
  {
    type: PlatformType.lens,
    avatar: '/images/martines3000.png',
    handle: 'martines3000',
    address: '0xa1ea22af561b949278898edd4aa1098ba7927fd9',
  },
  {
    type: PlatformType.ens,
    avatar: '/images/kruskal_eth.png',
    handle: 'kruskal.eth',
    address: '0x77b3da73472f6c6f39803048b8546392e3935cff',
  },
  {
    type: PlatformType.ens,
    avatar: null,
    handle: 'andy9.eth',
    address: '0xd78a2a13176c01850a694acd7ae4ab4545acf421',
  },
] as EndorseeBadgeProps[];

export const EndorseeBadge = ({
  type,
  avatar,
  handle,
  address,
  intro = false,
}: EndorseeBadgeProps) => {
  const changeEndorsementType = useEndorsementStore(
    (state) => state.changeEndorsementType
  );

  const [index, setIndex] = useState(0);
  const [endorsementTypeIndex, setEndorsementTypeIndex] = useState(0);

  const user = useMemo(
    () =>
      intro
        ? introEndorsees[index]
        : {
            type,
            avatar,
            handle,
            address,
          },
    [index]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (intro) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % introEndorsees.length);
        setEndorsementTypeIndex(
          (prevIndex) => (prevIndex + 1) % ENDORSEMENT_OPTIONS.length
        );
      }, 2000);
    }
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    changeEndorsementType(ENDORSEMENT_OPTIONS[endorsementTypeIndex].value);
  }, [index]);

  switch (user.type) {
    case PlatformType.ens:
    case PlatformType.lens:
    case PlatformType.farcaster:
    case PlatformType.ethereum: {
      return (
        <>
          <div className="relative sm:mt-3">
            <ProfileAvatar
              avatar={user.avatar}
              address={user.address}
              size="2xl"
            />
            <div className={'absolute -bottom-2 -right-2'}>
              <MemoizedSVG
                fill={PLATFORM_DATA[user.type].color as string}
                className={cn(
                  'p-1 rounded-full',
                  user.type === PlatformType.lens && 'bg-green-100',
                  user.type === PlatformType.farcaster && 'bg-purple-100',
                  user.type === PlatformType.ens ||
                    (user.type === PlatformType.ethereum && 'bg-blue-100')
                )}
                src={PLATFORM_DATA[user.type].icon as string}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="w-full sm:ml-4">
            <div className="text-xl sm:text-3xl font-semibold max-lg:text-center">
              {user.handle}
            </div>
            <div className="flex items-center text-sm sm:text-md text-gray-600 font-normal max-lg:justify-center gap-x-1">
              {formatAddress(user.address)}
              <CopyIcon value={user.address} />
            </div>
          </div>
        </>
      );
    }
    default:
      return <></>;
  }
};
