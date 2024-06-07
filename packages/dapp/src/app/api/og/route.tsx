import { getMinimalProfileInfoByPlatform } from '@/lib/airstack';
import { getMinimalProfileFromAddress } from '@/lib/airstack/getMinimalProfileFromAddress';
import {
  PlatformType,
  formatAddress,
  validateOrGetDefaultPlatform,
} from '@/utils';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { blo } from 'blo';
import { APP_URL } from '@/utils';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const interRegular = fetch(
    new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  try {
    const fontRegular = await interRegular;

    // Read search params
    const { searchParams } = new URL(req.url);
    const values = Object.fromEntries(searchParams);
    const { platform, account } = values;

    const _platform = validateOrGetDefaultPlatform(platform);

    const { address, avatar, description, displayName, error } =
      _platform === PlatformType.ethereum
        ? await getMinimalProfileFromAddress(account as `0x${string}`)
        : await getMinimalProfileInfoByPlatform(_platform, account);

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
              <img
                tw="rounded-full"
                alt="Profile avatar"
                width={160}
                src={avatar ?? blo(address, 160)}
              />
              <h2
                tw="text-6xl"
                style={{
                  fontFamily: 'Cal Sans SemiBold',
                  fontWeight: 'bold',
                }}
              >
                {displayName ?? formatAddress(address)}
              </h2>
              {description && <div tw="flex text-2xl">{description}</div>}{' '}
            </div>
            <div tw="flex flex-2 flex-col items-center justify-end">
              <img alt="EES Logo" width={256} src={`${APP_URL}/endorse.png`} />
            </div>
          </div>
        </div>
      </div>,
      // ImageResponse options
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter Medium',
            data: fontRegular,
            weight: 600,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    return new Response('Failed to generate OG image', {
      status: 500,
    });
  }
}
