import { Address } from '@/components/Address';
import { Container } from '@/components/Container';
import { getAvatarForPlatform, getProfileInfo } from '@/lib/airstack';
import { getBasicPlatformProfileInfo } from '@/lib/airstack/getBasicPlatformProfileInfo';
import { formatAddress } from '@/utils';
import { validateOrGetDefaultPlatform } from '@/utils/platform';
import { Badges } from './Badges';
import Link from 'next/link';
import { ShareDialog } from './ShareDialog';
import { ProfileAvatar, ProfileAvatarSkeleton } from './ProfileAvatar';
import { Feed, FeedSkeleton } from './Feed';
import { validateOrGetDefaultNetwork } from '@/utils/validateOrGetDefaultNetwork';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Page({
  params: { slug },
  searchParams: { platform, tab, network },
}: {
  params: { slug: string };
  searchParams: { platform?: string; tab?: string; network?: string };
}) {
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
            <ProfileAvatar avatar={avatar} size="5xl" />
            <div className="text-3xl font-semibold">
              {basicProfileInfo.name ?? formatAddress(mainAddress)}
            </div>
            <div className="flex gap-x-1 items-center text-md text-gray-600 font-medium">
              <Address address={mainAddress} />
              <ShareDialog
                avatar={avatar}
                shareLink={
                  'http://localhost:3000/profile/pseudobun.eth?platform=ens'
                }
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

export const PageSkeleton = () => {
  return (
    <Container className="pt-16 max-w-[1440px] overflow-auto">
      <div className="flex max-lg:flex-col w-full gap-4">
        <div className="lg:w-[30%] min-w-[300px] w-full">
          <div className="flex flex-col gap-y-2 text-center items-center">
            <ProfileAvatarSkeleton size="5xl" />
            <div className="text-3xl font-semibold">
              <Skeleton className="w-[140px] h-9 bg-primary-200 rounded-3xl" />
            </div>
            <div className="flex gap-x-1 items-center text-md text-gray-600 font-medium">
              <Skeleton className="w-[160px] h-8 bg-primary-200 rounded-3xl" />
              <Skeleton className="w-[100px] h-8 bg-primary-200 rounded-3xl" />
            </div>
            <Skeleton className="mt-2 w-[260px] h-6 bg-primary-200 rounded-3xl" />
          </div>
        </div>
        <div className="w-full">
          <FeedSkeleton />
        </div>
      </div>
    </Container>
  );
};

// export async function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string };
// }) {
//   console.log('slug', slug);

//   const url = process.env.NEXT_PUBLIC_APP_URL || 'https://endorse.fun';
//   const ogUrl = new URL(`${url}/api/og`);

//   const data = await usePrefetchProfile({
//     value: slug,
//     enabled: true,
//   });

//   if (!data)
//     return {
//       title: 'Profile',
//       description: 'Profile',
//       openGraph: {
//         type: 'article',
//         images: [
//           {
//             url: ogUrl.toString(),
//             width: 1200,
//             height: 630,
//             alt: 'Presentation Image',
//           },
//         ],
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: 'Check out my profile',
//         description: 'Profile Page',
//         images: [ogUrl.toString()],
//       },
//     };
//   if (!(data.queries && data.queries.length > 0))
//     return {
//       title: 'Profile',
//       description: 'Profile',
//       openGraph: {
//         type: 'article',
//         images: [
//           {
//             url: ogUrl.toString(),
//             width: 1200,
//             height: 630,
//             alt: 'Presentation Image',
//           },
//         ],
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: 'Check out my profile',
//         description: 'Profile Page',
//         images: [ogUrl.toString()],
//       },
//     };
//   if (!data.queries[0].state.data)
//     return {
//       title: 'Profile',
//       description: 'Profile',
//       openGraph: {
//         type: 'article',
//         images: [
//           {
//             url: ogUrl.toString(),
//             width: 1200,
//             height: 630,
//             alt: 'Presentation Image',
//           },
//         ],
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: 'Check out my profile',
//         description: 'Profile Page',
//         images: [ogUrl.toString()],
//       },
//     };

//   // console.log(data.queries[0].state.data);

//   const ens = (data.queries[0].state.data as any).find(
//     (item: any) => item.platform === 'ens'
//   );

//   const farcaster = (data.queries[0].state.data as any).find(
//     (item: any) => item.platform === 'farcaster'
//   );

//   const lens = (data.queries[0].state.data as any).find(
//     (item: any) => item.platform === 'lens'
//   );

//   // console.log('profiles', ens, lens, farcaster);

//   const account = ens || lens || farcaster;
//   console.log('account', account);

//   if (!account)
//     return {
//       title: 'Profile',
//       description: 'Profile',
//       openGraph: {
//         type: 'article',
//         images: [
//           {
//             url: ogUrl.toString(),
//             width: 1200,
//             height: 630,
//             alt: 'Presentation Image',
//           },
//         ],
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: 'Check out my profile',
//         description: 'Profile Page',
//         images: [ogUrl.toString()],
//       },
//     };

//   // Create the OpenGraph Image URL
//   ogUrl.searchParams.set(
//     'account',
//     account.displayName || account.identity || slug[0]
//   );
//   ogUrl.searchParams.set('platform', account.platform || 'ens');
//   ogUrl.searchParams.set('avatar', account.avatar || '');
//   ogUrl.searchParams.set('type', 'profile');
//   ogUrl.searchParams.set('description', account.description || '');
//   console.log('ogUrl', ogUrl.toString());

//   return {
//     title: 'Profile',
//     description: 'Profile',
//     openGraph: {
//       type: 'article',
//       images: [
//         {
//           url: ogUrl.toString(),
//           width: 1200,
//           height: 630,
//           alt: 'Presentation Image',
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: 'Check out my profile',
//       description: 'Profile Page',
//       images: [ogUrl.toString()],
//     },
//   };
// }
