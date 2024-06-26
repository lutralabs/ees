import type { NextRequest } from 'next/server';
import {
  getAvatarForPlatform,
  getBasicPlatformProfileInfo,
  getProfileInfo,
} from '@/lib/airstack';
import { validateOrGetDefaultPlatform } from '@/utils';

export async function GET(request: NextRequest) {
  try {
    // Get url parameters
    const searchParams = request.nextUrl.searchParams;
    const identity = searchParams.get('identity');
    const platform = searchParams.get('platform');

    if (!identity) {
      return Response.json(
        { error: 'Missing identity parameter' },
        { status: 400 }
      );
    }

    const _platform = validateOrGetDefaultPlatform(platform);
    const data = await getProfileInfo(identity, _platform);
    const mainAddress = data.Wallet!.addresses![0] as `0x${string}`;
    const avatar = getAvatarForPlatform(data, _platform);
    const basicProfileInfo = getBasicPlatformProfileInfo(data, _platform);

    return Response.json({
      ...(avatar && { avatar }),
      ...(mainAddress && { address: mainAddress }),
      ...(basicProfileInfo.handle && { username: basicProfileInfo.handle }),
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Failed to get global statistics' },
      { status: 500 }
    );
  }
}
