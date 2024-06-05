import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MemoizedImage } from '../MemoizedImage';

type ProfileAvatarProps = {
  account: any;
  size?: number;
};

export const ProfileAvatar = ({ account, size }: ProfileAvatarProps) => {
  const [avatarLoading, setAvatarLoading] = useState(true);
  if (!account.avatar)
    return (
      <div className="w-[120px] h-[120px] flex items-center justify-center text-7xl font-semibold bg-primary-200 text-primary-800 rounded-full">
        {account.identity[0].toUpperCase()}
      </div>
    );
  return (
    <div>
      <MemoizedImage
        className={cn(
          'rounded-full min-w-[50px] min-h-[50px]',
          avatarLoading && 'fixed left-[-100px]'
        )}
        src={account.avatar}
        alt={'avatar'}
        width={size ? size : 140}
        height={size ? size : 140}
        onLoad={() => setAvatarLoading(false)}
      />
      <Skeleton
        className={cn(
          'w-[140px] h-[140px] rounded-full bg-primary-200',
          !avatarLoading && 'hidden'
        )}
      />
    </div>
  );
};
