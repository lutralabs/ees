import { Container } from '@/components/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profiles',
  description: 'Browse Profile if you know you know',
};

export default function Page() {
  return (
    <Container className="pt-16">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
            Explore any address, ENS domain or social account.
          </h1>
        </div>
      </div>
    </Container>
  );
}
