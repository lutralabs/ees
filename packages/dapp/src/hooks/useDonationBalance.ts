import { CONTRACT_ADDRESSES, EESCore } from '@/lib/contracts';
import { config } from '@/lib/wagmi/config';
import { useReadContract } from 'wagmi';

export const useDonationBalance = (
  chainId: number,
  account: `0x${string}`,
  enabled: boolean
) => {
  return useReadContract({
    config: config,
    address: CONTRACT_ADDRESSES.ees[chainId] as `0x${string}`,
    abi: EESCore,
    functionName: 'getBalance',
    args: [account],
    query: {
      enabled,
      refetchInterval: 4000,
    },
  });
};
