import { formatEther, parseGwei } from 'viem';

export const calculateNetworkCost = (
  gasEstimate: bigint | undefined,
  maxFeePerGas: bigint | undefined,
  quota: number | undefined
) => {
  const _gasEstimate = gasEstimate ?? BigInt(0);
  const _feesPerGas = maxFeePerGas
    ? parseGwei(formatEther(maxFeePerGas, 'wei'))
    : BigInt(0);
  const _quota = quota ?? 0;

  return Number(formatEther(_feesPerGas * _gasEstimate, 'gwei')) * _quota;
};
