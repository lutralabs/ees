import { useMemo } from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { Badges } from './Badges';
import { ShareDialog } from './ShareDialog';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type UserProps = {
  data: any[];
  account: any;
  description?: string;
};

export const User = ({ data, account, description }: UserProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-2">
      <ProfileAvatar account={account} />
      <div className="text-3xl font-semibold">{account.displayName}</div>
      <div className="flex gap-x-1 items-center text-md text-gray-600 font-medium">
        <div className="bg-slate-200 px-4 flex items-center py-1 rounded-full">
          {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}

          <button
            className="ml-1 hover:opacity-80"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(account.address);
            }}
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
          </button>
        </div>
        <ShareDialog
          account={account}
          shareLink="http://localhost:3000/profile/pseudobun.eth"
        />
      </div>
      {description && <div className="text-lg mt-4">{description}</div>}
      <div className="mt-4">
        <Badges accounts={data} />
      </div>
      <div className="mt-8 w-full flex items-center justify-center px-8">
        <Button
          size={'lg'}
          onClick={() => {
            router.push(
              `/?platform=${account.platform}&account=${account.identity}`
            );
          }}
          className="lg:text-lg lg:font-semibold w-full"
        >
          Endorse {account.displayName}
        </Button>
      </div>
    </div>
  );
};
