import { getEndorsementsAndDonationsServer } from '@/lib/ees';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import {
  RecentActivityView,
  RecentActivityViewSkeleton,
} from './RecentActivityView';

type RecentActivityProps = {
  network: number;
};

export const RecentActivity = async ({ network }: RecentActivityProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recentEndorsementsAndDonations', network],
    queryFn: () => getEndorsementsAndDonationsServer(network),
    staleTime: 15 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecentActivityView network={network} />
    </HydrationBoundary>
  );
};

export const RecentActivitySkeleton = () => {
  return <RecentActivityViewSkeleton />;
};
