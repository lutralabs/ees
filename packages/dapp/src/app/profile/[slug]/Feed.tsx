import Link from 'next/link';
import type { PlatformType } from '@/utils';
import { Summary } from './Summary';
import { Explorer } from './Explorer';
import { SocialGraph } from './SocialGraph';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { FeedNavigation } from './FeedNavigation';

const TABS = [
  { value: 'summary', label: 'Summary' },
  { value: 'explorer', label: 'Endorsement Explorer' },
  { value: 'graph', label: 'Social Graph' },
] as const;

type TabType = (typeof TABS)[number]['value'];

const validateOrGetDefaultTab = (tab: string | undefined) => {
  if (!tab) return 'summary';
  // Check if the tab is valid
  const lowercaseTab = tab.toLowerCase();

  if (TABS.some((item) => item.value === lowercaseTab)) {
    return lowercaseTab as TabType;
  }

  // If the tab is not valid, return the default tab
  return 'summary';
};

type FeedProps = {
  account: `0x${string}`;
  tab?: string;
  network: number;
  currentPage: number;
  totalEndorsementsReceived: number;
};

export const Feed = ({
  account,
  tab,
  network,
  currentPage,
  totalEndorsementsReceived,
}: FeedProps) => {
  const _tab = validateOrGetDefaultTab(tab);

  return (
    <div className="w-full overflow-auto">
      <FeedNavigation tab={_tab} />
      <div className="mt-4 w-full">
        <Suspense
          fallback={
            <div className="mt-4 w-full">
              <Skeleton className="w-full h-48 bg-gray-200 rounded-sm" />
            </div>
          }
        >
          {_tab === 'summary' && (
            <Summary account={account} network={network} />
          )}
          {_tab === 'explorer' && (
            <Explorer
              chainId={network}
              account={account}
              currentPage={currentPage}
              totalEndorsementsReceived={totalEndorsementsReceived}
            />
          )}
          {_tab === 'graph' && <SocialGraph />}
        </Suspense>
      </div>
    </div>
  );
};

export const FeedSkeleton = () => {
  return (
    <div>
      <div className="gap-1 max-sm:flex max-sm:flex-col sm:h-10 sm:items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-3 bg-gray-100">
        <Skeleton className="w-full h-[32px] bg-primary-200 rounded-sm" />
        <Skeleton className="w-full h-[32px] bg-primary-200 rounded-sm" />
        <Skeleton className="w-full h-[32px] bg-primary-200 rounded-sm" />
      </div>
      <div className="mt-4 w-full">
        <Skeleton className="w-full h-48 bg-gray-200 rounded-sm" />
      </div>
    </div>
  );
};
