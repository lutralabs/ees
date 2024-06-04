import { useMemo } from 'react';
import { User } from './User';
import { Feed } from './Feed';

type ProfileProps = {
  data: any[];
  slug: string;
};

export const Profile = ({ data, slug }: ProfileProps) => {
  const ens = useMemo(() => {
    return data.find((item) => {
      return item.platform === 'ens';
    });
  }, [data]);

  const secondary = useMemo(() => {
    if (ens) return null;
    if (slug.endsWith('.farcaster')) {
      return data.find((item) => {
        return item.platform === 'farcaster';
      });
    }
    if (slug.endsWith('.lens')) {
      return data.find((item) => {
        return item.platform === 'lens';
      });
    }
    return data.find((item) => {
      return item.platform === 'ethereum';
    });
  }, [ens, data, slug]);

  const account = useMemo(() => {
    if (!ens) return secondary;
    return ens;
  }, [ens, secondary]);

  const description = useMemo(() => {
    if (ens?.description) return ens.description;
    if (secondary?.description) return secondary.description;
    return undefined;
  }, [ens, secondary]);

  return (
    <div className="max-lg:flex-col gap-x-4 lg:flex w-full">
      <div className="lg:w-[30%] w-full">
        <User data={data} account={account} description={description} />
      </div>
      <div className="flex-1 py-16">
        <Feed address={account.address} />
      </div>
    </div>
  );
};
