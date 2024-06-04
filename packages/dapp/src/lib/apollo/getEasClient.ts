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

const GRAPHQL_API_URLS: { [key: number]: string } = {
  1337: '',
  11155111: 'https://sepolia.easscan.org/graphql',
  8453: 'https://base.easscan.org/graphql',
  84532: 'https://base-sepolia.easscan.org/',
};

export const getEasClient = (chainId: number) => {
  if (_initializedClients[chainId] === null) {
    _initializedClients[chainId] = new ApolloClient({
      uri: GRAPHQL_API_URLS[chainId],
      cache: new InMemoryCache(),
    });
  }

  return _initializedClients[chainId]!;
};
