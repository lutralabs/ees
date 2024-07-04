'use client';

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { EXPLORERS } from '@/lib/contracts/explorers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CopyIcon } from '../CopyIcon';
import { formatAddress } from '@/utils';

dayjs.extend(relativeTime);

type DetailsProps = {
  chainId: number;
  endorserAvatar: any;
  endorserAddress: string;
  endorsementType: string;
  comment: string | null;
  timestamp: number;
  txid: string;
  uid: string;
  revoked: boolean;
};

const LabelField = ({
  label,
  description,
}: { label: string; description: string }) => {
  return (
    <div className="flex flex-col gap-y-1 max-sm:mt-4">
      <div className="flex items-center gap-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InformationCircleIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="text-md text-gray-600">{label}</div>
      </div>
    </div>
  );
};

export const Details = ({
  chainId,
  endorserAvatar,
  endorserAddress,
  endorsementType,
  comment,
  timestamp,
  txid,
  uid,
  revoked,
}: DetailsProps) => {
  return (
    <div>
      <div className="grid max-sm:grid-cols-1 sm:grid-cols-[35%_65%] gap-y-2 mt-4">
        <LabelField label="Endorser" description="The endorser" />
        {endorserAvatar}
        <LabelField
          label="Endorser Address"
          description="The address of the endorser"
        />
        <div className="flex items-center gap-x-1">
          <Link
            href={`/profile/${endorserAddress}?platform=ethereum`}
            prefetch={false}
            className="flex items-center overflow-hidden cursor-pointer text-primary-500 hover:underline hover:text-primary-600 animated-transition "
          >
            {formatAddress(endorserAddress)}
          </Link>
          <CopyIcon value={endorserAddress} />
        </div>
        <LabelField
          label="Endorsement Type"
          description="Type of the endorsement"
        />
        <div className="font-medium">{endorsementType}</div>
        <LabelField
          label="Endorsement Type"
          description="Type of the endorsement"
        />
        <div className="font-medium">
          {comment && <div>"{comment}"</div>}
          {!comment && <div>No comment was added.</div>}
        </div>
        <LabelField
          label="Validity"
          description="Revoked endorsements are no longer valid"
        />
        <div className="">{revoked ? 'Invalid' : 'Valid'}</div>
        <hr className="sm:col-span-2 my-2 max-sm:mt-4" />
        <LabelField
          label="Timestamp"
          description="When the endorsement has been made."
        />
        <div>{dayjs.unix(timestamp).fromNow()}</div>
        <LabelField
          label="Transaction ID"
          description="Id of the transaction."
        />
        <a
          href={`${EXPLORERS[chainId]}/tx/${txid}`}
          target="_blank"
          className="text-primary-500 hover:underline hover:text-primary-600 animated-transition "
          rel="noreferrer"
        >
          {txid}
        </a>
        <LabelField
          label="Attestation UID"
          description="UID of the EAS Attestation"
        />
        <a
          href={`https://base.easscan.org/attestation/view/${uid}`}
          target="_blank"
          className="text-primary-500 hover:underline hover:text-primary-600 animated-transition "
          rel="noreferrer"
        >
          {uid}
        </a>
      </div>
    </div>
  );
};
