import { getGraphqlApiUrl } from './getGraphqlApiUrl';

export const getTopEndorsers = async ({
  chainId,
  account,
}: {
  chainId: number;
  account: string;
}) => {
  const graphqlUrl = getGraphqlApiUrl(chainId);
};
