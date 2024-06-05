'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import Image from 'next/image';
import { ProfileAvatar } from './ProfileAvatar';
import { Card } from '../../../components/ui/card';

type ShareDialogProps = {
  avatar: string | null;
  shareLink: string;
  displayName: string;
};

export function ShareDialog({
  avatar,
  shareLink,
  displayName,
}: ShareDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-x-1 items-center text-md font-medium bg-slate-200 px-4 rounded-full"
        >
          <ArrowUpTrayIcon className="w-6 h-6" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] p-4">
        <DialogHeader>
          <DialogTitle>Share this profile</DialogTitle>
          <DialogDescription>
            Share your profile with others to get more endorsements!
          </DialogDescription>
        </DialogHeader>

        <Card className="flex gap-x-2 p-4 items-center">
          <ProfileAvatar avatar={avatar} size="2xl" />
          <div className="text-3xl font-semibold">{displayName}</div>
        </Card>

        <div className="mt-8">
          <div className="flex items-center gap-x-2">
            <div>Share on</div>
            <TwitterShareButton
              url={shareLink}
              title={'Check out my profile on Endorse.fun!'}
              hashtags={['web3', 'endorsements', 'reputation']}
              className="flex items-center justify-center gap-x-2"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <Link
              href={`https://hey.xyz/?text=${encodeURIComponent(
                `Check out my profile on Endorse.fun!\n ${shareLink}\n`
              )}&hashtags=${encodeURIComponent('Masca,Identity,Credential')}`}
              target="_blank"
            >
              <Image
                src="/icons/hey_icon.png"
                alt="hey"
                width={32}
                height={32}
              />
            </Link>
            <Link
              href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
                'Check out my profile on Endorse.fun!'
              )}&embeds[]=${shareLink}`}
              target="_blank"
            >
              <Image
                src="/icons/warpcast_icon.png"
                alt="warpcast"
                className="rounded-full"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-x-2">
            <Input value={shareLink} />
            <Button
              size={'lg'}
              variant={'outline'}
              onClick={() => navigator.clipboard.writeText(shareLink)}
            >
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
