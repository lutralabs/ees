'use client';

import { Container } from '@/components/Container';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Profile } from '@/components/Profile';
import { type Web3BioProfile, useProfile } from '@/hooks';

const hasAddress = (data: Web3BioProfile[]) => {
  return data.some((item) => item.address !== null);
};

export const ProfileView = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useProfile({
    value: slug,
    enabled: true,
  });

  if (isLoading) {
    return (
      <Container className="pt-16">
        <div className="w-full">
          <div className="text-center">
            <Skeleton className="h-24 w-full bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </Container>
    );
  }

  if (!data) notFound();

  if (data && !hasAddress(data)) {
    return (
      <Container className="pt-8">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
              Account has no linked address. Try another account.
            </h1>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pt-16 max-w-[1440px] bg-green-500">
      <Profile data={data} slug={slug} />
    </Container>
  );
};
