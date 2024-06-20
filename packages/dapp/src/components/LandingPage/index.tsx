import React, { Suspense } from 'react';
import { Container } from '../Container';
import Link from 'next/link';
import { Endorsee, EndorseeSkeleton } from '../Endorsee';
import { Button } from '../ui/button';
import { EndorseForm } from '../EndorseForm';
import { PlatformType } from '@/utils';
import { Features } from './Features';

type LandingPageProps = {
  searchParams: { platform?: string; account?: string; intro?: string };
};

export const LandingPage = ({ searchParams }: LandingPageProps) => {
  return (
    <div>
      <div className="h-[86vh]">
        <div className="absolute z-10 w-full top-[60%] sm:top-[55%] md:top-[60%] lg:top-[55%] xl:top-[60%] text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-6xl">
            Build Web3 <span className="text-primary">Reputation</span>
            <br /> with <span className="text-primary">Endorsements</span>
          </h1>
          <h3 className="text-2xl mt-4 font-medium tracking-tight text-center text-gray-700">
            Endorse the best people you know!
          </h3>
          <Button size="lg" className="mt-12 text-xl font-semibold p-6">
            <Link href="/">Launch App</Link>
          </Button>
        </div>
        <Container className="md:pt-14 lg:pt-16 xl:pt-24 max-w-[1440px]">
          <div className="sm:hover:mt-0 animated-transition md:w-[70%] lg:w-[50%] sm:mt-16 mx-auto relative">
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
              className="bg-gradient-to-b from-white/0 via-white/75 to-white absolute top-0 left-0 rounded-md h-full w-full"
            />
          </div>
        </Container>
      </div>
      <div className="flex justify-center text-lg text-gray-400">
        Scroll to learn more
      </div>
      <Features />
      <div className="mt-32" />
    </div>
  );
};
