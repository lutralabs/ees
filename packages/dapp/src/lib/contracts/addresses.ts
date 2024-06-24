/**
 * Deployed contract addresses on different networks
 *
 * Prefixed with EES in case we add more contracts in the future
 */
export const CONTRACT_ADDRESSES: { ees: { [key: number]: `0x${string}` } } = {
  ees: {
    1337: '0xa0b4b77fd7afd4a38810fb2c060f93af5e085156', // Localhost
    11155111: '0x5Cb7f40d8a23d9Baff52cFd5A10994EcEfF9e7ED', // Sepolia
    8453: '0x6BbcC7D0E661a4f5441F74Dc0Ab324ac4327D940', // Base
    84532: '0x63F610a03Caa82ca32386BDb6F447a93d4D6F6e7', // Sepolia Base
  },
};
