const SEPOLIA_ENDPOINT = process.env.EAS_SEPOLIA_GRAPHQL_ENDPOINT!;
const BASE_ENDPOINT = process.env.EAS_BASE_GRAPHQL_ENDPOINT!;
const BASE_SEPOLIA_ENDPOINT = process.env.EAS_BASE_SEPOLIA_GRAPHQL_ENDPOINT!;

export const getGraphqlApiUrl = (chainId: number) => {
  switch (chainId) {
    case 1337:
      return 'http://localhost:8000/subgraphs/name/ees';
    case 11155111:
      return SEPOLIA_ENDPOINT;
    case 8453:
      return BASE_ENDPOINT;
    case 84532:
      return BASE_SEPOLIA_ENDPOINT;
    default:
      throw new Error('Unsupported chain ID');
  }
};
