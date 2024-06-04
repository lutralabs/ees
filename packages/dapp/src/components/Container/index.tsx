import { cn } from '@/lib/utils';

export function Container({ className, ...props }: any) {
  return (
    <div
      className={cn('max-w-7xl', className, 'mx-auto px-4 sm:px-6 lg:px-8')}
      {...props}
    />
  );
}
