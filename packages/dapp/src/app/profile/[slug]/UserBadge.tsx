import { Card } from '@/components/ui/card';
import { ProfileAvatar } from './ProfileAvatar';

type UserBadgeProps = {
  avatar: string | null;
};

export const UserBadge = ({ avatar }: UserBadgeProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[128px] h-[120px] relative">
        <div className="w-full flex justify-center">
          <ProfileAvatar avatar={avatar} size="3xl" />
        </div>
        <Card className="absolute text-sm w-full bottom-[-16px] p-2 hover:bg-gray-50 animated-transition">
          <div className="w-full flex flex-col justify-center items-center font-medium">
            test
            <span className="font-normal text-primary">
              123 <span className="text-xs">Endorsements</span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
