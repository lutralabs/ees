import { type UseQueryResult, useQuery } from '@tanstack/react-query';

export const useQuota = ({
  fiat,
  crypto,
  enabled,
}: {
  fiat: string;
  crypto: string;
  enabled: boolean;
}): UseQueryResult<{ price: number }> => {
  return useQuery({
    queryKey: ['quota', fiat, crypto],
    queryFn: async () => {
      const response = await fetch(`/api/quota?fiat=${fiat}&crypto=${crypto}`, {
        next: { revalidate: 60 }, // Cache for 1 minute
      });

      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }

      const data = await response.json();

      if (!data) {
        throw new Error('Failed to fetch price');
      }

      return data;
    },
    enabled,
    refetchInterval: 120000, // Refetch every 2 minutes
  });
};
