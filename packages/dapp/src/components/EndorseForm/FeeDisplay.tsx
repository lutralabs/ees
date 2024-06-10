import { ChevronUpIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAccount, useEstimateFeesPerGas } from 'wagmi';
import { config } from '@/lib/wagmi/config';
import { Skeleton } from '@/components/ui/skeleton';
import { formatEther } from 'viem';
import {
  useDonationFeePercentage,
  useEndorseEstimateGas,
  useEndorsementPrice,
  useQuota,
} from '@/hooks';
import { DEFAULT_CHAIN_ID } from '@/lib/contracts';
import { calculateNetworkCost } from '@/utils/calculateNetworkCost';
import { MemoizedSVG } from '@/components/MemoizedSVG';

type FeeDisplayProps = {
  donationValue: string;
  encodedFunctionData: `0x${string}` | undefined;
};

// Display total fee and allow for opening of dropdown which displays a list of fees paid
export const FeeDisplay = ({
  donationValue,
  encodedFunctionData,
}: FeeDisplayProps) => {
  // Local state
  const [showDetailedFees, setShowDetailedFees] = useState(false);

  // Hooks
  const { chainId } = useAccount();

  const {
    data: quota,
    isPending: isQuotaPending,
    isError: isQuotaError,
  } = useQuota({
    fiat: 'USD',
    crypto: 'ETH',
    enabled: true,
  });

  const {
    data: endorsementPrice,
    isPending: isEndorsementPricePending,
    isError: isEndorsementPriceError,
  } = useEndorsementPrice(chainId ?? DEFAULT_CHAIN_ID);

  const {
    data: feesPerGas,
    isPending: isFeesPerGasPending,
    isError: isFeesPerGasError,
  } = useEstimateFeesPerGas({
    config: config,
    chainId: (chainId as any) ?? DEFAULT_CHAIN_ID,
  });

  const { data: gasEstimate, isFetching: isGasEstimateFetching } =
    useEndorseEstimateGas({
      chainId: chainId ?? DEFAULT_CHAIN_ID,
      encodedFunctionData: encodedFunctionData,
      endorsementPrice: endorsementPrice,
      donationValue: donationValue,
    });

  const {
    data: donationFeePercentage,
    isPending: isDonationFeePercentagePending,
    isError: isDonationFeePercentageError,
  } = useDonationFeePercentage(chainId ?? DEFAULT_CHAIN_ID);

  const donationFeeCut = useMemo(() => {
    if (!donationFeePercentage || !quota) return '0';
    const _fee = Number(donationFeePercentage.toString()) / (100 * 100);
    return (_fee * Number(donationValue) * quota.price).toFixed(2);
  }, [donationFeePercentage, donationValue, quota]);

  const totalFee = useMemo(() => {
    // Convert values to numbers
    const _endorsementPrice = endorsementPrice
      ? Number(formatEther(endorsementPrice))
      : 0;
    const _donationValue = donationValue ? Number(donationValue) : 0;
    const _fee =
      Number(donationFeePercentage ? donationFeePercentage.toString() : '0') /
      (100 * 100);
    const _quota = quota?.price ?? 0;

    // Calculate total fee
    return (
      (_endorsementPrice + _donationValue * _fee) * _quota +
      calculateNetworkCost(gasEstimate, feesPerGas?.maxFeePerGas, quota?.price)
    );
  }, [endorsementPrice, donationValue, quota, gasEstimate, feesPerGas]);

  // Use memo for caching Components
  const TotalFee = useMemo(() => {
    if (
      isQuotaPending ||
      isEndorsementPricePending ||
      isDonationFeePercentagePending ||
      isGasEstimateFetching ||
      isFeesPerGasPending
    ) {
      return <Skeleton className="h-4 w-16 bg-gray-400" />;
    }

    if (
      isQuotaError ||
      isDonationFeePercentageError ||
      isEndorsementPriceError ||
      isFeesPerGasError
    ) {
      return <span className="text-red-500">Can't estimate fee.</span>;
    }

    return (
      <div className="flex justify-center items-center">
        <div className="text-sm mr-1">{`$${totalFee.toFixed(2)}`}</div>
        <button
          type="button"
          className="cursor-pointer flex items-center justify-center"
          onMouseDown={() => setShowDetailedFees(!showDetailedFees)}
        >
          <ChevronUpIcon
            className={cn(
              'w-5 h-5 text-gray-400 hover:text-gray-400 transition-all',
              !showDetailedFees && 'rotate-180'
            )}
          />
        </button>
      </div>
    );
  }, [
    // Pending states
    isQuotaPending,
    isEndorsementPricePending,
    isDonationFeePercentagePending,
    isGasEstimateFetching,
    isFeesPerGasPending,
    // Error states
    isQuotaError,
    isDonationFeePercentageError,
    isEndorsementPriceError,
    isFeesPerGasError,
    // Values
    donationValue,
    totalFee,
    showDetailedFees,
  ]);

  const DonationAmount = useMemo(() => {
    if (isQuotaPending) {
      return <Skeleton className="h-4 w-16 bg-gray-400" />;
    }

    if (isQuotaError) {
      return <span className="text-red-500">Can't estimate fee.</span>;
    }

    return (
      <p className="text-sm">
        ${(Number(donationValue) * quota.price).toFixed(2)}
      </p>
    );
  }, [isQuotaPending, isQuotaError, donationValue, quota]);

  const DonationFeeCut = useMemo(() => {
    if (isDonationFeePercentagePending) {
      return <Skeleton className="h-4 w-16 bg-gray-400" />;
    }

    if (isDonationFeePercentageError) {
      return <span className="text-red-500">Can't estimate fee.</span>;
    }

    return <p className="text-sm">${donationFeeCut}</p>;
  }, [
    isDonationFeePercentagePending,
    isDonationFeePercentageError,
    donationFeeCut,
  ]);

  const EndorsementPrice = useMemo(() => {
    if (isEndorsementPricePending || isQuotaPending) {
      return <Skeleton className="h-4 w-16 bg-gray-400" />;
    }

    if (isEndorsementPriceError || isQuotaError) {
      return <span className="text-red-500">Can't estimate price.</span>;
    }

    return (
      <p className="text-sm">
        ${(Number(formatEther(endorsementPrice)) * quota.price).toFixed(2)}
      </p>
    );
  }, [
    isEndorsementPricePending,
    isEndorsementPriceError,
    endorsementPrice,
    isQuotaPending,
    isQuotaError,
    quota,
  ]);

  const NetworkCost = useMemo(() => {
    if (isGasEstimateFetching || isQuotaPending || isFeesPerGasPending) {
      return <Skeleton className="h-4 w-16 bg-gray-400" />;
    }

    if (isQuotaError || isFeesPerGasError) {
      return <span className="text-red-500">Can't estimate gas.</span>;
    }

    const _networkCost = calculateNetworkCost(
      gasEstimate,
      feesPerGas?.maxFeePerGas,
      quota?.price
    );

    return (
      <div className="flex items-center justify-center text-sm">
        <MemoizedSVG src="/icons/icon-gas.svg" className="w-4 h-4 mr-1" />
        {_networkCost < 0.01 ? '<$0.01' : `$${_networkCost.toFixed(2)}`}
      </div>
    );
  }, [
    isGasEstimateFetching,
    gasEstimate,
    isFeesPerGasPending,
    isFeesPerGasError,
    feesPerGas,
    isQuotaPending,
    isQuotaError,
    quota,
  ]);

  return (
    <div className="text-sm justify-between w-full gap-x-1 text-gray-600">
      <div className={cn('flex pt-2', showDetailedFees && 'pb-2')}>
        <div className="flex-1">Total fees</div>
        {TotalFee}
      </div>
      {showDetailedFees && (
        <div
          className={cn(
            'flex flex-col gap-y-2 pt-2 transition-all duration-300 ease-in-out',
            showDetailedFees && 'border-t-2 border-gray-200'
          )}
        >
          <div className="flex justify-between items-center">
            <p className="text-sm">Network cost</p>
            <div className="flex items-center">{NetworkCost}</div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Tip</p>
            {DonationAmount}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Endorsement price</p>
            <div className="flex items-center">{EndorsementPrice}</div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">{`Tip fee (${
              donationFeePercentage
                ? (Number(donationFeePercentage) / 100).toString()
                : '...'
            }%)`}</p>
            <div className="flex items-center">{DonationFeeCut}</div>
          </div>
        </div>
      )}
    </div>
  );
};
