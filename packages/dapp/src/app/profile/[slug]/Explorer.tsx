import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExplorerTable } from '@/components/ExplorerTable';
import { EndorsementView } from '@/components/EndorsementView';
import { EndorsementViewBackArrow } from './EndorsementVIewBackArrow';
import { Suspense } from 'react';

type ExplorerProps = {
  chainId: number;
  account: `0x${string}`;
  currentPage: number;
  endorsementId?: string;
  totalEndorsementsReceived: number;
  avatar: string;
  accountName: string;
};

export const Explorer = ({
  chainId,
  account,
  currentPage,
  endorsementId,
  totalEndorsementsReceived,
  avatar,
  accountName,
}: ExplorerProps) => {
  return (
    <div className="flex flex-col gap-y-4 overflow-auto px-2 pb-2">
      <Card className="rounded-sm shadow-md border-2 border-b-1 border-gray-200">
        <CardHeader className="flex flex-row items-center gap-x-2">
          {!endorsementId && <CardTitle>Endorsement Explorer</CardTitle>}
          {endorsementId && (
            <>
              <EndorsementViewBackArrow />
              <CardTitle>Endorsement</CardTitle>
            </>
          )}
        </CardHeader>
        <CardContent>
          {!endorsementId && (
            <ExplorerTable
              chainId={chainId}
              account={account}
              currentPage={currentPage}
              totalEndorsementsReceived={totalEndorsementsReceived}
            />
          )}
          {endorsementId && (
            <Suspense
              key={`${chainId}-${endorsementId}`}
              fallback={<div>loading...</div>}
            >
              <EndorsementView
                chainId={chainId}
                id={endorsementId}
                avatar={avatar}
                accountName={accountName}
              />
            </Suspense>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
