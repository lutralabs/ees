import Link from 'next/link';
import type { Metadata } from 'next';
import { Address } from '@/components/Address';
import { Container } from '@/components/Container';
import {
  getAvatarForPlatform,
  getProfileInfo,
  getBasicPlatformProfileInfo,
} from '@/lib/airstack';
import { APP_URL, formatAddress } from '@/utils';
import {
  validateOrGetDefaultPlatform,
  validateOrGetDefaultNetwork,
} from '@/utils';
import { Badges } from './Badges';
import { ShareDialog } from './ShareDialog';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { Feed } from './Feed';

type PageProps = {
  params: { slug: string };
  searchParams: { platform?: string; tab?: string; network?: string };
};

export default async function Page({
  params: { slug },
  searchParams: { platform, tab, network },
}: PageProps) {
  const _platform = validateOrGetDefaultPlatform(platform);
  const _network = validateOrGetDefaultNetwork(network);
  const data = await getProfileInfo(slug, _platform);

  const mainAddress = data.Wallet!.addresses![0] as `0x${string}`;
  const avatar = getAvatarForPlatform(data, _platform);
  const basicProfileInfo = getBasicPlatformProfileInfo(data, _platform);

  return (
    <Container className="pt-16 max-w-[1440px] overflow-auto">
      <div className="flex max-lg:flex-col w-full gap-4">
        <div className="lg:w-[30%] min-w-[300px] w-full">
          <div className="flex flex-col gap-y-2 text-center items-center">
            <ProfileAvatar avatar={avatar} address={mainAddress} size="5xl" />
            <div className="text-3xl font-semibold">
              {basicProfileInfo.name ?? formatAddress(mainAddress)}
            </div>
            <div className="flex gap-x-1 items-center text-md text-gray-600 font-medium">
              <Address address={mainAddress} />
              <ShareDialog
                avatar={avatar}
                address={mainAddress}
                shareLink={`${APP_URL}/profile/${slug}?platform=${_platform}`}
                displayName={
                  basicProfileInfo.name ?? formatAddress(mainAddress)
                }
              />
            </div>
            {basicProfileInfo.description && (
              <div className="text-lg py-2">{basicProfileInfo.description}</div>
            )}
            <Badges data={data} />

            <Link
              href={`/?account=${slug}&platform=${_platform}`}
              className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90"
            >
              Endorse {basicProfileInfo.name ?? formatAddress(mainAddress)}
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Feed
            account={mainAddress}
            platform={_platform}
            tab={tab}
            network={_network}
          />
        </div>
      </div>
    </Container>
  );
}

export async function generateMetadata({
  params: { slug },
  searchParams,
}: PageProps): Promise<Metadata> {
  return {
    title: `Profile | ${slug}`,
    description: 'Check out my profile on Endorse.fun!',
    openGraph: {
      siteName: 'Endorse.fun',
      description: 'The next generation Web3 social layer.',
      images: [
        {
          url: `/api/og?account=${slug}&platform=${searchParams.platform}`,
          width: 1200,
          height: 630,
          alt: 'Profile Page Image',
        },
      ],
      title: 'Check out my profile on Endorse.fun!',
      type: 'article',
      url: `/profile/${slug}?platform=${searchParams.platform}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Check out my profile on Endorse.fun!',
      description: 'Profile Page',
      images: [
        {
          url: `/api/og?account=${slug}&platform=${searchParams.platform}`,
          width: 1200,
          height: 630,
          alt: 'Profile Page Image',
        },
      ],
    },
  };
}
