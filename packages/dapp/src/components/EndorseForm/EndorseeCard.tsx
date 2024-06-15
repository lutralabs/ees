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

export const ENDORSEMENT_OPTIONS = [
  { value: 'Developer', label: 'Developer' },
  { value: 'Hacker', label: 'Hacker' },
  { value: 'Buidler', label: 'Buidler' },
  { value: 'Memer', label: 'Memer' },
  { value: 'Based energy 🔵', label: 'Based energy 🔵' },
  { value: 'Crypto OG', label: 'Crypto OG' },
  { value: 'Web3 explorer', label: 'Web3 explorer' },
  { value: 'Friend', label: 'Friend' },
  { value: 'Artist', label: 'Artist' },
  { value: 'Blogger', label: 'Blogger' },
  { value: 'Trader', label: 'Trader' },
  { value: 'Degen', label: 'Degen' },
  { value: 'Scammer', label: 'Scammer' },
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
      <div className="flex max-lg:flex-col max-lg:pt-4 max-lg:gap-y-4 justify-between items-center">
        {endorsee}

        <Select
          defaultValue="Based energy 🔵"
          value={endorsementType}
          onValueChange={changeEndorsementType}
        >
          <SelectTrigger className="min-w-[160px] w-[160px] max-lg:w-full">
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
