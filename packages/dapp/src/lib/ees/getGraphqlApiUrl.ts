export const getGraphqlApiUrl = (chainId: number) => {
  switch (chainId) {
    case 1337:
      return 'http://localhost:8000/subgraphs/name/ees';
    case 11155111:
      return process.env.EES_SEPOLIA_GRAPHQL_ENDPOINT!;
    case 8453:
      return process.env.EES_BASE_GRAPHQL_ENDPOINT!;
    case 84532:
      return process.env.EES_BASE_SEPOLIA_GRAPHQL_ENDPOINT!;
    default:
      throw new Error('Unsupported chain ID');
  }
};
