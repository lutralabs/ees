import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserBadge, UserBadgeSkeleton } from './UserBadge';
import { getTopEndorsersAndDonators } from '@/lib/ees';
import React, { Fragment, Suspense } from 'react';
import { cn } from '@/lib/utils';

type DashboardProps = {
  account: `0x${string}`;
  network: number;
};

export const Dashboard = async ({ account, network }: DashboardProps) => {
  const { topEndorsers, topDonators, error } = await getTopEndorsersAndDonators(
    { chainId: network, account }
  );

  return (
    <div className="flex flex-col gap-y-2 overflow-auto">
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Top Endorsers</CardTitle>
          <CardDescription>
            Most endorsed accounts, that endorsed this profile!
          </CardDescription>
        </CardHeader>
        <CardContent
          className={cn(
            'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 grid-rows-3 sm:grid-rows-2 xl:grid-rows-1 gap-y-12 pb-8',
            topEndorsers.length <= 2 && 'grid-rows-1',
            topEndorsers.length <= 3 && 'sm:grid-rows-1',
            topEndorsers.length > 2 &&
              topEndorsers.length <= 4 &&
              'max-sm:grid-rows-2'
          )}
        >
          {error && <div className="text-sm text-red-500">{error}</div>}
          {topEndorsers.length === 0 && (
            <div className="text-sm text-gray-600">No endorsements yet</div>
          )}
          {topEndorsers.map((endorser) => (
            <Fragment key={endorser.id}>
              <Suspense fallback={<UserBadgeSkeleton />}>
                <UserBadge
                  address={endorser.from.id}
                  totalEndorsements={endorser.from.totalEndorsementsReceived}
                />
              </Suspense>
            </Fragment>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Top Donators</CardTitle>
          <CardDescription>
            Accounts that donated the most to this profile!
          </CardDescription>
        </CardHeader>
        <CardContent
          className={cn(
            'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 grid-rows-3 sm:grid-rows-2 xl:grid-rows-1 gap-y-12 pb-8',
            topDonators.length <= 2 && 'grid-rows-1',
            topDonators.length <= 3 && 'sm:grid-rows-1',
            topEndorsers.length > 2 &&
              topDonators.length <= 4 &&
              'max-sm:grid-rows-2'
          )}
        >
          {error && <div className="text-sm text-red-500">{error}</div>}
          {topDonators.length === 0 && (
            <div className="text-sm text-gray-600">No donations yet</div>
          )}
          {topDonators.map((donator) => (
            <Fragment key={donator.id}>
              <Suspense fallback={<UserBadgeSkeleton />}>
                <UserBadge
                  address={donator.from.id}
                  donationAmount={donator.donationAmount}
                />
              </Suspense>
            </Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
