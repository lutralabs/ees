import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const interRegular = fetch(
    new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  try {
    const fontRegular = await interRegular;

    const { searchParams } = new URL(req.url);

    const values = Object.fromEntries(searchParams);

    const { title, description, platform, account, avatar, type } = values;

    if (type && type) {
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
                    alt="EES Logo"
                    width={160}
                    src={`${avatar}`}
                  />
                ) : (
                  <div tw="w-[160px] h-[160px] flex items-center justify-center text-7xl font-semibold bg-blue-200 text-primary-800 rounded-full">
                    {account[0].toUpperCase()}
                  </div>
                )}
                <h2
                  tw="text-6xl"
                  style={{
                    fontFamily: 'Cal Sans SemiBold',
                    fontWeight: 'bold',
                  }}
                >
                  {account}
                </h2>
                <div tw="flex text-2xl">{description}</div>
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
              <h2
                tw="text-6xl"
                style={{
                  fontFamily: 'Cal Sans SemiBold',
                  fontWeight: 'bold',
                }}
              >
                Endorse.fun
              </h2>
              <div tw="flex text-2xl">
                <div>{'Build Web3 '}</div>
                <div tw="text-blue-500 ml-2">{' Reputation '}</div>
                <div tw="ml-2">{'with '}</div>
                <div tw="text-blue-500 ml-2">Endorsements</div>
              </div>
            </div>
            <div tw="h-[256px] w-[2px] bg-gray-600 mx-8" />
            <div tw="flex flex-2 flex-col items-center justify-center">
              <img
                alt="EES Logo"
                width={256}
                src="https://i.imgur.com/QpxIqHT.png" //FIXME: Replace with deployed URL and fetch from PUBLIC folder
              />
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
    return new Response('Failed to generate image', {
      status: 500,
    });
  }
}
