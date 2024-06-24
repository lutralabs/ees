import type { NextRequest } from 'next/server';
import { validateOrGetDefaultNetwork } from '@/utils';
import { getEndorsementsAndDonationsServer } from '@/lib/ees';

export const revalidate = 30; // revalidate at most every 30 seconds

export async function GET(request: NextRequest) {
  try {
    // Get url parameters
    const searchParams = request.nextUrl.searchParams;

    const network = searchParams.get('network') as string;

    if (!network) {
      return Response.json(
        { error: 'Missing network parameter' },
        { status: 400 }
      );
    }

    const chainId = validateOrGetDefaultNetwork(network);

    const data = await getEndorsementsAndDonationsServer(chainId);

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Failed to fetch recent data.' },
      { status: 500 }
    );
  }
}
