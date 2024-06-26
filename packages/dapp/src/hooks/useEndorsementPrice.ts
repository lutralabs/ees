import { CONTRACT_ADDRESSES, EESCore } from '@/lib/contracts';
import { config } from '@/lib/wagmi/config';
import { useReadContract } from 'wagmi';

export const useEndorsementPrice = (chainId: number) => {
  return useReadContract({
    config: config,
    address: CONTRACT_ADDRESSES.ees[chainId] as `0x${string}`,
    abi: EESCore,
    functionName: 'getEndorsementPrice',
    args: [],
  });
};
