import React from 'react';
import { EndorsementViewAvatar } from './EndorsementViewAvatar';
import { ProfileAvatar } from '../ProfileAvatar';

type OverviewProps = {
  endorser: string;
  endorsementType: string;
  endorsee: string;
  endorseeAvatar: string;
  comment: string;
  uid: string;
};

export const Overview = ({
  endorser,
  endorsementType,
  endorsee,
  endorseeAvatar,
  comment,
  uid,
}: OverviewProps) => {
  return (
    <div className="p-6 flex flex-col justify-between bg-contain bg-no-repeat bg-share-bg md:w-[600px] md:h-[316px]">
      <div className="flex max-md:mb-2 items-center gap-x-2">
        <div className="font-medium text-xs sm:text-md md:text-lg">
          Endorsed by
        </div>
        <EndorsementViewAvatar address={endorser} size="sm" />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <div className="hidden sm:block">
            <ProfileAvatar avatar={endorseeAvatar} address="0x" size="lg" />
          </div>

          <div className="sm:hidden block">
            <ProfileAvatar avatar={endorseeAvatar} address="0x" size="sm" />
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
  );
};
