import { APP_URL } from '@/utils';
import { readFile } from 'node:fs/promises';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Check out endorse.fun!';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const revalidate = 86400; // Cache for 1 day

export default async function Image() {
  const fontRegular = await readFile('public/fonts/Inter-Regular.ttf');
  const fontMedium = await readFile('public/fonts/Inter-Medium.otf');
  const fontBold = await readFile('public/fonts/Inter-Bold.otf');

  try {
    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <img
          style={{
            position: 'absolute',
            top: -190,
            right: -60,
            opacity: 0.5,
            transform: 'rotate(180deg)',
          }}
          alt="BG"
          width={384}
          src={`${APP_URL}/images/bg-blue.png`}
        />
        <img
          alt="EES Logo with text"
          width={768}
          src={`${APP_URL}/endorse.png`}
        />
        <div
          style={{
            fontSize: '32px',
            fontFamily: 'Inter',
            fontWeight: 600,
            marginTop: 32,
          }}
          tw="flex justify-center"
        >
          <div tw="flex">
            <div>{'Build Web3 '}</div>
            <div tw="text-blue-500 ml-2">{' Reputation '}</div>
            <div tw="ml-2">{'with '}</div>
            <div tw="text-blue-500 ml-2">Endorsements</div>
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
