'use client';

import { getRecentEndorsementsAndDonationsClient } from '@/lib/ees';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  RecentEndorsement,
  RecentEndorsementSkeleton,
} from './RecentEndorsement';
import type React from 'react';
import { RecentDonation, RecentDonationSkeleton } from './RecentDonation';
import { motion, AnimatePresence, usePresence } from 'framer-motion';

type RecentActivityViewProps = {
  network: number;
};

const transition = { type: 'spring', stiffness: 1200, damping: 50, mass: 3 };

function ListItem({ children }: { children: React.ReactNode }) {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: 'out',
    style: {
      position: isPresent ? 'static' : 'absolute',
    },
    animate: isPresent ? 'in' : 'out',
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return <motion.div {...animations}>{children}</motion.div>;
}

export const RecentActivityView = ({ network }: RecentActivityViewProps) => {
  const { data } = useQuery({
    queryKey: ['recentEndorsementsAndDonations', network],
    queryFn: async () => getRecentEndorsementsAndDonationsClient(network),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="flex max-lg:flex-col gap-x-8 mt-8 gap-y-8 md:max-w-[70%] lg:max-w-full mx-auto">
      <Card className="flex-1 overflow-hidden px-0">
        <CardHeader className="font-bold text-xl">
          Recent endorsements
        </CardHeader>
        <CardContent className="relative px-0">
          <AnimatePresence>
            {data?.endorsements?.map((endorsement, i) => (
              <ListItem key={endorsement.id}>
                <>
                  <RecentEndorsement {...endorsement} chainId={network} />
                  {i !== 4 && <hr />}
                </>
              </ListItem>
            ))}
          </AnimatePresence>
        </CardContent>
        {/* Dont show on last elemnt */}
      </Card>
      <Card className="flex-1 overflow-hidden px-0">
        <CardHeader className="font-bold text-xl">Recent donations</CardHeader>
        <CardContent className="relative px-0">
          <AnimatePresence>
            {data?.donations?.map((donation, i) => (
              <ListItem key={donation.id}>
                <>
                  <RecentDonation {...donation} chainId={network} />
                  {/* Dont show on last elemnt */}
                  {i !== 4 && <hr />}
                </>
              </ListItem>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export const RecentActivityViewSkeleton = () => {
  return (
    <div className="flex max-lg:flex-col gap-x-8 mt-8 gap-y-8 md:max-w-[70%] lg:max-w-full mx-auto">
      <Card className="flex-1 overflow-hidden px-0">
        <CardHeader className="font-bold text-xl">
          Recent endorsements
        </CardHeader>
        <CardContent className="relative px-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <RecentEndorsementSkeleton key={i} />
          ))}
        </CardContent>
      </Card>
      <Card className="flex-1 overflow-hidden px-0">
        <CardHeader className="font-bold text-xl">Recent donations</CardHeader>
        <CardContent className="relative px-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <RecentDonationSkeleton key={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
