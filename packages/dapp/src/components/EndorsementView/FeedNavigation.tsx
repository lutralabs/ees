'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type FeedNavigationProps = {
  endorsementTab: string;
};

export const FeedNavigation = ({ endorsementTab }: FeedNavigationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.delete('endorsementTab');

  return (
    <div className="px-2">
      <div className="gap-1 border-1 max-w-[244px] border-gray-200 shadow-sm max-sm:flex max-sm:flex-col sm:items-center justify-center rounded-md p-1 text-muted-foreground grid grid-cols-2 bg-gray-100">
        <Link
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          href={`${pathname}?${params.toString()}&endorsementTab=overview`}
          data-state={endorsementTab === 'overview' ? 'active' : ''}
          scroll={false}
          prefetch={false}
        >
          Overview
        </Link>
        <Link
          href={`${pathname}?${params.toString()}&endorsementTab=details`}
          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          data-state={endorsementTab === 'details' ? 'active' : ''}
          scroll={false}
          prefetch={false}
        >
          Details
        </Link>
      </div>
    </div>
  );
};
