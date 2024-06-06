import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEndorsementStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ENDORSMENT_OPTIONS = [
  { value: 'web3', label: 'Web3Explorer' },
  { value: 'dev', label: 'Developer' },
  { value: 'art', label: 'Artist' },
  { value: 'content', label: 'Content Creator' },
  { value: 'trader', label: 'Trader' },
];

type EndorseeCardProps = {
  endorsee: React.ReactNode;
};

export const EndorseeCard = ({ endorsee }: EndorseeCardProps) => {
  const router = useRouter();

  // Global state
  const { address, endorsementType, changeEndorsementType, clear } =
    useEndorsementStore((state) => ({
      address: state.address,
      endorsementType: state.endorsementType,
      changeEndorsementType: state.changeEndorsementType,
      clear: state.clear,
    }));

  return (
    <div className="w-full min-h-32 bg-primary-50 p-4 rounded-xl flex flex-col justify-between">
      <div className="flex items-center gap-x-1 text-thin text-gray-600 text-sm">
        Endorse
        {address && (
          <div className="flex-1 flex items-center justify-end">
            <Button
              variant="link"
              onMouseDown={() => {
                // Clear global store
                clear();

                /*
                 * Clear search params
                 */
                router.replace('/');
              }}
              className="font-semibold p-0 h-5"
            >
              Clear
            </Button>
          </div>
        )}
      </div>
      <div className="flex max-sm:flex-col max-sm:pt-4 max-sm:gap-y-4 justify-between items-center">
        {endorsee}

        <Select
          defaultValue="web3"
          value={endorsementType}
          onValueChange={changeEndorsementType}
        >
          <SelectTrigger className="w-[180px] max-sm:w-full">
            <SelectValue placeholder="Endorsement Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Endorsement Type</SelectLabel>
              {ENDORSMENT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-1" />
    </div>
  );
};
