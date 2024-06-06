'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MemoizedImage } from '@/components/MemoizedImage';

type ProfileAvatarProps = {
  avatar: string | null;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
};

const AVATAR_SIZES = {
  xs: 14,
  sm: 24,
  md: 36,
  lg: 48,
  xl: 64,
  '2xl': 80,
  '3xl': 96,
  '4xl': 128,
  '5xl': 160,
  '6xl': 192,
};

export const ProfileAvatar = ({ avatar, size = 'md' }: ProfileAvatarProps) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!avatar) {
    return (
      <div
        className={cn(
          'flex items-center justify-center text-7xl font-semibold bg-primary-200 text-primary-800 rounded-full',
          size === 'xs' && 'w-[14px] h-[14px]',
          size === 'sm' && 'w-[24px] h-[24px]',
          size === 'md' && 'w-[36px] h-[36px]',
          size === 'lg' && 'w-[48px] h-[48px]',
          size === 'xl' && 'w-[64px] h-[64px]',
          size === '2xl' && 'w-[80px] h-[80px]',
          size === '3xl' && 'w-[96px] h-[96px]',
          size === '4xl' && 'w-[128px] h-[128px]',
          size === '5xl' && 'w-[160px] h-[160px]',
          size === '6xl' && 'w-[192px] h-[192px]'
        )}
      >
        V
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative',
        size === 'xs' && 'w-[14px] h-[14px]',
        size === 'sm' && 'w-[24px] h-[24px]',
        size === 'md' && 'w-[36px] h-[36px]',
        size === 'lg' && 'w-[48px] h-[48px]',
        size === 'xl' && 'w-[64px] h-[64px]',
        size === '2xl' && 'w-[80px] h-[80px]',
        size === '3xl' && 'w-[96px] h-[96px]',
        size === '4xl' && 'w-[128px] h-[128px]',
        size === '5xl' && 'w-[160px] h-[160px]',
        size === '6xl' && 'w-[192px] h-[192px]'
      )}
    >
      <MemoizedImage
        className={cn('absolute rounded-full')}
        src={avatar}
        alt="Profile avatar"
        width={AVATAR_SIZES[size]}
        height={AVATAR_SIZES[size]}
        onLoad={() => setIsLoading(false)}
      />
      <Skeleton
        className={cn(
          'absolute rounded-full bg-primary-200',
          !isLoading && 'hidden',
          size === 'xs' && 'w-[14px] h-[14px]',
          size === 'sm' && 'w-[24px] h-[24px]',
          size === 'md' && 'w-[36px] h-[36px]',
          size === 'lg' && 'w-[48px] h-[48px]',
          size === 'xl' && 'w-[64px] h-[64px]',
          size === '2xl' && 'w-[80px] h-[80px]',
          size === '3xl' && 'w-[96px] h-[96px]',
          size === '4xl' && 'w-[128px] h-[128px]',
          size === '5xl' && 'w-[160px] h-[160px]',
          size === '6xl' && 'w-[192px] h-[192px]'
        )}
      />
    </div>
  );
};
