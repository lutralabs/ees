import { ProfileView } from '@/components/ProfileView';
import { usePrefetchProfile } from '@/hooks/usePrefetchProfile';

export default function Page({
  params: { slug },
}: { params: { slug: string } }) {
  return <ProfileView slug={slug} />;
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  console.log('slug', slug);

  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://endorse.fun';
  const ogUrl = new URL(`${url}/api/og`);

  const data = await usePrefetchProfile({
    value: slug,
    enabled: true,
  });

  if (!data)
    return {
      title: 'Profile',
      description: 'Profile',
      openGraph: {
        type: 'article',
        images: [
          {
            url: ogUrl.toString(),
            width: 1200,
            height: 630,
            alt: 'Presentation Image',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Check out my profile',
        description: 'Profile Page',
        images: [ogUrl.toString()],
      },
    };
  if (!(data.queries && data.queries.length > 0))
    return {
      title: 'Profile',
      description: 'Profile',
      openGraph: {
        type: 'article',
        images: [
          {
            url: ogUrl.toString(),
            width: 1200,
            height: 630,
            alt: 'Presentation Image',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Check out my profile',
        description: 'Profile Page',
        images: [ogUrl.toString()],
      },
    };
  if (!data.queries[0].state.data)
    return {
      title: 'Profile',
      description: 'Profile',
      openGraph: {
        type: 'article',
        images: [
          {
            url: ogUrl.toString(),
            width: 1200,
            height: 630,
            alt: 'Presentation Image',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Check out my profile',
        description: 'Profile Page',
        images: [ogUrl.toString()],
      },
    };

  // console.log(data.queries[0].state.data);

  const ens = (data.queries[0].state.data as any).find(
    (item: any) => item.platform === 'ens'
  );

  const farcaster = (data.queries[0].state.data as any).find(
    (item: any) => item.platform === 'farcaster'
  );

  const lens = (data.queries[0].state.data as any).find(
    (item: any) => item.platform === 'lens'
  );

  // console.log('profiles', ens, lens, farcaster);

  const account = ens || lens || farcaster;
  console.log('account', account);

  if (!account)
    return {
      title: 'Profile',
      description: 'Profile',
      openGraph: {
        type: 'article',
        images: [
          {
            url: ogUrl.toString(),
            width: 1200,
            height: 630,
            alt: 'Presentation Image',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Check out my profile',
        description: 'Profile Page',
        images: [ogUrl.toString()],
      },
    };

  // Create the OpenGraph Image URL
  ogUrl.searchParams.set(
    'account',
    account.displayName || account.identity || slug[0]
  );
  ogUrl.searchParams.set('platform', account.platform || 'ens');
  ogUrl.searchParams.set('avatar', account.avatar || '');
  ogUrl.searchParams.set('type', 'profile');
  ogUrl.searchParams.set('description', account.description || '');
  console.log('ogUrl', ogUrl.toString());

  return {
    title: 'Profile',
    description: 'Profile',
    openGraph: {
      type: 'article',
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: 'Presentation Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Check out my profile',
      description: 'Profile Page',
      images: [ogUrl.toString()],
    },
  };
}
