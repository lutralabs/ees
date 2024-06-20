import {
  GetEndorsementsForAccountPaginatedDocument,
  type GetEndorsementsForAccountPaginatedQuery,
} from '@/__generated__/ees/graphql';
import { getGraphqlApiUrl } from './getGraphqlApiUrl';

type GetEndorsementsForAccountPaginatedParams = {
  chainId: number;
  account: string;
  page: number;
  perPage: number;
};

type GetEndorsementsForAccountPaginatedResult = {
  endorsements: NonNullable<
    GetEndorsementsForAccountPaginatedQuery['account']
  >['receivedEndorsements'];
  error: string | null;
};

export const getEndorsementsForAccountPaginated = async ({
  chainId,
  account,
  page,
  perPage,
}: GetEndorsementsForAccountPaginatedParams): Promise<GetEndorsementsForAccountPaginatedResult> => {
  try {
    const graphqlUrl = getGraphqlApiUrl(chainId);

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetEndorsementsForAccountPaginatedDocument,
        variables: {
          id: account,
          first: perPage,
          skip: perPage * (page - 1),
        },
      }),
      // Cache for 1 minute
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return {
        endorsements: [],
        error: 'Failed to fetch endorsements',
      };
    }

    const jsonResponse = await response.json();

    if (!jsonResponse) {
      return {
        endorsements: [],
        error: 'Failed to fetch endorsements',
      };
    }

    const data = jsonResponse.data as GetEndorsementsForAccountPaginatedQuery;

    return {
      endorsements: data.account?.receivedEndorsements ?? [],
      error: null,
    };
  } catch (error) {
    return {
      endorsements: [],
      error: 'Failed to fetch endorsements',
    };
  }
};
