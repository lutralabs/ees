import { Container } from '@/components/Container';
import { EndorseForm } from '@/components/EndorseForm';
import { Endorsee, EndorseeSkeleton } from '@/components/Endorsee';
import { LandingPage } from '@/components/LandingPage';
import {
  RecentActivity,
  RecentActivitySkeleton,
} from '@/components/RecentActivity';
import { TotalEndorsementsBadge } from '@/components/TotalEndorsementsBadge';
import { getEndorsementsAndDonationsServer } from '@/lib/ees';
import {
  APP_URL,
  validateOrGetDefaultNetwork,
  validateOrGetDefaultPlatform,
} from '@/utils';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type PageProps = {
  searchParams: {
    platform?: string;
    account?: string;
    intro?: string;
    network?: string;
  };
};

export default async function Page({
  searchParams: { platform, account, intro, network },
}: PageProps) {
  // Read cookies
  const _cookies = cookies();
  const cookiesIntro = _cookies.get('intro');

  if (intro === 'true') {
    return <LandingPage account={account} platform={platform} />;
  }

  // If cookiesIntro is not set, redirect to landing page
  // with intro=true, as the user has not seen the intro yet
  if (!cookiesIntro) {
    return redirect(`${APP_URL}/?intro=true`);
  }

  const _platform = validateOrGetDefaultPlatform(platform);
  const _network = validateOrGetDefaultNetwork(network);

  return (
    <Container className="md:pt-14 lg:pt-16 xl:pt-24 max-w-[1440px] h-full">
      <div className="md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto">
        <EndorseForm
          endorsee={
            <Suspense
              key={`${account}-${platform}`}
              fallback={<EndorseeSkeleton />}
            >
              <Endorsee
                platform={_platform}
                displayValue={account ?? null}
                intro={false}
              />
            </Suspense>
          }
        />
        <TotalEndorsementsBadge />
      </div>
      <Suspense fallback={<RecentActivitySkeleton />}>
        <RecentActivity network={_network} />
      </Suspense>
    </Container>
  );
}
