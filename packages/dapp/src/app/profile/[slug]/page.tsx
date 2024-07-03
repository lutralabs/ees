import Link from 'next/link';
import { Address } from '@/components/Address';
import { Container } from '@/components/Container';
import {
  getAvatarForPlatform,
  getProfileInfo,
  getBasicPlatformProfileInfo,
} from '@/lib/airstack';
import { APP_ENV, APP_URL, formatAddress } from '@/utils';
import {
  validateOrGetDefaultPlatform,
  validateOrGetDefaultNetwork,
} from '@/utils';
import { Badges } from './Badges';
import { ShareDialog } from './ShareDialog';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { Feed } from './Feed';
import { getAggregatedAccountData } from '@/lib/ees';
import { NetworkSelect } from './NetworkSelect';
import { cn } from '@/lib/utils';
import { validateOrGetDefaultPage } from '@/utils/validateOrGetDefaultPage';
import type { Metadata } from 'next';

type PageProps = {
  params: { slug: string };
  searchParams: {
    platform?: string;
    tab?: string;
    network?: string;
    page?: string;
    endorsementId?: string;
    endorsementTab?: string;
  };
};

export default async function Page({
  params: { slug },
  searchParams: { platform, tab, endorsementTab, network, page, endorsementId },
}: PageProps) {
  const _platform = validateOrGetDefaultPlatform(platform);
  const _network = validateOrGetDefaultNetwork(network);
  const _page = validateOrGetDefaultPage(page);

  const data = await getProfileInfo(slug, _platform);

  const mainAddress = data.Wallet!.addresses![0] as `0x${string}`;
  const avatar = getAvatarForPlatform(data, _platform);
  const basicProfileInfo = getBasicPlatformProfileInfo(data, _platform);

  const accountAggregatedData = await getAggregatedAccountData({
    account: mainAddress,
    chainId: _network,
  });

  const totalEndorsementsReceived = Number.parseInt(
    accountAggregatedData.totalEndorsementsReceived
  );

  return (
    <Container className="px-0 md:pt-14 lg:pt-16 xl:pt-24 max-w-[1440px] overflow-auto">
      <div className="flex max-lg:flex-col w-full gap-4">
        <div className="lg:w-[30%] min-w-[300px] w-full">
          <div className="flex flex-col gap-y-2 text-center items-center">
            <ProfileAvatar
              className="hover:animate-spin"
              avatar={avatar}
              address={mainAddress}
              size="5xl"
            />
            <div className="text-3xl font-bold">
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
            <div className="text-xl mt-2 font-semibold">
              Endorsements: {accountAggregatedData.totalEndorsementsReceived}
            </div>
            {basicProfileInfo.description && (
              <div className="text-lg py-2 font-semibold">
                {basicProfileInfo.description}
              </div>
            )}
            <Badges data={data} />

            <Link
              href={`/?account=${slug}&platform=${_platform}`}
              className="mt-4 px-4 py-2 rounded-md bg-primary font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              Endorse {basicProfileInfo.name ?? formatAddress(mainAddress)}
            </Link>
          </div>
        </div>
        {APP_ENV !== 'production' && (
          <div className="relative w-full lg:hidden">
            <div className="absolute sm:right-8 px-2 max-sm:w-full">
              <div className="w-32 max-sm:w-full">
                <NetworkSelect network={_network} />
              </div>
            </div>
          </div>
        )}
        <div
          className={cn(
            'relative w-full overflow-auto',
            APP_ENV !== 'production' && 'max-lg:mt-12'
          )}
        >
          <Feed
            account={mainAddress}
            displayName={basicProfileInfo.name ?? formatAddress(mainAddress)}
            tab={tab}
            endorsementTab={endorsementTab}
            network={_network}
            currentPage={_page}
            avatar={avatar}
            endorsementId={endorsementId}
            totalEndorsementsReceived={
              Number.isNaN(totalEndorsementsReceived)
                ? 0
                : totalEndorsementsReceived
            }
          />
        </div>
        {APP_ENV !== 'production' && (
          <div className="relative w-0 max-lg:hidden">
            <div className="absolute -top-12 right-12 px-2">
              <div className="w-32">
                <NetworkSelect network={_network} />
              </div>
            </div>
          </div>
        )}
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
    description: `Check out ${slug} on endorse.fun!`,
    openGraph: {
      siteName: 'endorse.fun',
      description: 'The next upgrade for Web3 social layer.',
      images: [
        {
          url: `/api/og?account=${slug}&platform=${searchParams.platform}&endorsementId=${searchParams.endorsementId}`,
          width: 1200,
          height: 630,
          alt: 'Profile Page Image',
        },
      ],
      title: `Check out ${slug} on endorse.fun!`,
      type: 'article',
      url: `/profile/${slug}?platform=${searchParams.platform}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Check out ${slug} on endorse.fun!`,
      description: 'Profile Page',
      images: [
        {
          url: `/api/og?account=${slug}${
            searchParams.platform ? `&platform=${searchParams.platform}` : ''
          }${
            searchParams.endorsementId
              ? `&endorsementId=${searchParams.endorsementId}`
              : ''
          }`,
          width: 1200,
          height: 630,
          alt: 'Profile Page Image',
        },
      ],
    },
  };
}
