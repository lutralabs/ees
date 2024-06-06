import { getMinimalProfileInfoByPlatform } from '@/lib/airstack';
import { formatAddress, validateOrGetDefaultPlatform } from '@/utils';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs'; // TODO: Test both nodejs and edge
export const alt = 'Check out my profile on Endorse.fun!';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const revalidate = 86400; // Cache for 1 day

type PageProps = {
  params: { slug: string };
  searchParams: { platform?: string; tab?: string; network?: string };
};

export default async function Image({
  params: { slug },
  searchParams: { platform },
}: PageProps) {
  const _platform = validateOrGetDefaultPlatform(platform);
  // FIXME: Add description
  const { address, avatar, displayName, error } =
    await getMinimalProfileInfoByPlatform(_platform, slug);

  // Return bad request if error
  if (error || !address) {
    return new Response('Failed to generate OG image', {
      status: 400,
    });
  }

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(180deg, rgba(183,236,246,1) 30%, rgba(255,255,255,1) 100%)',
      }}
    >
      <div tw="flex justify-center">
        <div tw="flex justify-center w-full flex-col p-12 md:flex-row md:items-center">
          <div tw="pl-8 flex flex-3 flex-col">
            {avatar ? (
              <img
                tw="rounded-full"
                alt="Profile avatar"
                width={160}
                src={avatar}
              />
            ) : (
              <div tw="w-[160px] h-[160px] flex items-center justify-center text-7xl font-semibold bg-blue-200 text-primary-800 rounded-full">
                {/* TODO */}A
              </div>
            )}
            <h2
              tw="text-6xl"
              style={{
                fontFamily: 'Cal Sans SemiBold',
                fontWeight: 'bold',
              }}
            >
              {displayName ?? formatAddress(address)}
            </h2>
            {/* <div tw="flex text-2xl">{'Placeholder description'}</div> */}
          </div>
          <div tw="flex flex-2 flex-col items-center justify-end">
            <img
              alt="EES Logo"
              width={256}
              src="https://i.imgur.com/QpxIqHT.png" //FIXME: Replace with deployed URL and fetch from PUBLIC folder
            />
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
