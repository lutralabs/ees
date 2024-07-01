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
import { DEFAULT_CHAIN_ID } from '@/lib/contracts';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const cwd = process.cwd();
  const fontRegularPath = path.join(cwd, 'public/fonts/Inter-Regular.ttf');
  const fontMediumPath = path.join(cwd, 'public/fonts/Inter-Medium.otf');
  const fontBoldPath = path.join(cwd, 'public/fonts/Inter-Bold.otf');
  const fontRegular = await readFile(fontRegularPath);
  const fontMedium = await readFile(fontMediumPath);
  const fontBold = await readFile(fontBoldPath);

  try {
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
      chainId: DEFAULT_CHAIN_ID,
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
            bottom: 16,
            right: 32,
          }}
          alt="EES Logo"
          width={320}
          src={`${APP_URL}/endorse_white.png`}
        />
        <div tw="flex flex-col w-full px-8">
          <img
            style={{ objectFit: 'cover' }}
            width={160}
            height={160}
            tw="rounded-full"
            alt="Avatar"
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
    console.log(error);
    return new Response('Failed to generate OG image', {
      status: 500,
    });
  }
}
