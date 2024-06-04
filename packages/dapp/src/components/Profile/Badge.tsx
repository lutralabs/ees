import { cn } from '@/lib/utils';
import { PLATFORM_DATA } from '@/utils/platform';

import SVG from 'react-inlinesvg';

type BadgesProps = {
  account: any;
};

export const Badge = ({ account }: BadgesProps) => {
  if (account.platform === 'ethereum') return <></>;
  let link =
    PLATFORM_DATA[
      account.platform as
        | 'ethereum'
        | 'ens'
        | 'lens'
        | 'farcaster'
        | 'twitter'
        | 'github'
        | 'website'
    ].urlPrefix + account.identity;

  if (account.platform === 'lens') link = link.slice(0, -5);

  return (
    <a
      href={link}
      target="_blank"
      className={cn(
        'flex items-center gap-x-1 p-1 px-4 rounded-full w-min text-nowrap',
        'hover:opacity-80 animated-transition',
        account.platform === 'lens' && 'bg-green-100',
        account.platform === 'farcaster' && 'bg-purple-100',
        account.platform === 'ens' && 'bg-blue-100',
        account.platform === 'unstoppabledomains' && 'bg-blue-200',
        account.platform === 'twitter' && 'bg-primary-100',
        account.platform === 'github' && 'bg-gray-100',
        account.platform === 'website' && 'bg-gray-100'
      )}
      rel="noreferrer"
    >
      <SVG
        fill={
          PLATFORM_DATA[
            account.platform as 'ethereum' | 'ens' | 'lens' | 'farcaster'
          ].color
        }
        src={
          PLATFORM_DATA[
            account.platform as 'ethereum' | 'ens' | 'lens' | 'farcaster'
          ].icon as string
        }
        width={20}
        height={20}
      />
      {account.identity}
    </a>
  );
};
