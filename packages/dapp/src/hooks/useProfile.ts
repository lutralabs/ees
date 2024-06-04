import { useQuery } from '@tanstack/react-query';

export type Web3BioProfile = {
  address: string;
  identity: string | null;
  platform: string | null;
  displayName: string | null;
  avatar: string | null;
  description: string | null;
  email: string | null;
  location: string | null;
  header: string | null;
  contenthash: string | null;
  links: {
    [key: string]: {
      link: string;
      handle: string;
    };
  };
};

export const useProfile = ({
  value,
  enabled,
}: {
  value: string;
  enabled: boolean;
}) => {
  return useQuery<Web3BioProfile[]>({
    queryKey: ['profile', value],
    queryFn: async () => {
      const res = await fetch(`https://api.web3.bio/profile/${value}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Profile not found');
        }

        throw new Error('Failed to fetch profile');
      }

      const data = await res.json();

      if (!data) {
        throw new Error('Failed to fetch profile');
      }

      return data;
    },
    enabled,
    retry: 3,
  });
};
