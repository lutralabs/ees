import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { MemoizedImage } from '@/components/MemoizedImage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlatformType, formatHandle, startsWithVowel } from '@/utils';
import { Skeleton } from '../ui/skeleton';
import { EndorseeSkeleton } from '../Endorsee';
import { useEndorsementStore } from '@/stores';
import Image from 'next/image';

type EndorsementModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shareLink: string | null;
  endorsee: React.ReactNode;
};

export const EndorsementModal = ({
  open,
  setOpen,
  shareLink,
  endorsee,
}: EndorsementModalProps) => {
  // TODO[Martin]: Add network name, so we can support multiple networks
  // const shareLink = `${APP_URL}/endorsement/${endorsementId}`;
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
        {shareLink && (
          <>
            <DialogHeader>
              <DialogTitle>Success</DialogTitle>
              <DialogDescription>
                Thank you for endorsing {displayValue}!
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 bg-contain bg-no-repeat gap-y-2 md:w-[600px] md:h-[316px] bg-share-bg flex justify-start items-center">
              <div className="flex flex-col gap-y-4 ml-4">
                <div className="flex items-center justify-center">
                  {endorsee}
                </div>
                <div className="md:text-xl font-medium">
                  {endorsementType === 'Based energy 🔵' ? 'for' : 'as a'}
                </div>
                <div className="md:text-3xl text-md font-semibold text-primary-500">
                  {endorsementType}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex max-sm:flex-col gap-x-2 font-medium items-center">
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
                  <div>
                    or{' '}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(shareLink)}
                    >
                      Copy Link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Continue Endorsing</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
