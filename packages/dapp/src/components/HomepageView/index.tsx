'use client';

import { EndorseForm } from '@/components/EndorseForm';
import { Container } from '@/components/Container';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEndorsementStore } from '@/stores';
import { PlatformType } from '@/utils/platform';

export const HomepageView = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const intro = !!searchParams.get('intro');

  const platform = searchParams.get('platform');
  const account = searchParams.get('account');

  if (platform && account && platform in PlatformType) {
    useEndorsementStore.setState({
      displayValue: account,
      platform: PlatformType[platform as keyof typeof PlatformType],
    });
  }

  const handleIntroClick = () => {
    router.push('/');
  };

  if (intro) {
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
          <Button
            onMouseDown={handleIntroClick}
            size="lg"
            className="mt-12 text-xl font-semibold p-6"
          >
            Start Endorsing
          </Button>
        </div>
        <Container className="pt-16 max-w-[1440px]">
          <div className="sm:hover:mt-24 animated-transition md:w-[70%] lg:w-[50%] sm:mt-36 mx-auto relative">
            <EndorseForm />
            <button
              onMouseDown={handleIntroClick}
              className="bg-gradient-to-b from-white/0 via-white/30 to-white/100 absolute top-0 left-0 rounded-md h-full w-full"
              type="button"
            />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <Container className="pt-16 max-w-[1440px]">
      <div className="md:w-[70%] lg:w-[50%] sm:mt-24 mx-auto">
        <EndorseForm />
      </div>
    </Container>
  );
};
