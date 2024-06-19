import type { GetGlobalStatisticsQuery } from '@/__generated__/ees/graphql';
import { DEFAULT_CHAIN_ID } from '@/lib/contracts';
import { CHAIN_ID_TO_NETWORK_NAME } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export const useGlobalStatistics = (chainId?: number) => {
  let network = CHAIN_ID_TO_NETWORK_NAME[chainId ?? DEFAULT_CHAIN_ID];
  network = network ?? CHAIN_ID_TO_NETWORK_NAME[DEFAULT_CHAIN_ID];

  return useQuery({
    queryKey: ['globalStatistics', network],
    queryFn: async () => {
      const response = await fetch(`/api/globalStatistics?network=${network}`);

      if (!response.ok) {
        throw new Error('Failed to global statistics');
      }

      const data = await response.json();

      if (!data) {
        throw new Error('Failed to fetch global statistics');
      }

      return (data as GetGlobalStatisticsQuery['globalStatistics'])!;
    },
    refetchInterval: 1000 * 60, // Refetch every minute
    refetchOnWindowFocus: false,
  });
};
