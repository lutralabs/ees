import { Container } from '@/components/Container';
import { EndorseForm } from '@/components/EndorseForm';
import { Endorsee, EndorseeSkeleton } from '@/components/Endorsee';
import { Button } from '@/components/ui/button';
import { APP_URL, PlatformType, validateOrGetDefaultPlatform } from '@/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
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
    return (
      <div>
        <div className="fixed z-10 w-full top-[50%] sm:top-[45%] md:top-[50%] lg:top-[45%] xl:top-[55%] text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-6xl">
            Build Web3 <span className="text-primary">Reputation</span>
            <br /> with <span className="text-primary">Endorsements</span>
          </h1>
          <h3 className="text-2xl mt-4 font-medium tracking-tight text-center text-gray-700">
            Endorse any Ethereum address, ENS or social account.
          </h3>
          <Button size="lg" className="mt-12 text-xl font-semibold p-6">
            <Link href="/">Launch App</Link>
          </Button>
        </div>
        <Container className="max-sm:fixed md:pt-14 lg:pt-16 max-w-[1440px]">
          <div className="sm:hover:mt-0 animated-transition md:w-[70%] lg:w-[50%] sm:mt-2 mx-auto relative">
            <EndorseForm
              endorsee={
                <Suspense
                  key={JSON.stringify(searchParams)}
                  fallback={<EndorseeSkeleton />}
                >
                  <Endorsee
                    platform={PlatformType.ens}
                    displayValue={null}
                    intro={true}
                  />
                </Suspense>
              }
            />
            <Link
              href="/"
              className="bg-gradient-to-b from-white/0 via-slate-100/75 to-slate-100 absolute top-0 left-0 rounded-md h-full w-full"
            />
          </div>
        </Container>
      </div>
    );
  }

  if (!intro) {
    return redirect(`${APP_URL}/?intro=true`);
  }

  const platform = validateOrGetDefaultPlatform(searchParams.platform);

  return (
    <Container className="pt-6 sm:pt-10 md:pt-16 max-w-[1440px] h-full">
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
      </div>
    </Container>
  );
}
