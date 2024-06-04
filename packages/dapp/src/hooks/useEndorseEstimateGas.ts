import { CONTRACT_ADDRESSES } from '@/lib/contracts';
import { config } from '@/lib/wagmi/config';
import { parseEther } from 'viem';
import { useEstimateGas } from 'wagmi';

export const useEndorseEstimateGas = ({
  chainId,
  encodedFunctionData,
  endorsementPrice,
  donationValue,
}: {
  chainId: number;
  encodedFunctionData?: `0x${string}`;
  endorsementPrice?: bigint;
  donationValue: string;
}) => {
  const _donationValue = donationValue ? parseEther(donationValue) : BigInt(0);
  const _endorsementPrice: bigint = endorsementPrice ?? BigInt(0);

  return useEstimateGas({
    config: config,
    to: CONTRACT_ADDRESSES.ees[chainId],
    chainId: chainId as any,
    data: encodedFunctionData,
    value: _donationValue + _endorsementPrice,
    query: {
      retry: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      enabled: !!encodedFunctionData && !!endorsementPrice,
      placeholderData: BigInt(406360),
      initialData: BigInt(406360),
    },
  });
};
