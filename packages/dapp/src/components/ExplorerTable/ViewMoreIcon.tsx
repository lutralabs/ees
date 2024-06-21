'use client';

import { Eye } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type ViewMoreIconProps = {
  id: string;
};

export const ViewMoreIcon = ({ id }: ViewMoreIconProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleEndorsementSelection = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('endorsementId', id);

      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [searchParams, pathname, router, id]
  );

  return (
    <span className="w-full flex justify-center items-center">
      <Eye
        className="h-4 w-4 text-gray-400 cursor-pointer"
        onMouseDown={() => handleEndorsementSelection(id)}
      />
    </span>
  );
};
