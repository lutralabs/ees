'use client';

import { cn } from '@/lib/utils';
import { formatAddress } from '@/utils';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { Check } from 'lucide-react';
import { useState } from 'react';

export const Address = ({ address }: { address: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const formattedAddress = formatAddress(address);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="flex items-center gap-x-1">
      <div className="flex-1 flex items-center justify-end">
        <div className="font-semibold bg-slate-200 px-4 flex items-center py-1 rounded-full gap-x-1">
          {formattedAddress}
          <DocumentDuplicateIcon
            className={cn(
              'w-4 h-4 cursor-pointer hover:text-primary-400',
              isCopied && 'hidden'
            )}
            onMouseDown={handleCopy}
          />
          <Check
            className={cn(
              'w-4 h-4 cursor-pointer hover:text-primary-400',
              !isCopied && 'hidden'
            )}
          />
        </div>
      </div>
    </div>
  );
};
