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
import { getAggregatedAccountData } from '@/lib/ees';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const interRegular = fetch(
    new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const interMedium = fetch(
    new URL('../../../../public/fonts/Inter-Medium.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const interBold = fetch(
    new URL('../../../../public/fonts/Inter-Bold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  try {
    const fontRegular = await interRegular;
    const fontMedium = await interMedium;
    const fontBold = await interBold;

    // Read search params
    const { searchParams } = new URL(req.url);
    const values = Object.fromEntries(searchParams);
    const { platform, account } = values;

    const _platform = validateOrGetDefaultPlatform(platform);

    const { address, avatar, description, displayName, error } =
      _platform === PlatformType.ethereum
        ? await getMinimalProfileFromAddress(account as `0x${string}`)
        : await getMinimalProfileInfoByPlatform(_platform, account);

    const accountData = await getAggregatedAccountData({
      account: address as string,
      chainId: 8453,
    });

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
            'linear-gradient(180deg, rgba(0,82,255,1) 100%, rgba(0,82,255,1) 100%)',
        }}
      >
        <img
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            right: 0,
            transform: 'rotate(180deg)',
          }}
          alt="BG"
          width={384}
          src={`${APP_URL}/images/bg.png`}
        />
        <img
          style={{
            position: 'absolute',
            bottom: 0,
            right: 16,
          }}
          alt="EES Logo"
          width={384}
          src={`${APP_URL}/endorse_white.png`}
        />
        <div tw="flex justify-center w-full flex-col p-12 md:flex-row md:items-center">
          <div tw="pl-8 flex flex-3 flex-col">
            <img
              tw="rounded-full"
              alt="Profile avatar"
              width={160}
              src={avatar ?? blo(address, 160)}
            />
            <h2 tw="text-6xl text-white">
              {displayName ?? formatAddress(address)}
            </h2>
            {description && (
              <div
                style={{ fontFamily: 'Inter', fontWeight: 400 }}
                tw="flex text-white text-2xl"
              >
                {description}
              </div>
            )}{' '}
            <h2
              style={{
                fontFamily: 'Inter',
                fontWeight: 800,
                marginTop: 64,
                fontSize: '3rem',
              }}
              tw="text-white"
            >
              Total Endorsements: {accountData.totalEndorsementsReceived ?? 0}
            </h2>
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
            name: 'Inter',
            data: fontMedium,
            weight: 600,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: fontBold,
            weight: 800,
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
