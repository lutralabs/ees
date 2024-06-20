import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExplorerTable } from '@/components/ExplorerTable';

type ExplorerProps = {
  chainId: number;
  account: `0x${string}`;
  currentPage: number;
  totalEndorsementsReceived: number;
};

export const Explorer = ({
  chainId,
  account,
  currentPage,
  totalEndorsementsReceived,
}: ExplorerProps) => {
  return (
    <div className="flex flex-col gap-y-4 overflow-auto px-2 pb-2">
      <Card className="rounded-sm shadow-md border-2 border-b-1 border-gray-200">
        <CardHeader>
          <CardTitle>Endorsement Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <ExplorerTable
            chainId={chainId}
            account={account}
            currentPage={currentPage}
            totalEndorsementsReceived={totalEndorsementsReceived}
          />
        </CardContent>
      </Card>
    </div>
  );
};
