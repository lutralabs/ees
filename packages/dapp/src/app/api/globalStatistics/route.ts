import type { NextRequest } from 'next/server';
import { validateOrGetDefaultNetwork } from '@/utils';
import { getGraphqlApiUrl } from '@/lib/ees';
import {
  GetGlobalStatisticsDocument,
  type GetGlobalStatisticsQuery,
} from '@/__generated__/ees/graphql';

export const revalidate = 60; // revalidate at most every 1 minute

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

    const graphqlUrl = getGraphqlApiUrl(chainId);

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetGlobalStatisticsDocument,
      }),
      // Cache for 1 minute
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to global statistics' },
        { status: 500 }
      );
    }

    const jsonResponse = await response.json();

    if (!jsonResponse) {
      return Response.json({ error: 'Failed to fetch price' }, { status: 500 });
    }

    const data = jsonResponse.data as GetGlobalStatisticsQuery;

    const globalStatistics: GetGlobalStatisticsQuery['globalStatistics'] =
      data.globalStatistics ?? {
        id: '0x476c6f62616c53746174697374696373',
        totalEndorsements: '0',
        totalDonations: '0',
        totalDonationAmount: '0',
        totalWithdrawnAmount: '0',
      };

    return Response.json(globalStatistics);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Failed to global statistics' },
      { status: 500 }
    );
  }
}
