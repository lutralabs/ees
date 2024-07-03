import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExplorerTable } from '@/components/ExplorerTable';
import { EndorsementView } from '@/components/EndorsementView';
import { EndorsementViewBackArrow } from './EndorsementVIewBackArrow';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type ExplorerProps = {
  chainId: number;
  account: `0x${string}`;
  currentPage: number;
  endorsementId?: string;
  totalEndorsementsReceived: number;
  avatar: string;
  displayName: string;
  endorsementTab?: string;
};

export const Explorer = ({
  chainId,
  account,
  currentPage,
  endorsementId,
  totalEndorsementsReceived,
  avatar,
  displayName,
  endorsementTab,
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
              key={`${chainId}-${endorsementId}-${endorsementTab}`}
              fallback={
                <div className="mt-4 w-full">
                  <Skeleton className="w-full h-48 bg-gray-200 rounded-sm" />
                </div>
              }
            >
              <EndorsementView
                chainId={chainId}
                id={endorsementId}
                avatar={avatar}
                displayName={displayName}
                endorsementTab={endorsementTab}
              />
            </Suspense>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
