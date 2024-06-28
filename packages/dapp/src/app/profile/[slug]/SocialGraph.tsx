import type { Endorser } from '@/components/InteractiveSocialGraph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMinimalProfileFromAddress } from '@/lib/airstack/getMinimalProfileFromAddress';
import { getTopEndorsersForAccount } from '@/lib/ees';
import dynamic from 'next/dynamic';

const InteractiveSocialGraph = dynamic(
  () =>
    import('@/components/InteractiveSocialGraph').then(
      (mod) => mod.InteractiveSocialGraph
    ),
  { ssr: false }
);

const fetchGraphData = async ({
  chainId,
  account,
  depth = 6,
}: { chainId: number; account: `0x${string}`; depth?: number }) => {
  const accountData = new Map<`0x${string}`, Endorser[]>();

  let accountsToFetch = [account];

  while (depth > 0) {
    // Fetch endorsers for each account
    const settledResponses = await Promise.allSettled(
      accountsToFetch.map(async (account) => {
        const { endorsers, error } = await getTopEndorsersForAccount({
          chainId,
          account,
          first: 10,
        });

        if (error) {
          console.error(error);
          return [];
        }

        // Fetch minimal profile data for each endorser
        const minimalProfileSettledResponses = await Promise.allSettled(
          endorsers.map(async (endorser) => {
            const { displayName, address, description, avatar } =
              await getMinimalProfileFromAddress(endorser.from.id);

            return {
              displayName,
              address: address ?? endorser.from.id,
              description,
              avatar,
              totalEndorsementsReceived:
                endorser.from.totalEndorsementsReceived,
              endorsements: endorser.from.sentEndorsements,
            };
          })
        );

        // Filter out any errors
        const minimalProfileSuccessfulResponses = minimalProfileSettledResponses
          .filter((response) => response.status === 'fulfilled')
          .map((result: any) => result.value as Endorser);

        return { account, endorsers: minimalProfileSuccessfulResponses };
      })
    );

    // Filter out any errors
    const successfulResponses = settledResponses
      .filter((response) => response.status === 'fulfilled')
      .map(
        (result: any) =>
          result.value as {
            account: `0x${string}`;
            endorsers: Endorser[];
          }
      );

    for (const { account, endorsers } of successfulResponses) {
      accountData.set(account, endorsers);
    }

    accountsToFetch = successfulResponses
      .flatMap(({ endorsers }) =>
        endorsers.map((endorser) => endorser.address!)
      )
      .filter((account) => !accountData.has(account!));

    if (accountsToFetch.length === 0) {
      break;
    }

    depth--;
  }

  return accountData;
};

type SocialGraphProps = {
  chainId: number;
  account: `0x${string}`;
  avatar: string | null;
  displayName: string | null;
  totalEndorsementsReceived: number;
};

export const SocialGraph = async ({
  chainId,
  account,
  avatar,
  displayName,
  totalEndorsementsReceived,
}: SocialGraphProps) => {
  const graphData = await fetchGraphData({ chainId, account });

  return (
    <div className="flex flex-col gap-y-4 overflow-auto px-2 pb-2">
      <Card className="rounded-sm shadow-md border-2 border-b-1 border-gray-200">
        <CardHeader>
          <CardTitle>Social Graph</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <InteractiveSocialGraph
            graphData={graphData}
            account={account}
            avatar={avatar}
            displayName={displayName}
            totalEndorsementsReceived={totalEndorsementsReceived}
          />
        </CardContent>
      </Card>
    </div>
  );
};
