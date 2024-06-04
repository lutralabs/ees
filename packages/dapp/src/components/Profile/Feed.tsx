import React, { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
  CardHeader,
  CardFooter,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { UserBadge } from '../EndorsementDashboard/UserBadge';

type FeedProps = {
  address: string;
};

export const Feed = ({ address }: FeedProps) => {
  return (
    <div className="w-full bg-white">
      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger disabled value="graph">
            Endorsement Explorer{' '}
            <span className="text-pink-500 text-xs ml-2">Coming Soon!</span>
          </TabsTrigger>
          <TabsTrigger disabled value="graph">
            Social Graph{' '}
            <span className="text-pink-500 text-xs ml-2">Coming Soon!</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex flex-col gap-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Top Endorsers</CardTitle>
                <CardDescription>
                  Most endorsed accounts, that endorsed you!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <UserBadge address={address} endorsements={10} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Endorsements made</CardTitle>
                <CardDescription>
                  Most endorsed accounts you endorsed!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">Hello Wenda</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Highest Tips</CardTitle>
                <CardDescription>
                  Most tips received from your endorsements!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">Hello Wenda</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Endorsements</CardTitle>
                <CardDescription>Endorsements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">Hello Wenda</CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
