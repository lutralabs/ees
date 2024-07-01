import {
  GetTopEndorsersForAccountDocument,
  type GetTopEndorsersForAccountQuery,
} from '@/__generated__/ees/graphql';
import { getGraphqlApiUrl } from './getGraphqlApiUrl';

type GetTopEndorsersForAccountResult = {
  endorsers: GetTopEndorsersForAccountQuery['topEndorsers'];
  error: string | null;
};

export const getTopEndorsersForAccount = async ({
  chainId,
  account,
  first,
}: {
  chainId: number;
  account: string;
  first: number;
}): Promise<GetTopEndorsersForAccountResult> => {
  try {
    const graphqlUrl = getGraphqlApiUrl(chainId);

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetTopEndorsersForAccountDocument,
        variables: {
          account,
          first,
        },
      }),
      // Cache for 1 minute
      next: { revalidate: 60 },
    });

    // Check if request was successful
    if (!response.ok) {
      return {
        endorsers: [],
        error: 'Failed to fetch data',
      };
    }

    const jsonResponse = await response.json();

    // Check if we successfully decoded the response
    if (!jsonResponse) {
      return {
        endorsers: [],
        error: 'Failed to fetch data',
      };
    }

    const data = jsonResponse.data as GetTopEndorsersForAccountQuery;

    return {
      endorsers: data.topEndorsers ?? [],
      error: null,
    };
  } catch (error) {
    return {
      endorsers: [],
      error: 'Failed to fetch data',
    };
  }
};
