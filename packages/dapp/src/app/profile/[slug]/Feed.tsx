import Link from 'next/link';
import type { PlatformType } from '@/utils';
import { Dashboard } from './Dashboard';
import { Explorer } from './Explorer';
import { SocialGraph } from './SocialGraph';

const TABS = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'explorer', label: 'Endorsement Explorer' },
  { value: 'graph', label: 'Social Graph' },
] as const;

type TabType = (typeof TABS)[number]['value'];

const validateOrGetDefaultTab = (tab: string | undefined) => {
  if (!tab) return 'dashboard';
  // Check if the tab is valid
  const lowercaseTab = tab.toLowerCase();

  if (TABS.some((item) => item.value === lowercaseTab)) {
    return lowercaseTab as TabType;
  }

  // If the tab is not valid, return the default tab
  return 'dashboard';
};

type FeedProps = {
  account: `0x${string}`;
  platform: PlatformType;
  tab?: string;
  network: number;
};

export const Feed = ({ account, platform, tab, network }: FeedProps) => {
  const _tab = validateOrGetDefaultTab(tab);

  return (
    <div>
      <div className="max-sm:flex max-sm:flex-col sm:h-10 sm:items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-3 bg-gray-100">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          href={`?platform=${platform}&tab=dashboard`}
          data-state={_tab === 'dashboard' ? 'active' : ''}
          scroll={false}
        >
          Dashboard
        </Link>
        <Link
          href={`?platform=${platform}&tab=explorer`}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={_tab === 'explorer' ? 'active' : ''}
          scroll={false}
        >
          Endorsement Explorer 🚧
        </Link>
        <Link
          href={`?platform=${platform}&tab=graph`}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={_tab === 'graph' ? 'active' : ''}
          scroll={false}
        >
          Social Graph 🚧
        </Link>
      </div>
      <div className="mt-4 w-full">
        {_tab === 'dashboard' && (
          <Dashboard account={account} network={network} />
        )}
        {_tab === 'explorer' && <Explorer />}
        {_tab === 'graph' && <SocialGraph />}
      </div>
    </div>
  );
};
