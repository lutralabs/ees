import { ExampleDocument } from '@/__generated__/eas/graphql';
import { getEasClient } from '@/lib/apollo';
import { useQuery } from '@apollo/client';

export const useEasExample = (chainId: number) => {
  return useQuery(ExampleDocument, {
    client: getEasClient(chainId),
  });
};
