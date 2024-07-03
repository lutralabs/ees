import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { formatAddress } from '@/utils';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { CopyIcon } from '@/components/CopyIcon';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';

type ExtraInfoProps = {
  isOpen: boolean;
  close: () => void;
  data: {
    id: string;
    avatarSrc: string | null;
    address: string;
    displayName: string | null;
    totalEndorsementsReceived: number;
  } | null;
};

export const ExtraInfo = ({ isOpen, close, data }: ExtraInfoProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleViewProfile = useCallback(() => {
    if (!data) return;

    const params = new URLSearchParams(searchParams);
    params.set('tab', 'summary');
    params.set('platform', 'ethereum');

    router.push(`/profile/${data.address}?${params.toString()}`, {
      scroll: false,
    });
  }, [searchParams, pathname, router, data]);

  if (isDesktop) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            close();
          }
        }}
      >
        <SheetContent className="sm:max-w-[325px]">
          <SheetHeader>
            <SheetTitle>Account information</SheetTitle>
          </SheetHeader>
          {data && (
            <div className="flex flex-col mt-4 gap-y-4">
              <div className="flex items-center gap-x-2">
                <div className="cursor-pointer" onMouseDown={handleViewProfile}>
                  <ProfileAvatar
                    address={data.address as `0x${string}`}
                    avatar={data.avatarSrc}
                    size="xl"
                  />
                </div>
                <div className="flex flex-col">
                  {data.displayName && (
                    <div className="font-semibold text-lg">
                      {data.displayName}
                    </div>
                  )}
                  <div className="flex gap-x-1 items-center">
                    {formatAddress(data.address)}{' '}
                    <CopyIcon value={data.address} />
                  </div>
                </div>
              </div>
              <div>Endorsements: {data.totalEndorsementsReceived}</div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <DrawerContent>
        <DrawerHeader>Account information</DrawerHeader>
        {data && (
          <div className="flex flex-col gap-y-4 px-4 pb-4">
            <div className="flex items-center gap-x-2">
              <div className="cursor-pointer" onMouseDown={handleViewProfile}>
                <ProfileAvatar
                  address={data.address as `0x${string}`}
                  avatar={data.avatarSrc}
                  size="xl"
                />
              </div>
              <div className="flex flex-col">
                {data.displayName && (
                  <div className="font-semibold text-lg">
                    {data.displayName}
                  </div>
                )}
                <div className="flex gap-x-1 items-center">
                  {formatAddress(data.address)}{' '}
                  <CopyIcon value={data.address} />
                </div>
              </div>
            </div>
            <div>Endorsements: {data.totalEndorsementsReceived}</div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
