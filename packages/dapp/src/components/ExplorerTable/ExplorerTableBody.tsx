import { getEndorsementsForAccountPaginated } from '@/lib/ees/getEndorsementsForAccountPaginated';
import { EXPLORER_TABLE_ITEMS_PER_PAGE } from './constants';
import { EASLink } from './EASLink';
import { ExplorerAvatar } from './ExplorerAvatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Skeleton } from '../ui/skeleton';
import { ProfileAvatarSkeleton } from '../ProfileAvatar';
import { Suspense } from 'react';

dayjs.extend(relativeTime);

type ExplorerTableBodyProps = {
  chainId: number;
  account: `0x${string}`;
  currentPage: number;
};

export const ExplorerTableBody = async ({
  chainId,
  account,
  currentPage,
}: ExplorerTableBodyProps) => {
  const { endorsements, error } = await getEndorsementsForAccountPaginated({
    chainId,
    account,
    page: currentPage,
    perPage: EXPLORER_TABLE_ITEMS_PER_PAGE,
  });

  return (
    <tbody className="w-full divide-y divide-gray-200 dark:divide-neutral-700">
      {!error && endorsements.length === 0 && (
        <tr className="w-full">
          <td className="py-4" colSpan={4}>
            No endorsements received yet!
          </td>
        </tr>
      )}
      {error && (
        <tr className="w-full">
          <td className="py-4 text-red-400" colSpan={4}>
            {error}
          </td>
        </tr>
      )}
      {endorsements.map((endorsement) => (
        <tr key={endorsement.id} className="w-full">
          <Suspense
            fallback={
              <td className="flex px-6 py-4 max-sm:px-2 items-center">
                <ProfileAvatarSkeleton size="lg" className="bg-gray-200" />
                <Skeleton className="ml-2 w-28 h-5 bg-gray-200 rounded-sm" />
              </td>
            }
          >
            <td className="px-6 max-sm:px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
              <ExplorerAvatar address={endorsement.from?.id} />
            </td>
          </Suspense>
          <td className="px-6 py-4 max-sm:px-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
            {endorsement.endorsementType}
          </td>
          <td className="px-6 py-4 max-sm:px-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
            <EASLink value={endorsement.easUid} />
          </td>

          <td className="px-6 max-sm:px-0 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
            {dayjs.unix(endorsement.createdAtTimestamp).fromNow()}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const SKELETON_ROWS = 10;

export const ExplorerTableBodySkeleton = () => {
  return (
    <tbody className="w-full divide-y divide-gray-200 dark:divide-neutral-700">
      {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
        <tr key={`skeleton-${index}`} className="w-full">
          <td className="flex px-6 max-sm:px-2 py-4 items-center">
            <ProfileAvatarSkeleton size="lg" className="bg-gray-200" />
            <Skeleton className="ml-6 w-full h-5 bg-gray-200 rounded-sm" />
          </td>
          <td className="px-6 py-4 max-sm:px-2">
            <Skeleton className="w-full h-5 bg-gray-200 rounded-sm" />
          </td>
          <td className="px-6 py-4 max-sm:px-2">
            <Skeleton className="w-full h-5 bg-gray-200 rounded-sm" />
          </td>
          <td className="px-6 py-4 max-sm:px-2">
            <Skeleton className="w-full h-5 bg-gray-200 rounded-sm" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
