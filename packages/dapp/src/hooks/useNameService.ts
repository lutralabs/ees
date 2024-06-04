import { useQuery } from '@tanstack/react-query';

export type Web3BioNameService = {
  address: string;
  identity: string | null;
  platform: string | null;
  displayName: string | null;
  avatar: string | null;
  description: string | null;
};

export const useNameService = ({
  platform,
  value,
  enabled,
}: {
  platform: string | null; // TODO[Martin]: add correct types
  // : 'ens' | 'farcaster' | 'lens';
  value: string | null;
  enabled: boolean;
}) => {
  return useQuery<Web3BioNameService>({
    queryKey: ['profile', platform, value],
    queryFn: async () => {
      if (platform === null || value === null) return null;
      if (platform === 'address') {
        // TODO[Andy]: resolve ENS if exists
        return {
          address: value,
          identity: null,
          platform: null,
          displayName: null,
          avatar: null,
          description: null,
        };
      }

      const res = await fetch(`https://api.web3.bio/ns/${platform}/${value}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Profile not found');
        }

        throw new Error('Failed to fetch price');
      }

      const data = await res.json();

      if (!data) {
        throw new Error('Failed to fetch price');
      }

      return data;
    },
    enabled,
    retry: 3,
  });
};
