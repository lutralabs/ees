import { ExplorerTableFooter } from './ExplorerTableFooter';
import {
  ExplorerTableBody,
  ExplorerTableBodySkeleton,
} from './ExplorerTableBody';
import { ExplorerTableHeader } from './ExplorerTableHeader';
import { EXPLORER_TABLE_ITEMS_PER_PAGE } from './constants';
import { Suspense } from 'react';

type ExplorerTableProps = {
  chainId: number;
  account: `0x${string}`;
  currentPage: number;
  totalEndorsementsReceived: number;
};

export const ExplorerTable = ({
  chainId,
  account,
  currentPage,
  totalEndorsementsReceived,
}: ExplorerTableProps) => {
  const totalPages = Math.max(
    1,
    Math.ceil(totalEndorsementsReceived / EXPLORER_TABLE_ITEMS_PER_PAGE)
  );

  return (
    <div className="overflow-hidden">
      <div className="overflow-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <ExplorerTableHeader />
          <Suspense
            key={`${chainId}-${account}-${currentPage}`}
            fallback={<ExplorerTableBodySkeleton />}
          >
            <ExplorerTableBody
              chainId={chainId}
              account={account}
              currentPage={currentPage}
            />
          </Suspense>
        </table>
      </div>
      <ExplorerTableFooter currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};
