import { Container } from '@/components/Container';
import { EndorseForm } from '@/components/EndorseForm';
import { Endorsee, EndorseeSkeleton } from '@/components/Endorsee';
import { Button } from '@/components/ui/button';
import { PlatformType, validateOrGetDefaultPlatform } from '@/utils';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams: { platform?: string; account?: string; intro?: string };
}) {
  if (searchParams.intro === 'true') {
    return (
      <div>
        <div className="fixed z-10 w-full top-[60%] sm:top-[65%] lg:top-[55%] xl:top-[65%] text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-6xl">
            Build Web3 <span className="text-primary">Reputation</span>
            <br /> with <span className="text-primary">Endorsements</span>
          </h1>
          <h3 className="text-2xl mt-4 font-medium tracking-tight text-center text-gray-700">
            Endorse any address, ENS domain or social account.
          </h3>
          <Button size="lg" className="mt-12 text-xl font-semibold p-6">
            <Link href="/">Start Endorsing</Link>
          </Button>
        </div>
        <Container className="pt-16 max-w-[1440px]">
          <div className="sm:hover:mt-24 animated-transition md:w-[70%] lg:w-[50%] sm:mt-36 mx-auto relative">
            <EndorseForm
              endorsee={
                <Suspense
                  key={JSON.stringify(searchParams)}
                  fallback={<EndorseeSkeleton />}
                >
                  <Endorsee
                    platform={PlatformType.ens}
                    displayValue="pseudobun.eth"
                    intro={true}
                  />
                </Suspense>
              }
            />
            <Link
              href="/"
              className="bg-gradient-to-b from-white/0 via-white/30 to-white/100 absolute top-0 left-0 rounded-md h-full w-full"
            />
          </div>
        </Container>
      </div>
    );
  }

  const platform = validateOrGetDefaultPlatform(searchParams.platform);

  return (
    <Container className="pt-16 max-w-[1440px]">
      <div className="md:w-[70%] lg:w-[60%] xl:w-[50%] sm:mt-24 mx-auto">
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
