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
      const res = await fetch(`/api/quota?fiat=${fiat}&crypto=${crypto}`, {
        next: { revalidate: 60 }, // Cache for 2 minutes
      });

      if (!res.ok) {
        throw new Error('Failed to fetch price');
      }

      const data = await res.json();

      if (!data) {
        throw new Error('Failed to fetch price');
      }

      return data;
    },
    enabled,
    refetchInterval: 1000 * 120, // Refetch every 2 minutes
  });
};
