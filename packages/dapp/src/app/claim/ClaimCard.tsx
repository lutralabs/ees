'use client';

import { ConnectButtonCustom } from '@/components/ConnectButtonCustom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuota } from '@/hooks';
import { useDonationBalance } from '@/hooks/useDonationBalance';
import { CONTRACT_ADDRESSES, DEFAULT_CHAIN_ID, EESCore } from '@/lib/contracts';
import { EXPLORERS } from '@/lib/contracts/explorers';
import { cn } from '@/lib/utils';
import { config } from '@/lib/wagmi/config';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { formatEther, parseEther, type WriteContractErrorType } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

export const ClaimCard = () => {
  const { address, chainId } = useAccount();

  const {
    data: donationBalance,
    isLoading: isDonationBalanceLoading,
    isError: isDonationBalanceError,
  } = useDonationBalance(chainId ?? DEFAULT_CHAIN_ID, address!, !!address);

  const {
    data: quota,
    isPending: isQuotaPending,
    isError: isQuotaError,
  } = useQuota({
    fiat: 'USD',
    crypto: 'ETH',
    enabled: !!address,
  });

  const { writeContractAsync, isPending } = useWriteContract({
    config: config,
  });

  const handleWithdraw = async () => {
    if (!address || !chainId) {
      return;
    }

    writeContractAsync({
      abi: EESCore,
      address: CONTRACT_ADDRESSES.ees[chainId],
      functionName: 'withdraw',
      args: [],
    })
      .then((txHash) => {
        toast(
          <div className="flex space-x-2">
            <div className="flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex flex-col space-y-1">
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
              <div className="flex space-x-2">
                <div className="flex items-center justify-center">
                  <CircleAlert className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex flex-col space-y-1 items-center justify-center">
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
          <div className="flex space-x-2">
            <div className="flex items-center justify-center">
              <CircleAlert className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex flex-col space-y-1 items-center justify-center">
              <h3 className="font-semibold">Something went wrong</h3>
            </div>
          </div>,
          {
            duration: 2000,
          }
        );
      });
  };

  const EstimatedValue = useMemo(() => {
    if (isQuotaPending || isDonationBalanceLoading) {
      return <Skeleton className="h-4 w-16 bg-gray-400" />;
    }

    if (isQuotaError || isDonationBalanceError) {
      return (
        <div className="text-sm text-red-500">Could not estimate value</div>
      );
    }

    const _donationBalance = Number(
      donationBalance ? formatEther(donationBalance) : '0'
    );

    return (
      <div className="flex">
        <div className="flex-1">
          ${(_donationBalance * quota.price).toFixed(2)}
        </div>
      </div>
    );
  }, [
    // Donation balance
    donationBalance,
    isDonationBalanceLoading,
    isDonationBalanceError,
    // Quota
    quota,
    isQuotaPending,
    isQuotaError,
  ]);

  const DonationBalance = useMemo(() => {
    if (isDonationBalanceLoading) {
      return <Skeleton className="h-4 w-16 bg-gray-400" />;
    }

    if (isDonationBalanceError) {
      return (
        <div className="text-sm text-red-500">
          Could not retrieve donation balance
        </div>
      );
    }

    const _donationBalance = donationBalance
      ? formatEther(donationBalance)
      : '0';

    return <div>{_donationBalance} ETH</div>;
  }, [
    // Donation balance
    donationBalance,
    isDonationBalanceLoading,
    isDonationBalanceError,
  ]);

  return (
    <Card className="p-4 flex flex-col gap-y-4 overflow-hidden shadow-lg">
      <div className="bg-primary-50 rounded-xl text-primary-800 p-4">
        <div className="flex items-center gap-x-1 text-thin text-gray-600 text-sm pb-4">
          Unclaimed donations
        </div>
        <div className="flex flex-col text-xl font-semibold max-h-72 overflow-auto">
          {DonationBalance}
        </div>
      </div>
      <div
        className={cn(
          'text-sm justify-between w-full gap-x-1 text-gray-600',
          isDonationBalanceError && 'hidden'
        )}
      >
        <div className={cn('flex pt-2')}>
          <div className="flex-1">Estimated value</div>
          {EstimatedValue}
        </div>
      </div>
      <div
        className={cn(
          'text-sm text-red-500 pt-2',
          !isDonationBalanceError && 'hidden'
        )}
      >
        Failed to retrieve donation balance
      </div>
      {!address && (
        <ConnectButtonCustom size="lg" className={cn('w-full text-xl py-6')} />
      )}
      {address && (
        <Button
          onMouseDown={handleWithdraw}
          size="lg"
          disabled={
            isDonationBalanceLoading ||
            isDonationBalanceError ||
            !address ||
            donationBalance?.toString() === '0'
          }
          className={cn('w-full text-xl py-6', 'disabled:bg-gray-300')}
        >
          {donationBalance?.toString() === '0'
            ? 'Nothing to claim'
            : 'Claim donations'}
        </Button>
      )}
    </Card>
  );
};
