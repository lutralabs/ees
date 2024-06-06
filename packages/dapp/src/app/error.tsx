'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-bold">An error occurred</h2>
      <Button
        type="button"
        size="lg"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
