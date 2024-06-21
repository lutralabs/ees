'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const EndorsementViewBackArrow = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleBackNavigation = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('endorsementId');

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, [searchParams, pathname, router]);

  return (
    <Button
      onClick={handleBackNavigation}
      size="icon"
      variant="ghost"
      className="h-6 w-6"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );
};
