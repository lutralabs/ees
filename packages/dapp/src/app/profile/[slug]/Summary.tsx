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

type SummaryProps = {
  account: `0x${string}`;
  network: number;
};

export const Summary = async ({ account, network }: SummaryProps) => {
  const { topEndorsers, topDonators, error } = await getTopEndorsersAndDonators(
    { chainId: network, account }
  );

  return (
    <div className="flex flex-col gap-y-4 overflow-auto px-2 pb-2">
      <Card className="rounded-sm shadow-md border-2 border-b-1 border-gray-200">
        <CardHeader>
          <CardTitle>Top Endorsers</CardTitle>
          <CardDescription>Who already endorsed this profile?</CardDescription>
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
            <div className="text-sm text-gray-600">No endorsements yet!</div>
          )}
          {topEndorsers.map((endorser) => (
            <Fragment key={endorser.id}>
              <Suspense
                fallback={<UserBadgeSkeleton isEndorsementBadge={true} />}
              >
                <UserBadge address={endorser.from.id} />
              </Suspense>
            </Fragment>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-sm shadow-md border-2 border-b-1 border-gray-200">
        <CardHeader>
          <CardTitle>Top Tippers</CardTitle>
          <CardDescription>
            Who sent the highest tips to this profile?
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
            <div className="text-sm text-gray-600">No tips yet!</div>
          )}
          {topDonators.map((donator) => (
            <Fragment key={donator.id}>
              <Suspense
                fallback={<UserBadgeSkeleton isEndorsementBadge={false} />}
              >
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
