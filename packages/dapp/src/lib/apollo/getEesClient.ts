import {
  InMemoryCache,
  ApolloClient,
  type NormalizedCacheObject,
} from '@apollo/client';

const _initializedClients: {
  [key: number]: ApolloClient<NormalizedCacheObject> | null;
} = {
  1337: null,
  11155111: null,
  8453: null,
  84532: null,
};

// Validate all env variables
if (!process.env.NEXT_PUBLIC_EES_SEPOLIA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_EES_SEPOLIA_GRAPHQL_ENDPOINT is not set');
}

if (!process.env.NEXT_PUBLIC_EES_BASE_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_EES_BASE_GRAPHQL_ENDPOINT is not set');
}

if (!process.env.NEXT_PUBLIC_EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT is not set');
}

const GRAPHQL_API_URLS: { [key: number]: string } = {
  1337: 'http://localhost:8000/subgraphs/name/ees',
  11155111: process.env.NEXT_PUBLIC_EES_SEPOLIA_GRAPHQL_ENDPOINT,
  8453: process.env.NEXT_PUBLIC_EES_BASE_GRAPHQL_ENDPOINT,
  84532: process.env.NEXT_PUBLIC_EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT,
};

export const getEesClient = (chainId: number) => {
  if (_initializedClients[chainId] === null) {
    _initializedClients[chainId] = new ApolloClient({
      uri: GRAPHQL_API_URLS[chainId],
      cache: new InMemoryCache(),
    });
  }

  return _initializedClients[chainId]!;
};
