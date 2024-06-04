import { useAccount, useBalance } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { formatUnits } from 'viem';
import { useEndorsementStore } from '@/stores';

export const Balance = () => {
  // Global state
  const changeDonationValue = useEndorsementStore(
    (state) => state.changeDonationValue
  );

  // Hooks
  const account = useAccount();

  const balance = useBalance({
    address: account.address,
    chainId: account.chainId,
  });

  const balanceValue = useMemo(() => {
    if (!balance.data) return '0';
    return formatUnits(balance.data.value, balance.data.decimals);
  }, [balance]);

  return (
    <div className="text-sm flex gap-x-1 text-gray-600">
      Balance: {Number(balanceValue).toFixed(3)}
      <Button
        variant="link"
        onMouseDown={() => changeDonationValue(balanceValue)}
        className="font-semibold p-0 h-5"
      >
        Max
      </Button>
    </div>
  );
};
