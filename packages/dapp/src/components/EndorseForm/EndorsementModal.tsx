import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { MemoizedImage } from '@/components/MemoizedImage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { APP_URL, PlatformType, formatHandle, startsWithVowel } from '@/utils';
import { ProfileAvatarSkeleton } from '../ProfileAvatar';
import { Skeleton } from '../ui/skeleton';
import { EndorseeSkeleton } from '../Endorsee';
import { useEndorsementStore } from '@/stores';

type EndorsementModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  endorsementId: string | null;
  endorsee: React.ReactNode;
};

export const EndorsementModal = ({
  open,
  setOpen,
  endorsementId,
  endorsee,
}: EndorsementModalProps) => {
  // TODO[Martin]: Add network name, so we can support multiple networks
  const shareLink = `${APP_URL}/endorsement/${endorsementId}`;
  const { displayValue, endorsementType, platform } = useEndorsementStore(
    (state) => ({
      displayValue: state.displayValue,
      endorsementType: state.endorsementType,
      platform: state.platform,
    })
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px] p-4">
        {endorsementId && (
          <>
            <DialogHeader>
              <DialogTitle>Endorsement</DialogTitle>
              <DialogDescription>Thank you for endorsing</DialogDescription>
            </DialogHeader>
            <Card className="p-4 flex max-sm:flex-col max-sm:pt-4 max-sm:gap-y-4 justify-center items-center">
              {endorsee}
            </Card>
            <div className="mt-4">
              <div className="flex max-sm:flex-col gap-x-2 items-center">
                <div>Share this moment on</div>
                <div className="flex items-center gap-x-2 max-sm:pt-2">
                  <TwitterShareButton
                    url={shareLink}
                    title={`I endorsed ${displayValue} as ${
                      startsWithVowel(endorsementType.toLowerCase())
                        ? 'an'
                        : 'a'
                    } ${endorsementType} on @endorsedotfun!`}
                    hashtags={['endorse', 'reputation']}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <Link
                    prefetch={false}
                    href={`https://hey.xyz/?text=${encodeURIComponent(
                      `I endorsed ${
                        platform === PlatformType.lens
                          ? formatHandle(displayValue!, platform!)
                          : displayValue
                      } as a ${endorsementType} on @endorsedotfun!\n ${shareLink}\n`
                    )}&hashtags=${encodeURIComponent('reputation,endorse')}`}
                    target="_blank"
                  >
                    <MemoizedImage
                      src="/icons/hey_icon.png"
                      alt="hey"
                      width={32}
                      height={32}
                    />
                  </Link>
                  <Link
                    prefetch={false}
                    href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
                      `I endorsed ${
                        platform === PlatformType.farcaster
                          ? formatHandle(displayValue!, platform!)
                          : displayValue
                      } as a ${endorsementType} on @endorsedotfun!`
                    )}&embeds[]=${shareLink}`}
                    target="_blank"
                  >
                    <MemoizedImage
                      src="/icons/warpcast_icon.png"
                      alt="warpcast"
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-x-2">
                <Input value={shareLink} />
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText('')}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </>
        )}
        {!endorsementId && <EndorsementModalSkeleton />}
      </DialogContent>
    </Dialog>
  );
};

export const EndorsementModalSkeleton = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Endorsement</DialogTitle>
        <DialogDescription>Thank you for endorsing</DialogDescription>
      </DialogHeader>
      <Card className="p-4 flex max-sm:flex-col max-sm:pt-4 max-sm:gap-y-4 justify-center items-center">
        <EndorseeSkeleton />
      </Card>
      <div className="mt-4">
        <div className="flex max-sm:flex-col gap-x-2 items-center">
          <Skeleton className="h-6 w-[165px]" />
          <div className="flex items-center gap-x-2 max-sm:pt-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-x-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-[132px]" />
        </div>
      </div>
    </>
  );
};
