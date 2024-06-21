import {
  GetAttestationDocument,
  type GetAttestationQuery,
} from '@/__generated__/eas/graphql';
import { getGraphqlApiUrl } from './getGraphqlApiUrl';

export const getAttestation = async ({
  chainId,
  id,
}: { chainId: number; id: string }) => {
  const graphqlUrl = getGraphqlApiUrl(chainId);

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GetAttestationDocument,
      variables: {
        where: {
          id,
        },
      },
    }),
    // Cache for 1 minute
    next: { revalidate: 60 },
  });

  // Check if request was successful
  if (!response.ok) {
    return null;
  }

  const jsonResponse = await response.json();

  // Check if we successfully decoded the response
  if (!jsonResponse) {
    return null;
  }

  const data = jsonResponse.data as GetAttestationQuery;

  return data.attestation;
};
