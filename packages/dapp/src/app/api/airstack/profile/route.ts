import {
  GetProfileInfoDocument,
  TokenBlockchain,
} from '@/__generated__/airstack/graphql';
import { getAirstackClient } from '@/lib/apollo';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Get url parameters
  const searchParams = request.nextUrl.searchParams;

  const identity = searchParams.get('identity');

  if (!identity) {
    return Response.json(
      { error: 'Missing identity parameter' },
      { status: 400 }
    );
  }

  const client = getAirstackClient();

  const { data, error } = await client.query({
    query: GetProfileInfoDocument,
    variables: {
      identity: identity,
      blockchain: TokenBlockchain.Ethereum,
    },
  });

  if (
    !data.Wallet ||
    !data.Wallet.addresses ||
    data.Wallet.addresses.length === 0
  ) {
    return Response.json({ error: 'Profile not found' }, { status: 404 });
  }

  if (error) {
    console.log(JSON.stringify(error));
    return Response.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }

  return Response.json(data);
}
