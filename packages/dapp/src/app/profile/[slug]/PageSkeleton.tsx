import { Container } from '@/components/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { FeedSkeleton } from './Feed';
import { ProfileAvatarSkeleton } from '@/components/ProfileAvatar';

export const PageSkeleton = () => {
  return (
    <Container className="pt-16 max-w-[1440px] overflow-auto">
      <div className="flex max-lg:flex-col w-full gap-4">
        <div className="lg:w-[30%] min-w-[300px] w-full">
          <div className="flex flex-col gap-y-2 text-center items-center">
            <ProfileAvatarSkeleton size="5xl" />
            <div className="text-3xl font-semibold">
              <Skeleton className="w-[140px] h-9 bg-primary-200 rounded-3xl" />
            </div>
            <div className="flex gap-x-1 items-center text-md text-gray-600 font-medium">
              <Skeleton className="w-[160px] h-8 bg-primary-200 rounded-3xl" />
              <Skeleton className="w-[100px] h-8 bg-primary-200 rounded-3xl" />
            </div>
            <Skeleton className="mt-2 w-[260px] h-6 bg-primary-200 rounded-3xl" />
          </div>
        </div>
        <div className="w-full">
          <FeedSkeleton />
        </div>
      </div>
    </Container>
  );
};
