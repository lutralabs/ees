const SEPOLIA_ENDPOINTS: string[] = [];
const BASE_SEPOLIA_ENDPOINTS: string[] = [];
const BASE_ENDPOINTS: string[] = [];

// Push endpoints to the corresponding array if they are set
// Sepolia
if (process.env.EES_SEPOLIA_GRAPHQL_ENDPOINT_ALCHEMY) {
  SEPOLIA_ENDPOINTS.push(process.env.EES_SEPOLIA_GRAPHQL_ENDPOINT_ALCHEMY);
}

if (process.env.EES_SEPOLIA_GRAPHQL_ENDPOINT_GRAPH_NETWORK) {
  SEPOLIA_ENDPOINTS.push(
    process.env.EES_SEPOLIA_GRAPHQL_ENDPOINT_GRAPH_NETWORK
  );
}

// Base Sepolia
if (process.env.EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT_ALCHEMY) {
  BASE_SEPOLIA_ENDPOINTS.push(
    process.env.EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT_ALCHEMY
  );
}

if (process.env.EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT_GRAPH_NETWORK) {
  BASE_SEPOLIA_ENDPOINTS.push(
    process.env.EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT_GRAPH_NETWORK
  );
}

// Base
if (process.env.EES_BASE_GRAPHQL_ENDPOINT_ALCHEMY) {
  BASE_ENDPOINTS.push(process.env.EES_BASE_GRAPHQL_ENDPOINT_ALCHEMY);
}

if (process.env.EES_BASE_GRAPHQL_ENDPOINT_GRAPH_NETWORK) {
  BASE_ENDPOINTS.push(process.env.EES_BASE_GRAPHQL_ENDPOINT_GRAPH_NETWORK);
}

// Function to pick one randomly
const getRandomEndpoint = (endpoints: string[]) => {
  if (endpoints.length === 0) {
    throw new Error('No endpoints available');
  }

  if (endpoints.length === 1) {
    return endpoints[0];
  }

  // We won't have more than 2 endpoints
  return endpoints[Math.random() <= 0.0 ? 0 : 1];
};

export const getGraphqlApiUrl = (chainId: number) => {
  switch (chainId) {
    case 1337:
      return 'http://localhost:8000/subgraphs/name/ees';
    case 11155111:
      return getRandomEndpoint(SEPOLIA_ENDPOINTS);
    case 8453:
      return getRandomEndpoint(BASE_ENDPOINTS);
    case 84532:
      return getRandomEndpoint(BASE_SEPOLIA_ENDPOINTS);
    default:
      throw new Error('Unsupported chain ID');
  }
};
