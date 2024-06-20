'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@nextui-org/react';

type ExplorerTableFooterProps = {
  currentPage: number;
  totalPages: number;
};

export const ExplorerTableFooter = ({
  currentPage,
  totalPages,
}: ExplorerTableFooterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mt-8 flex justify-center p-2">
      <Pagination
        classNames={{
          item: 'text-small rounded-sm bg-gray-100 shadow-sm hover:bg-gray-200',
          cursor: 'rounded-sm bg-primary-400',
          prev: 'rounded-sm bg-gray-100 shadow-sm hover:bg-gray-200 data-[disabled]:text-gray-200 data-[disabled]:bg-gray-50',
          next: 'rounded-sm bg-gray-100 shadow-sm hover:bg-gray-200 data-[disabled]:text-gray-200 data-[disabled]:bg-gray-50',
        }}
        total={totalPages}
        page={Math.min(currentPage, totalPages)}
        initialPage={1}
        onChange={handlePageChange}
        showControls
        showShadow
        color="primary"
      />
    </div>
  );
};
