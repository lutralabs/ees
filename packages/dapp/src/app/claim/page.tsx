import { Container } from '@/components/Container';
import { ClaimCard } from './ClaimCard';

export default function Page() {
  return (
    <Container className="md:pt-14 lg:pt-16 xl:pt-24 max-w-[1440px]">
      <div className="md:w-[70%] lg:w-[50%] mx-auto">
        <ClaimCard />
      </div>
    </Container>
  );
}
