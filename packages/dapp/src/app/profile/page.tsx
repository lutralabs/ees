import { Container } from '@/components/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: '', // TODO: Add description
};

export default function Page() {
  return (
    <Container className="pt-16">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
            Explore any address, ENS domain or social account.
          </h1>
        </div>
      </div>
    </Container>
  );
}
