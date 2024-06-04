import { useNameService, useProfile } from '@/hooks';
import React, { useMemo, useState } from 'react';
import { ProfileAvatar } from '../Profile/ProfileAvatar';
import { Card } from '../ui/card';
import { useRouter } from 'next/navigation';

type UserBadgeProps = {
  address: string;
  endorsements: number;
};

export const UserBadge = ({ address, endorsements }: UserBadgeProps) => {
  //TODO enable support for multiple platforms (optional platform)
  const { data, error, isLoading } = useProfile({
    value: address,
    enabled: true,
  });

  if (isLoading) {
    return <div />;
  }

  if (!data) {
    return <div />;
  }

  return (
    <LoadedUserBadge
      data={data}
      address={address}
      endorsements={endorsements}
    />
  );
};

const LoadedUserBadge = ({
  address,
  endorsements,
  data,
}: { address: string; endorsements: number; data: any[] }) => {
  const ens = useMemo(() => {
    return data.find((item) => {
      return item.platform === 'ens';
    });
  }, [data]);

  const secondary = useMemo(() => {
    if (ens) return null;
    return data[0];
  }, [ens, data]);

  const account = useMemo(() => {
    if (!ens) return secondary;
    return ens;
  }, [ens, secondary]);

  const router = useRouter();

  return (
    <div className="w-[128px] h-[120px] relative">
      <div className="w-full flex justify-center">
        <ProfileAvatar account={account} size={90} />
      </div>
      <Card
        className="absolute text-sm w-full bottom-[-16px] p-2 hover:bg-gray-50 animated-transition"
        onClick={() => {
          router.push(`/profile/${account.address}`);
        }}
      >
        <div className="w-full flex flex-col justify-center items-center font-medium">
          {account.displayName}
          <span className="font-normal text-primary">
            {endorsements} <span className="text-xs">Endorsements</span>
          </span>
        </div>
      </Card>
    </div>
  );
};
