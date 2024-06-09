import { GiftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

type DonationButtonProps = {
  onMouseDown: () => void;
};

export const DonationButton = ({ onMouseDown }: DonationButtonProps) => {
  return (
    <Button
      onMouseDown={onMouseDown}
      className="bg-primary-50 hover:bg-primary-100 rounded-full flex gap-x-2"
    >
      <GiftIcon className="w-6 h-6 text-primary" />
      <div className="text-thin text-gray-600 text-sm">Add tip</div>
    </Button>
  );
};
