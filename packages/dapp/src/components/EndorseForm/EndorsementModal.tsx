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
import { Button } from '@/components/ui/button';
import { PlatformType, formatHandle, startsWithVowel } from '@/utils';
import { useEndorsementStore } from '@/stores';

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

            <div className="flex justify-center">
              <div className="p-4 bg-contain bg-no-repeat w-[300px] h-[158px] gap-y-2 md:w-[600px] md:h-[316px] sm:w-[450px] sm:h-[237px] bg-share-bg flex justify-start items-center">
                <div className="flex flex-col gap-y-1 md:gap-y-4 ml-4">
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
