import { Skeleton } from '@/components/ui/skeleton';
import { useQuota } from '@/hooks';

type DonationValueUSDProps = {
  amount: number;
  token: string;
};

export const DonationValueUSD = ({ amount, token }: DonationValueUSDProps) => {
  const { data, error, isLoading } = useQuota({
    fiat: 'USD',
    crypto: token,
    enabled: amount > 0,
  });

  return (
    <div className="text-sm text-gray-600">
      {data?.price && !error && (
        <span>${(amount * data.price).toFixed(2)}</span>
      )}
      {isLoading && <Skeleton className="h-4 w-16 bg-gray-400" />}
      {error && <span className="text-red-500">Can't fetch price.</span>}
    </div>
  );
};
