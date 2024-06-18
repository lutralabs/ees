import {
  FarcasterNetwork,
  getInsecureHubRpcClient,
  makeCastAdd,
  NobleEd25519Signer,
  CastType,
} from '@farcaster/hub-nodejs';
import { hexToBytes } from '@noble/hashes/utils';
import {
  GetTopEndorseesDocument,
  type GetTopEndorseesQuery,
} from './__generated__/ees/graphql';
import {
  GetFarcasterSocialsByAddressDocument,
  type GetFarcasterSocialsByAddressQuery,
} from './__generated__/airstack/graphql';
import { zeroAddress } from 'viem';

import 'dotenv/config';

const SIGNER = process.env.SIGNER_PRIVATE_KEY || zeroAddress;
const FID = 662535;

const HUB_URL = process.env.HUB_URL || 'https://farcaster.xyz'; // URL + Port of the Hub
const NETWORK = FarcasterNetwork.MAINNET; // Network of the Hub
console.log(HUB_URL);

const fetchUserByAddress = async (
  address: string
): Promise<{ fid: string; name: string } | null> => {
  const result = await fetch(process.env.AIRSTACK_API_URL!, {
    method: 'POST',
    headers: {
      Authorization: process.env.AIRSTACK_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GetFarcasterSocialsByAddressDocument,
      variables: {
        identity: address,
      },
    }),
  });

  // Check if request was successful
  if (!result.ok) {
    throw new Error('Failed to fetch profile');
  }

  const jsonResponse = await result.json();
  if (!jsonResponse) {
    throw new Error('No data returned');
  }
  // @ts-ignore
  const data = jsonResponse.data as GetFarcasterSocialsByAddressQuery;
  if (
    !data.Socials?.Social ||
    !data.Socials.Social[0] ||
    !data.Socials.Social[0].profileTokenId ||
    !data.Socials.Social[0].profileHandle
  ) {
    return null;
  }
  return {
    fid: data.Socials.Social[0].profileTokenId,
    name: data.Socials.Social[0].profileHandle,
  };
};

const fetchEndorsees = async (): Promise<{ fid: number; name: string }[]> => {
  const response = await fetch(process.env.GRAPH_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GetTopEndorseesDocument,
      variables: {
        first: 10,
        skip: 0,
      },
    }),
  });
  if (!response.ok) {
    throw new Error('Request failed with status code');
  }
  const jsonResponse = await response.json();
  if (!jsonResponse) {
    throw new Error('No data returned');
  }
  // @ts-ignore
  const data = jsonResponse.data as GetTopEndorseesQuery;
  const accounts: { fid: number; name: string }[] = [];
  for (const account of data.accounts) {
    if (accounts.length === 5) {
      break;
    }
    const userData = await fetchUserByAddress(account.id);
    if (!userData) {
      continue;
    }
    const parsedInt = Number.parseInt(userData.fid);
    accounts.push({ fid: parsedInt, name: userData.name });
  }
  return accounts;
};

async function main() {
  const privateKeyBytes = hexToBytes(SIGNER.slice(2));
  const ed25519Signer = new NobleEd25519Signer(privateKeyBytes);
  const dataOptions = {
    fid: FID,
    network: NETWORK,
  };

  const client = getInsecureHubRpcClient(HUB_URL);
  const castResults = [];
  const endorsees: { fid: number; name: string }[] = await fetchEndorsees();
  const text =
    'Top endorsees leaderboard:\n1. \n2. \n3. \n4. \n5. \n\nendorse.fun - Endorsing made fun!';
  const mentions = endorsees.map((endorsee) => endorsee.fid);
  const mentionsPositions = [];
  let currentIndex = 0;
  for (let i = 0; i < endorsees.length; i++) {
    currentIndex = text.indexOf('\n', currentIndex) + 4;
    mentionsPositions.push(currentIndex);
  }

  const castWithMentions = await makeCastAdd(
    {
      text,
      embeds: [{ url: 'https://endorse.fun' }],
      embedsDeprecated: [],
      mentions,
      mentionsPositions,
      type: CastType.CAST,
    },
    dataOptions,
    ed25519Signer
  );
  castResults.push(castWithMentions);
  const submission = await client.submitMessage(
    castWithMentions._unsafeUnwrap()
  );
  if (submission.isErr()) {
    console.error('Failed to submit message:', submission.error);
    process.exit(1);
  }
  client.close();
  console.log('Cast submitted');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit();
  });
