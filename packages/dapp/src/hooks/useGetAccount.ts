import {
  GetAccountDocument,
  type GetAccountQueryVariables,
} from '@/__generated__/ees/graphql';
import { getEesClient } from '@/lib/apollo';
import { useQuery } from '@apollo/client';

export const useGetAccount = ({
  variables,
  chainId,
}: { variables: GetAccountQueryVariables; chainId: number }) => {
  return useQuery(GetAccountDocument, {
    variables: variables,
    client: getEesClient(chainId),
  });
};
