import { formatEther } from 'viem';

export const calculateNetworkCost = (
  gasEstimate: bigint | undefined,
  maxFeePerGas: bigint | undefined,
  quota: number | undefined
) => {
  const _gasEstimate = gasEstimate ?? BigInt(0);
  const _feesPerGas = maxFeePerGas ?? BigInt(0);
  const _gasFees = Number(formatEther(_feesPerGas * _gasEstimate, 'wei'));
  const _quota = quota ?? 0;

  return _gasFees * _quota;
};
