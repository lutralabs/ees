import React, { useMemo } from 'react';
import { useEndorsementStore } from '@/stores';
import { MemoizedImage } from '@/components/MemoizedImage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DonationValueUSD } from './DonationValueUSD';
import { Balance } from './Balance';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type DonationCardProps = {
  close: () => void;
};

export const DonationCard = ({ close }: DonationCardProps) => {
  const { donationValue, changeDonationValue } = useEndorsementStore(
    (state) => ({
      donationValue: state.donationValue,
      changeDonationValue: state.changeDonationValue,
    })
  );

  const CachedBalance = useMemo(() => {
    return <Balance />;
  }, []);

  return (
    <div className="w-full bg-primary-50 p-4 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-primary"
          >
            <title>Gift icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          <div className="text-thin text-gray-600 text-sm">Add tip</div>
        </div>
        <Button
          onMouseDown={() => {
            changeDonationValue('');
            close();
          }}
          variant="ghost"
          size="icon"
        >
          <X className="w-6 h-6 text-primary" />
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex items-center">
          <div className="flex-1">
            <input
              className="text-3xl w-[80%] text-ellipsis font-semibold bg-transparent focus:outline-none"
              value={donationValue}
              onChange={(e) => {
                // Replace `,` with `.` and remove whitespace
                const nextValue = e.target.value
                  .replace(/,/g, '.')
                  .replace(/\s/g, '');

                // Check if multiple decimals are entered
                if (nextValue.split('.').length > 2) return;

                // Check if value is '.' then set to '0.'
                if (nextValue === '.') {
                  changeDonationValue('0.');
                  return;
                }

                // Return if value is not a number, '.' or empty string
                if (Number.isNaN(Number(nextValue)) && nextValue !== '') {
                  return;
                }

                changeDonationValue(nextValue);
              }}
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0"
              minLength={1}
              maxLength={42}
              spellCheck="false"
            />
          </div>

          <div className="flex items-center">
            <Select defaultValue="eth">
              <SelectTrigger className="min-w-[130px]">
                <SelectValue defaultValue="eth" placeholder="Select Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="eth" value="eth">
                  <div className="flex items-center justify-center">
                    <MemoizedImage
                      src="/icons/coin-ethereum.png"
                      alt="Ethereum"
                      width={256}
                      height={256}
                      className="h-8 w-10"
                    />
                    <div className="font-semibold grow text-xl">ETH</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between mt-1 gap-x-2">
          <div className="flex-1 max-w-full overflow-hidden">
            <DonationValueUSD amount={Number(donationValue)} token="ETH" />
          </div>
          {CachedBalance}
        </div>
      </div>
    </div>
  );
};
