import { Container } from '@/components/Container';
import { EndorseForm } from '@/components/EndorseForm';
import { Endorsee, EndorseeSkeleton } from '@/components/Endorsee';
import { LandingPage } from '@/components/LandingPage';
import { TotalEndorsementsBadge } from '@/components/TotalEndorsementsBadge';
import { APP_URL, validateOrGetDefaultPlatform } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams: { platform?: string; account?: string; intro?: string };
}) {
  // Read cookies
  const _cookies = cookies();
  const intro = _cookies.get('intro');

  if (searchParams.intro === 'true') {
    return <LandingPage searchParams={searchParams} />;
  }

  if (!intro) {
    return redirect(`${APP_URL}/?intro=true`);
  }

  const platform = validateOrGetDefaultPlatform(searchParams.platform);

  return (
    <Container className="md:pt-14 lg:pt-16 xl:pt-24 max-w-[1440px] h-full">
      <div className="md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto">
        <EndorseForm
          endorsee={
            <Suspense
              key={JSON.stringify(searchParams)}
              fallback={<EndorseeSkeleton />}
            >
              <Endorsee
                platform={platform}
                displayValue={searchParams.account ?? null}
                intro={false}
              />
            </Suspense>
          }
        />
        <TotalEndorsementsBadge />
      </div>
    </Container>
  );
}
