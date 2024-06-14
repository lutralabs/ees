'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components//ui/button';
import { EndorseeCard } from './EndorseeCard';
import { DonationCard } from './DonationCard';
import { FeeDisplay } from './FeeDisplay';
import { DonationButton } from './DonationButton';
import { CommentButton } from './CommentButton';
import { CommentCard } from './CommentCard';
import { useAccount, useEstimateFeesPerGas, useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESSES, DEFAULT_CHAIN_ID, EESCore } from '@/lib/contracts';
import { config } from '@/lib/wagmi/config';
import {
  type WriteContractErrorType,
  parseEther,
  encodeFunctionData,
} from 'viem';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEndorsementStore } from '@/stores';
import { toast } from 'sonner';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { EXPLORERS } from '@/lib/contracts/explorers';
import { useDebounce } from 'react-use';
import {
  useEndorsementPrice,
  useEndorseEstimateGas,
  useDonationFeePercentage,
} from '@/hooks';
import { cn } from '@/lib/utils';
import { ConnectButtonCustom } from '@/components/ConnectButtonCustom';

type EndorseeProps = {
  endorsee: React.ReactNode;
};

export const EndorseForm = ({ endorsee }: EndorseeProps) => {
  const searchParams = useSearchParams();
  const intro = !!searchParams.get('intro');

  // Global state
  const {
    address,
    displayValue,
    donationValue,
    endorsementType,
    comment,
    platform,
    partialClear,
  } = useEndorsementStore((state) => ({
    address: state.address,
    displayValue: state.displayValue,
    donationValue: state.donationValue,
    endorsementType: state.endorsementType,
    comment: state.comment,
    platform: state.platform,
    partialClear: state.partialClear,
  }));

  // Local state
  const [donationOpen, setDonationOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [encodedFunctionData, setEncodedFunctionData] = useState<
    `0x${string}` | undefined
  >();
  const [previousErrorInsufficientFunds, setPreviousErrorInsufficientFunds] =
    useState<boolean>(false);

  // Hooks
  const { address: connectedAccount, chainId } = useAccount();

  useDebounce(
    () => {
      setEncodedFunctionData(
        encodeFunctionData({
          abi: EESCore,
          functionName: 'endorse',
          args: [
            address ?? '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            endorsementType,
            comment,
            displayValue ?? 'vitalik.eth',
          ],
        })
      );
    },
    1000,
    [displayValue, comment, endorsementType, address]
  );

  const { writeContractAsync, isPending } = useWriteContract({
    config: config,
  });

  const {
    data: endorsementPrice,
    isPending: isEndorsementPricePending,
    isError: isEndorsementPriceError,
  } = useEndorsementPrice(chainId ?? DEFAULT_CHAIN_ID);

  const { isPending: isFeesPerGasPending, isError: isFeesPerGasError } =
    useEstimateFeesPerGas({
      config: config,
      chainId: (chainId as any) ?? DEFAULT_CHAIN_ID,
    });

  const {
    isFetching: isGasEstimateFetching,
    isError: isGasEstimateError,
    error: gasEstimateError,
  } = useEndorseEstimateGas({
    chainId: chainId ?? DEFAULT_CHAIN_ID,
    encodedFunctionData: encodedFunctionData,
    endorsementPrice: endorsementPrice,
    donationValue: donationValue,
  });

  const {
    isPending: isDonationFeePercentagePending,
    isError: isDonationFeePercentageError,
  } = useDonationFeePercentage(chainId ?? DEFAULT_CHAIN_ID);

  const areRequestsPending = useMemo(
    () =>
      isEndorsementPricePending ||
      isFeesPerGasPending ||
      isDonationFeePercentagePending,
    [
      isEndorsementPricePending,
      isFeesPerGasPending,
      isDonationFeePercentagePending,
    ]
  );

  const isError = useMemo(
    () =>
      isEndorsementPriceError ||
      isFeesPerGasError ||
      isGasEstimateError ||
      isDonationFeePercentageError,
    [
      isEndorsementPriceError,
      isFeesPerGasError,
      isGasEstimateError,
      isDonationFeePercentageError,
    ]
  );

  useEffect(() => {
    if (isGasEstimateFetching) return;

    if (
      gasEstimateError?.name === 'EstimateGasExecutionError' &&
      gasEstimateError.cause.name === 'InsufficientFundsError'
    ) {
      setPreviousErrorInsufficientFunds(true);
    } else {
      setPreviousErrorInsufficientFunds(false);
    }
  }, [isGasEstimateFetching, gasEstimateError]);

  // Functions
  const handleEnorsment = async () => {
    if (
      !address ||
      !displayValue ||
      !connectedAccount ||
      !endorsementPrice ||
      !chainId
    ) {
      return;
    }

    const _value = parseEther(donationValue ?? '0') + endorsementPrice;
    const _displayValue = `${platform}:${displayValue}`;

    writeContractAsync({
      abi: EESCore,
      address: CONTRACT_ADDRESSES.ees[chainId],
      functionName: 'endorse',
      args: [address, endorsementType, comment, _displayValue],
      value: _value,
    })
      .then((txHash) => {
        partialClear();
        toast(
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex flex-col gap-y-1">
              <h3 className="font-semibold justify-start items-center">
                Transaction submitted
              </h3>
              <div className="flex justify-start items-center text-xs">
                Hash:
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 pl-1 text-xs h-4"
                  onClick={() =>
                    window.open(`${EXPLORERS[chainId]}/tx/${txHash}`, '_blank')
                  }
                >
                  {`${txHash.slice(0, 4)}...${txHash.slice(-4)}`}
                </Button>
              </div>
            </div>
          </div>,
          {
            duration: 4000,
          }
        );
      })
      .catch((error: WriteContractErrorType) => {
        if (error.name === 'TransactionExecutionError') {
          if (error.cause.name === 'UserRejectedRequestError') {
            return toast(
              <div className="flex gap-x-2">
                <div className="flex items-center justify-center">
                  <CircleAlert className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex flex-col gap-y-1 items-center justify-center">
                  <h3 className="font-semibold">Transaction rejected</h3>
                </div>
              </div>,
              {
                duration: 2000,
              }
            );
          }
        }

        return toast(
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center">
              <CircleAlert className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex flex-col gap-y-1 items-center justify-center">
              <h3 className="font-semibold">Something went wrong</h3>
            </div>
          </div>,
          {
            duration: 2000,
          }
        );
      });
  };

  return (
    <Card className="p-4 flex flex-col gap-y-4 overflow-hidden shadow-lg">
      <EndorseeCard endorsee={endorsee} />
      {(donationOpen || intro) && (
        <DonationCard close={() => setDonationOpen(false)} />
      )}
      {commentOpen && <CommentCard close={() => setCommentOpen(false)} />}
      <div className="flex max-sm:flex-col max-sm:gap-y-4 sm:gap-x-2">
        {!commentOpen && (
          <CommentButton onMouseDown={() => setCommentOpen(true)} />
        )}
        {!(donationOpen || intro) && (
          <DonationButton onMouseDown={() => setDonationOpen(true)} />
        )}
      </div>
      {!connectedAccount && (
        <ConnectButtonCustom size="lg" className={cn('w-full text-xl py-6')} />
      )}
      {connectedAccount && (
        <Button
          size="lg"
          className={cn('w-full text-xl py-6', 'disabled:bg-gray-300')}
          onMouseDown={handleEnorsment}
          disabled={
            !intro &&
            (areRequestsPending ||
              isError ||
              !address ||
              !connectedAccount ||
              isGasEstimateFetching)
          }
        >
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {previousErrorInsufficientFunds ? 'Insufficient funds' : 'Endorse'}
        </Button>
      )}
      <FeeDisplay
        donationValue={donationValue.toString()}
        encodedFunctionData={encodedFunctionData}
      />
    </Card>
  );
};
