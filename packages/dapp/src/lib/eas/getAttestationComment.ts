import {
  GetAttestationDecodedDataDocument,
  type GetAttestationDecodedDataQuery,
} from '@/__generated__/eas/graphql';
import { getGraphqlApiUrl } from './getGraphqlApiUrl';
import { getPropertyValue } from '@/utils/getPropertyValue';

export const getAttestationComment = async ({
  chainId,
  id,
}: { chainId: number; id: string }) => {
  try {
    const graphqlUrl = getGraphqlApiUrl(chainId);

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetAttestationDecodedDataDocument,
        variables: {
          where: {
            id,
          },
        },
      }),
      // We don't need to revalidate as the comment is not changing
      next: { revalidate: false },
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

    const data = jsonResponse.data as GetAttestationDecodedDataQuery;

    // We need to parse and extract the comment from the decoded data
    const decodedData = JSON.parse(data.attestation?.decodedDataJson ?? '{}');

    // Find comment in decoded data
    const comment = getPropertyValue(decodedData, 'comment');

    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
};
