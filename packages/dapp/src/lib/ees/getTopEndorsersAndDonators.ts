import {
  GetTopEndorsersAndDonatorsDocument,
  type GetTopEndorsersAndDonatorsQuery,
} from '@/__generated__/ees/graphql';
import { getGraphqlApiUrl } from './getGraphqlApiUrl';

type GetTopEndorsersAndDonatorsResult = {
  topEndorsers: GetTopEndorsersAndDonatorsQuery['topEndorsers'];
  topDonators: GetTopEndorsersAndDonatorsQuery['topDonators'];
  error: string | null;
};

export const getTopEndorsersAndDonators = async ({
  chainId,
  account,
}: {
  chainId: number;
  account: string;
}): Promise<GetTopEndorsersAndDonatorsResult> => {
  try {
    const graphqlUrl = getGraphqlApiUrl(chainId);

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetTopEndorsersAndDonatorsDocument,
        variables: {
          account,
        },
      }),
      // Cache for 1 minute
      next: { revalidate: 60 },
    });

    // Check if request was successful
    if (!response.ok) {
      return {
        topEndorsers: [],
        topDonators: [],
        error: 'Failed to fetch data',
      };
    }

    const jsonResponse = await response.json();

    // Check if we successfully decoded the response
    if (!jsonResponse) {
      return {
        topEndorsers: [],
        topDonators: [],
        error: 'Failed to fetch data',
      };
    }

    const data = jsonResponse.data as GetTopEndorsersAndDonatorsQuery;

    return {
      topEndorsers: data.topEndorsers ?? [],
      topDonators: data.topDonators ?? [],
      error: null,
    };
  } catch (error) {
    return {
      topEndorsers: [],
      topDonators: [],
      error: 'Failed to fetch data',
    };
  }
};
