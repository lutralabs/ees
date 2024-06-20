'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type FeedNavigationProps = {
  tab: string;
};

export const FeedNavigation = ({ tab }: FeedNavigationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.delete('tab');

  return (
    <div className="px-2">
      <div className="gap-1 border-1 border-gray-200 shadow-md max-sm:flex max-sm:flex-col sm:items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-3 bg-gray-100">
        <Link
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          href={`${pathname}?${params.toString()}&tab=summary`}
          data-state={tab === 'summary' ? 'active' : ''}
          scroll={false}
          prefetch={false}
        >
          Summary
        </Link>
        <Link
          href={`${pathname}?${params.toString()}&tab=explorer`}
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={tab === 'explorer' ? 'active' : ''}
          scroll={false}
          prefetch={false}
        >
          Endorsement Explorer
        </Link>
        <Link
          href={`${pathname}?${params.toString()}&tab=graph`}
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={tab === 'graph' ? 'active' : ''}
          scroll={false}
          prefetch={false}
        >
          Social Graph 🚧
        </Link>
      </div>
    </div>
  );
};
