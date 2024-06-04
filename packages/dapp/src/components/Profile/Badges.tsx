import { useMemo } from 'react';
import { Badge } from './Badge';

type BadgesProps = {
  accounts: any[];
};

export const Badges = ({ accounts }: BadgesProps) => {
  const combinedAccounts = useMemo(() => {
    const initialAccounts = accounts;
    const newAccounts: { platform: string; identity: any }[] = [];
    accounts.forEach((acc) => {
      if (acc.links) {
        if (acc.links.twitter) {
          newAccounts.push({
            platform: 'twitter',
            identity: acc.links.twitter.handle,
          });
        }
        if (acc.links.github) {
          newAccounts.push({
            platform: 'github',
            identity: acc.links.github.handle,
          });
        }
        if (acc.links.website) {
          newAccounts.push({
            platform: 'website',
            identity: acc.links.website.handle,
          });
        }
      }
    });
    //remove duplicates from newAccounts
    const newAccountsFiltered = newAccounts.filter(
      (v, i, a) =>
        a.findIndex(
          (t) => t.platform === v.platform && t.identity === v.identity
        ) === i
    );
    return [...initialAccounts, ...newAccountsFiltered];
  }, accounts);
  console.log('ca', combinedAccounts);

  //console.log('acc', accounts);
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-1">
      {combinedAccounts.map((account) => {
        return <Badge key={account.id} account={account} />;
      })}
    </div>
  );
};
