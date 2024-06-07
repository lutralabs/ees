import { formatAddress } from '@/utils';
import { CopyIcon } from '@/components/CopyIcon';

export const Address = ({ address }: { address: string }) => {
  const formattedAddress = formatAddress(address);

  return (
    <div className="flex items-center gap-x-1">
      <div className="flex-1 flex items-center justify-end">
        <div className="font-semibold bg-slate-200 px-4 flex items-center py-1 rounded-full gap-x-1">
          {formattedAddress}
          <CopyIcon value={address} />
        </div>
      </div>
    </div>
  );
};
