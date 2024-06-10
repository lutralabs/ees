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

const ENDORSEMENT_OPTIONS = [
  { value: 'Web3 explorer', label: 'Web3 explorer' },
  { value: 'Developer', label: 'Developer' },
  { value: 'Artist', label: 'Artist' },
  { value: 'Blogger', label: 'Blogger' },
  { value: 'Trader', label: 'Trader' },
  { value: 'Friend', label: 'Friend' },
  { value: 'Based energy 🔵', label: 'Based energy 🔵' },
  { value: 'Hacker', label: 'Hacker' },
  { value: 'Buidler', label: 'Buidler' },
  { value: 'Memer', label: 'Memer' },
  { value: 'Degen', label: 'Degen' },
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
            <SelectValue placeholder="Type of endorsement" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type of endorsement</SelectLabel>
              {ENDORSEMENT_OPTIONS.map((option) => (
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
