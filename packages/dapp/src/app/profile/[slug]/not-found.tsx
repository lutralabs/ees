import { Container } from '@/components/Container';

export default function NotFound() {
  return (
    <Container className="pt-16">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
            Profile not found
          </h1>
        </div>
      </div>
    </Container>
  );
}
