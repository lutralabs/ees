import { APP_URL } from '@/utils';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Check out my profile on endorse.fun!';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const revalidate = 86400; // Cache for 1 day

export default async function Image() {
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
              endorse.fun
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
              alt="EES Logo with text"
              width={256}
              src={`${APP_URL}/endorse.png`}
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
