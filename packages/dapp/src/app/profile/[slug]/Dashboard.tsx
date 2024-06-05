import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserBadge } from './UserBadge';

type DashboardProps = {
  account: string;
};

export const Dashboard = ({ account }: DashboardProps) => {
  return (
    <div className="flex flex-col gap-y-2 overflow-auto">
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Top Endorsers</CardTitle>
          <CardDescription>
            Most endorsed accounts, that endorsed this profile!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 grid-rows-3 sm:grid-rows-2 xl:grid-rows-1 gap-y-12 pb-8">
          <UserBadge
            avatar={
              'https://assets.airstack.xyz/v2/image/nft/1/OxgWMmo32Y9paXPw9evNjxMx+BwvQg/FQgnHPfqoUn+XqgrMgC4e/PlD+pjvytyutrt7SHdA5YcO77jS2rf2nq3k4BXFWCP9JzydX3ACxXsRRGHfXyqRxqWlDhJ5E5cNZGuqCO7Fl7n2OiUm/eo5XO7VyFCEWfc1gw5MZ1P9wooorckk89GvBZMYIhSvbTViOaprRBtiMuRCGFaoANf6Bdwf2it2vNfhiujCc5b6AsEzSXX1rDJ63MmKk3EoCAl65jrcb22Kq1SVfzLUUK94b9NYFLXEk5taelZGhhoCFz6k8uWbRbLpOmMzc14rhe4xTA7D5u5bLDOvXXIbWhp4uw==/small.svg'
            }
          />

          <UserBadge
            avatar={'https://nyancatcollection.com/images/Vaporwave.gif'}
          />
          <UserBadge avatar="https://nyancatcollection.com/images/Celebracion.gif" />

          <UserBadge avatar="https://nyancatcollection.com/images/Star-Spangled.gif" />
          <UserBadge avatar="https://nyancatcollection.com/images/Celebracion.gif" />
          <UserBadge avatar="https://nyancatcollection.com/images/Star-Spangled.gif" />
        </CardContent>
      </Card>
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Top Donators</CardTitle>
          <CardDescription>
            Accounts that donated the most to this profile!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 grid-rows-3 sm:grid-rows-2 xl:grid-rows-1 gap-y-12 pb-8">
          <UserBadge
            avatar={
              'https://assets.airstack.xyz/v2/image/nft/1/OxgWMmo32Y9paXPw9evNjxMx+BwvQg/FQgnHPfqoUn+XqgrMgC4e/PlD+pjvytyutrt7SHdA5YcO77jS2rf2nq3k4BXFWCP9JzydX3ACxXsRRGHfXyqRxqWlDhJ5E5cNZGuqCO7Fl7n2OiUm/eo5XO7VyFCEWfc1gw5MZ1P9wooorckk89GvBZMYIhSvbTViOaprRBtiMuRCGFaoANf6Bdwf2it2vNfhiujCc5b6AsEzSXX1rDJ63MmKk3EoCAl65jrcb22Kq1SVfzLUUK94b9NYFLXEk5taelZGhhoCFz6k8uWbRbLpOmMzc14rhe4xTA7D5u5bLDOvXXIbWhp4uw==/small.svg'
            }
          />

          <UserBadge
            avatar={'https://nyancatcollection.com/images/Vaporwave.gif'}
          />
          <UserBadge avatar="https://nyancatcollection.com/images/Celebracion.gif" />

          <UserBadge avatar="https://nyancatcollection.com/images/Star-Spangled.gif" />
          <UserBadge avatar="https://nyancatcollection.com/images/Celebracion.gif" />
          <UserBadge avatar="https://nyancatcollection.com/images/Star-Spangled.gif" />
        </CardContent>
      </Card>
    </div>
  );
};
